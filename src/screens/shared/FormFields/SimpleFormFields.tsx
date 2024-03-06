import { css, Theme } from '@emotion/react';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { PhoneFormField, PhoneFormFieldProps } from './PhoneFormField';
import { TextFormField, TextFormFieldProps } from './TextFormField';
import { UploadDocumentFormField, UploadDocumentFormFieldProps } from './UploadDocumentFormField';
import {
  UploadOrderDocumentFormField,
  UploadOrderDocumentFormFieldProps,
} from './UploadOrderDocumentFormField';

const phrases = (t: TranslateFn) => ({
  companyNameLabel: t('Company name'),
  streetLabel: t('Street & number'),
  cityLabel: t('City'),
  phoneNumberLabel: t('Phone number'),
  vatIdLabel: t('VAT ID'),
  taxIdLabel: t('Tax ID'),
  postcodeLabel: t('Postcode'),
  addressAddonLabel: t('Address addon'),
  firstNameLabel: t('First name'),
  lastNameLabel: t('Last name'),
  placeOfBirthLabel: t('Place of birth'),
  ibanLabel: t('IBAN'),
  bicLabel: t('Bic'),
  emailLabel: t('Email'),
  orderTitle: t('Transport order'),
  orderLabel: t('Upload transport order (pdf)'),
  proofOfDeliveryTitle: t('Proof of delivery'),
  proofOfDeliveryLabel: t('Upload POD (pdf)'),
  upload: t('📤 Upload'),
  invoiceTitle: t('Invoice'),
  invoiceLabel: t('Upload invoice (pdf)'),
  creditNoteTitle: t('Credit note'),
  creditNoteLabel: t('Upload credit note (pdf)'),
  loadDescription: t('Load description'),
  service: t('Service'),
  stipulation: t('Stipulation'),
});

export const CompanyNameFormField = <TFieldValues extends { companyName: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <TextFormField label={translations.companyNameLabel} name="companyName" {...props} />;
};

export const PostcodeFormField = <TFieldValues extends { postcode: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <TextFormField label={translations.postcodeLabel} name="postcode" {...props} />;
};

export const StreetAndNumberFormField = <TFieldValues extends { streetAndNumber: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <TextFormField label={translations.streetLabel} name="streetAndNumber" {...props} />;
};

export const AddressAddonFormField = <TFieldValues extends { addressAddon: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <TextFormField label={translations.addressAddonLabel} name="addressAddon" {...props} />;
};

export const CityFormField = <TFieldValues extends { city: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <TextFormField label={translations.cityLabel} name="city" {...props} />;
};

export const PhoneNumberFormField = <TFieldValues extends { phoneNumber: any }>(
  props: Partial<PhoneFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <PhoneFormField label={translations.phoneNumberLabel} name="phoneNumber" {...props} />;
};

export const BookKeepingPhoneNumberFormField = <
  TFieldValues extends { bookKeepingPhoneNumber: any }
>(
  props: Partial<PhoneFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return (
    <PhoneFormField
      label={translations.phoneNumberLabel}
      name="bookKeepingPhoneNumber"
      {...props}
    />
  );
};

export const DispositionPhoneNumberFormField = <
  TFieldValues extends { dispositionPhoneNumber: any }
>(
  props: Partial<PhoneFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return (
    <PhoneFormField
      label={translations.phoneNumberLabel}
      name="dispositionPhoneNumber"
      {...props}
    />
  );
};

export const VatIdFormField = <TFieldValues extends { vatId: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <TextFormField label={translations.vatIdLabel} name="vatId" {...props} />;
};

export const TaxIdFormField = <TFieldValues extends { taxId: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <TextFormField label={translations.taxIdLabel} name="taxId" {...props} />;
};

export const FirstNameFormField = <TFieldValues extends { firstName: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <TextFormField label={translations.firstNameLabel} name="firstName" {...props} />;
};

export const LastNameFormField = <TFieldValues extends { lastName: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <TextFormField label={translations.lastNameLabel} name="lastName" {...props} />;
};

export const PlaceOfBirthFormField = <TFieldValues extends { placeOfBirth: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <TextFormField label={translations.placeOfBirthLabel} name="placeOfBirth" {...props} />;
};

export const IbanFormField = <TFieldValues extends { iban: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <TextFormField label={translations.ibanLabel} name="iban" {...props} />;
};

export const BicFormField = <TFieldValues extends { bic: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <TextFormField label={translations.bicLabel} name="bic" {...props} />;
};

