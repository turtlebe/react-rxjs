import { memo } from 'react';
import { CardLineItem, CardSection } from 'components/Card';
import { Typography } from 'components/Typography';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { OrderCustomerInformation } from 'api/types';
import { EditButton } from '../../PaymentsFinalConfirmation/EditButton';

const phrases = (t: TranslateFn) => ({
  title: t('Customer order'),
});

export interface CustomerOrderSectionProps
  extends Pick<OrderCustomerInformation, 'customerOrderNumber'> {
  className?: string;
  editPath: string;
  hideEdit?: boolean;
}

export const CustomerOrderSection = memo((props: CustomerOrderSectionProps) => {
  const { className, customerOrderNumber, editPath, hideEdit } = props;
  const translations = useTranslatedText(phrases);

  return (
    <CardSection
      className={className}
      rightHeaderElement={!hideEdit && <EditButton to={editPath} />}
      title={translations.title}
    >
      <CardLineItem
        label={
          <Typography variant="body2">
            {customerOrderNumber}
            <br />
          </Typography>
        }
      />
    </CardSection>
  );
});
