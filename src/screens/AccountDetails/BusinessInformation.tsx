import { forwardRef, useMemo } from 'react';
import { Typography } from 'components/Typography';
import { Card, CardLineItem } from 'components/Card';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';

const phrases = (t: TranslateFn) => ({
  companyName: t('Company name'),
  legalForm: t('Legal form'),
  address: t('Address'),
  phoneNumber: t('Phone number'),
  registrationAuthority: t('Registration authority'),
  commercialRegisterNumber: t('Commercial register number'),
  taxId: t('Tax ID'),
  vatId: t('VAT ID'),
});

export interface BusinessInformationProps {
  city?: string;
  companyName?: string;
  legalForm?: string;
  postcode?: string;
  streetAndNumber?: string;
  taxId?: string;
  vatId?: string;
}

export const BusinessInformation = forwardRef<HTMLDivElement, BusinessInformationProps>(
  (props, ref) => {
    const { city, companyName, legalForm, postcode, streetAndNumber, taxId, vatId } = props;
    const translations = useTranslatedText(phrases);
    const AddressCell = useMemo(
      () => (
        <>
          <Typography variant="h5">{streetAndNumber}</Typography>
          <Typography variant="h5">
            {postcode} {city}
          </Typography>
        </>
      ),
      [streetAndNumber, postcode, city]
    );
    return (
      <Card color="tertiary" ref={ref}>
        <CardLineItem
          label={translations.companyName}
          labelMinWidth={16}
          space="small"
          value={companyName}
        />
        <CardLineItem
          label={translations.legalForm}
          labelMinWidth={16}
          space="small"
          value={legalForm}
        />
        <CardLineItem
          label={translations.address}
          labelMinWidth={16}
          space="small"
          value={AddressCell}
        />
        <CardLineItem label={translations.taxId} labelMinWidth={16} space="small" value={taxId} />
        <CardLineItem label={translations.vatId} labelMinWidth={16} space="small" value={vatId} />
        {/* ORDERBOOK_PRODUCT_COMMENT
          <CardLineItem
            label={translations.registrationAuthority}
            labelMinWidth={20}
            space="small"
            value={registrationAuthority}
          />
          <CardLineItem
            label={translations.commercialRegisterNumber}
            labelMinWidth={20}
            space="small"
            value={commercialRegisterNumber}
          />
        */}
      </Card>
    );
  }
);
