import { forwardRef, Ref, useCallback, useState } from 'react';
import { MuiTelInput, MuiTelInputProps, matchIsValidTel, MuiTelInputInfo } from 'mui-tel-input';
import { useTranslation } from 'react-i18next';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { assignRef } from 'utils/react/assign-ref';

type PhoneInputBaseProps = Omit<MuiTelInputProps, 'color' | 'size' | 'variant'>;

export type PhoneInputRefType = HTMLDivElement & { isValidNumber: boolean };

export interface PhoneInputProps extends PhoneInputBaseProps {
  validateNumber?: boolean;
}

const phrases = (t: TranslateFn) => ({ invalidPhoneNumberLabel: t('Invalid phone number') });

export const PhoneInput = forwardRef((props: PhoneInputProps, ref: Ref<PhoneInputRefType>) => {
  const { error, fullWidth = true, helperText, onBlur, onChange, validateNumber, ...rest } = props;
  const { i18n } = useTranslation();
  const translations = useTranslatedText(phrases);

  const [isValidNumber, setIsValidNumber] = useState(true);

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (validateNumber) {
        setIsValidNumber(e.target.value === '' || matchIsValidTel(e.target.value));
      }

      onBlur?.(e);
    },
    [onBlur, validateNumber]
  );

  const handleChange = useCallback(
    (value: string, info: MuiTelInputInfo) => {
      setIsValidNumber(true);
      onChange?.(value, info);
    },
    [onChange]
  );

  const handleRef = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        assignRef(Object.assign(node, { isValidNumber }), ref);
      }
    },
    [isValidNumber, ref]
  );

  const invalidNumberText = !isValidNumber ? translations.invalidPhoneNumberLabel : undefined;

  return (
    <MuiTelInput
      focusOnSelectCountry
      color="secondary"
      defaultCountry="DE"
      error={error || !isValidNumber}
      fullWidth={fullWidth}
      helperText={helperText || invalidNumberText}
      langOfCountryName={i18n.language}
      ref={handleRef}
      size="small"
      onBlur={handleBlur}
      onChange={handleChange}
      {...rest}
    />
  );
});
