import { memo } from 'react';
import { css } from '@emotion/react';
import { CardLineItem, CardSection } from 'components/Card';
import { Typography } from 'components/Typography';
import { ColumnLayout } from 'components/Page';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { CustomerCompany, OrderCustomerInformation, GermanCompanyDetails } from 'api/types';
import { EditButton } from '../../PaymentsFinalConfirmation/EditButton';

const phrases = (t: TranslateFn) => ({
  title: t('Customer'),
  disposition: t('Disposition'),
  bookkeeping: t('Bookkeeping'),
  notSpecifiedYet: t('Not specified yet'),
});

export interface CustomerSectionProps
  extends Pick<OrderCustomerInformation, 'contacts'>,
    Pick<CustomerCompany, 'companyName'>,
    Pick<GermanCompanyDetails, 'address'> {
  className?: string;
  editPath: string;
  hideEdit?: boolean;
}

const titleStyle = () =>
  css({
    gridColumn: 1,
    gridRow: 1,
  });

const bodyStyle = () =>
  css({
    gridColumn: '1 / 12',
    gridRow: 2,
  });

export const CustomerSection = memo((props: CustomerSectionProps) => {
  const { address, className, companyName, contacts, editPath, hideEdit } = props;
  const translations = useTranslatedText(phrases);

  return (
    <CardSection
      className={className}
      rightHeaderElement={!hideEdit && <EditButton to={editPath} />}
      title={translations.title}
    >
      <CardLineItem
        space="small"
        label={
          <Typography variant="body2">
            {companyName}
            <br />
            {address?.streetAndNumber}
            <br />
            {address?.postcode} {address?.city}
          </Typography>
        }
      />
      <CardLineItem
        space="small"
        label={
          <ColumnLayout css={{ marginBottom: '0 !important' }}>
            <Typography css={titleStyle} variant="h5">
              {translations.disposition}
            </Typography>
            <Typography css={bodyStyle} variant="body2">
              {contacts?.dispositionContact?.contactName || translations.notSpecifiedYet}
              {contacts?.dispositionContact?.contactDetails?.email ? <br /> : ''}
              {contacts?.dispositionContact?.contactDetails?.email}
              {contacts?.dispositionContact?.contactDetails?.phoneNumber ? <br /> : ''}
              {contacts?.dispositionContact?.contactDetails?.phoneNumber}
            </Typography>
          </ColumnLayout>
        }
      />
      <CardLineItem
        space="small"
        label={
          <ColumnLayout css={{ marginBottom: '0 !important' }}>
            <Typography css={titleStyle} variant="h5">
              {translations.bookkeeping}
            </Typography>
            <Typography css={bodyStyle} variant="body2">
              {contacts?.bookkeepingContact?.contactName || translations.notSpecifiedYet}
              {contacts?.bookkeepingContact?.contactDetails?.email ? <br /> : ''}
              {contacts?.bookkeepingContact?.contactDetails?.email}
              {contacts?.bookkeepingContact?.contactDetails?.phoneNumber ? <br /> : ''}
              {contacts?.bookkeepingContact?.contactDetails?.phoneNumber}
            </Typography>
          </ColumnLayout>
        }
      />
    </CardSection>
  );
});
