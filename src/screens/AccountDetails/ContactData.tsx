import { forwardRef } from 'react';
import { Card, CardLineItem } from 'components/Card';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';

export interface ContactDataProps {
  email?: string;
  phoneNumber?: string;
}

const phrases = (t: TranslateFn) => ({
  phoneNumber: t('Phone number'),
  email: t('Company email'),
});

export const ContactData = forwardRef<HTMLDivElement, ContactDataProps>((props, ref) => {
  const { email, phoneNumber } = props;
  const translations = useTranslatedText(phrases);
  return (
    <Card color="tertiary" ref={ref}>
      <CardLineItem label={translations.phoneNumber} space="small" value={phoneNumber} />
      <CardLineItem label={translations.email} space="small" value={email} />
    </Card>
  );
});