export const CustomerOrderNumberFormField = <TFieldValues extends { customerOrderNumber: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => <TextFormField name="customerOrderNumber" {...props} />;

export const LoadingVenueNameFormField = <TFieldValues extends { loadingVenueName: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <TextFormField label={translations.companyNameLabel} name="loadingVenueName" {...props} />;
};

export const UnloadingVenueNameFormField = <TFieldValues extends { unloadingVenueName: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return (
    <TextFormField label={translations.companyNameLabel} name="unloadingVenueName" {...props} />
  );
};

export const LoadDescriptionFormField = <TFieldValues extends { loadDescription: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <TextFormField label={translations.loadDescription} name="loadDescription" {...props} />;
};

export const ServiceFormField = <TFieldValues extends { service: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <TextFormField label={translations.service} name="service" {...props} />;
};

export const StipulationFormField = <TFieldValues extends { stipulation: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <TextFormField label={translations.stipulation} name="stipulation" {...props} multiline />;
};

export const EmailFormField = <TFieldValues extends { email: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <TextFormField label={translations.emailLabel} name="email" {...props} />;
};

export const BookKeepingEmailFormField = <TFieldValues extends { bookKeepingEmail: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <TextFormField label={translations.emailLabel} name="bookKeepingEmail" {...props} />;
};

export const DispositionEmailFormField = <TFieldValues extends { dispositionEmail: any }>(
  props: Partial<TextFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  return <TextFormField label={translations.emailLabel} name="dispositionEmail" {...props} />;
};

const uploadDocStyle = (theme: Theme) =>
  css({
    marginBottom: theme.spacing(3.75),

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1.25, 1.25, 0, 1.25),
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
    },
  });

export const OrderUploadOrderFormField = <
  TFieldValues extends { orderFilename: any; orderUploadId: any }
>(
  props: Partial<UploadOrderDocumentFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  const isMobileView = useIsMobileView();

  return (
    <UploadOrderDocumentFormField
      css={uploadDocStyle}
      filenameFieldName="orderFilename"
      label={translations.orderLabel}
      name="orderUploadId"
      title={translations.orderTitle}
      titleVariant={isMobileView ? 'h4' : 'h2'}
      {...props}
    />
  );
};

export const OrderPODUploadFormField = <
  TFieldValues extends { proofOfDeliveryFilename: any; proofOfDeliveryUploadId: any }
>(
  props: Partial<UploadOrderDocumentFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  const isMobileView = useIsMobileView();

  return (
    <UploadOrderDocumentFormField
      css={uploadDocStyle}
      filenameFieldName="proofOfDeliveryFilename"
      label={translations.proofOfDeliveryLabel}
      name="proofOfDeliveryUploadId"
      title={translations.proofOfDeliveryTitle}
      titleVariant={isMobileView ? 'h4' : 'h2'}
      {...props}
    />
  );
};

export const OrderCreditNoteUploadFormField = <
  TFieldValues extends { creditNoteFilename: any; creditNoteUploadId: any }
>(
  props: Partial<UploadOrderDocumentFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  const isMobileView = useIsMobileView();

  return (
    <UploadOrderDocumentFormField
      css={uploadDocStyle}
      filenameFieldName="creditNoteFilename"
      label={translations.creditNoteLabel}
      name="creditNoteUploadId"
      title={translations.upload}
      titleVariant={isMobileView ? 'h4' : 'h2'}
      {...props}
    />
  );
};

export const UploadProofOfDeliveryFormField = <
  TFieldValues extends { proofOfDeliveryFilename: any; proofOfDeliveryUploadId: any }
>(
  props: Partial<UploadDocumentFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  const isMobileView = useIsMobileView();

  return (
    <UploadDocumentFormField
      css={uploadDocStyle}
      filenameFieldName="proofOfDeliveryFilename"
      label={translations.proofOfDeliveryLabel}
      name="proofOfDeliveryUploadId"
      title={translations.proofOfDeliveryTitle}
      titleVariant={isMobileView ? 'h4' : 'h2'}
      {...props}
    />
  );
};

export const UploadInvoiceFormField = <
  TFieldValues extends { invoiceFilename: any; invoiceUploadId: any }
>(
  props: Partial<UploadDocumentFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  const isMobileView = useIsMobileView();

  return (
    <UploadDocumentFormField
      css={uploadDocStyle}
      filenameFieldName="invoiceFilename"
      label={translations.invoiceLabel}
      name="invoiceUploadId"
      title={translations.invoiceTitle}
      titleVariant={isMobileView ? 'h4' : 'h2'}
      {...props}
    />
  );
};

export const UploadCreditNoteFormField = <
  TFieldValues extends { creditNoteFilename: any; creditNoteUploadId: any }
>(
  props: Partial<UploadDocumentFormFieldProps<TFieldValues>>
) => {
  const translations = useTranslatedText(phrases);
  const isMobileView = useIsMobileView();

  return (
    <UploadDocumentFormField
      css={uploadDocStyle}
      filenameFieldName="creditNoteFilename"
      label={translations.creditNoteLabel}
      name="creditNoteUploadId"
      title={translations.creditNoteTitle}
      titleVariant={isMobileView ? 'h4' : 'h2'}
      {...props}
    />
  );
};
