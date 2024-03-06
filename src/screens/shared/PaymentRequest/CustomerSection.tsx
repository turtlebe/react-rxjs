import { memo } from 'react';
import { CardLineItem, CardSection } from 'components/Card';
import { Typography } from 'components/Typography';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { PaymentRequestDetail } from 'api/types';
import { paths, sibling } from 'paths';
import { EditButton } from '../../PaymentsFinalConfirmation/EditButton';

const phrases = (t: TranslateFn) => ({
  title: t('Customer'),
});

export interface CustomerSectionProps
  extends Pick<PaymentRequestDetail, 'customerContact' | 'customerInformation'> {
  className?: string;
  hideEdit?: boolean;
}

export const CustomerSection = memo((props: CustomerSectionProps) => {
  const { className, customerContact, customerInformation, hideEdit } = props;
  const translations = useTranslatedText(phrases);

  return (
    <CardSection
      className={className}
      title={translations.title}
      rightHeaderElement={
        !hideEdit ? (
          <EditButton to={sibling(paths.root.factoring.createPayment.customerSelection.path)} />
        ) : undefined
      }
    >
      <CardLineItem
        label={
          <Typography variant="body2">
            {customerInformation.companyName}
            <br />
            {customerInformation.streetAndNumber}
            <br />
            {customerInformation.postcode}
            <br />
            {customerInformation.city}
          </Typography>
        }
      />
      <CardLineItem
        label={
          <Typography variant="body2">
            {customerContact.contactName}
            <br />
            {customerContact.email}
            <br />
            {customerContact.phoneNumber}
          </Typography>
        }
      />
    </CardSection>
  );
});
