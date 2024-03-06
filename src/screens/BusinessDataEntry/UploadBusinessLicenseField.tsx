import { useEffect } from 'react';
import { css, Theme } from '@emotion/react';
import { useFormContext } from 'react-hook-form';
import { TranslateFn, useTranslatedText, withParams } from 'hooks/useTranslatedText';
import { UploadDocumentFormField } from 'screens/shared/FormFields';
import { useLegalFormName } from 'state/legal-form';
import { useIsLicenseRequired } from 'state/register-authority';
import { BusinessDataFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  businessLicenseUploadLabel: t('Upload business license (pdf)'),
  businessLicenseTitle: t('Business license'),
  businessLicenseDescription: withParams<'legalForm'>((p) =>
    t(
      'Because you have selected the legal form {{legalForm}}, your company is not listed in a commercial register. Please upload your business license so we can quickly review it. Please also make sure that it is not older than 5 years.',
      p
    )
  ),
});

const style = (theme: Theme) =>
  css({
    gridColumn: '1 / 3',
    marginTop: theme.spacing(3),

    [theme.breakpoints.down('md')]: {
      gridColumn: 1,
    },

    [theme.breakpoints.up('md')]: {
      '& div:last-child': {
        width: theme.spacing(62.5),
        alignSelf: 'center',
      },
    },
  });

export const UploadBusinessLicenseField = () => {
  const { getValues, setValue, watch } = useFormContext<BusinessDataFormValues>();
  const translations = useTranslatedText(phrases);

  const legalForm = watch('legalForm');
  const legalFormName = useLegalFormName(legalForm);
  const registrationAuthorityCode = watch('registrationAuthority');
  const isShown = useIsLicenseRequired(registrationAuthorityCode);

  useEffect(() => {
    const isFileRequired = getValues('businessLicenseFileRequired');

    if (isShown !== isFileRequired) {
      setValue('businessLicenseFileRequired', isShown);

      if (!isShown) {
        setValue('businessLicenseUploadId', '');
        setValue('businessLicenseFilename', '');
      }
    }
  }, [isShown, getValues, setValue]);

  return isShown ? (
    <UploadDocumentFormField
      css={style}
      description={translations.businessLicenseDescription({ legalForm: legalFormName })}
      filenameFieldName="businessLicenseFilename"
      label={translations.businessLicenseUploadLabel}
      name="businessLicenseUploadId"
      title={translations.businessLicenseTitle}
    />
  ) : null;
};
