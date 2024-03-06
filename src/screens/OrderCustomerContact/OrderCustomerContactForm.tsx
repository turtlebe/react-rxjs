import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { css, Theme } from '@emotion/react';
import { Form, useForm } from 'components/Form';
import { Typography } from 'components/Typography';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import {
  BookKeepingContactIdFormField,
  BookKeepingEmailFormField,
  BookKeepingPhoneNumberFormField,
  DispositionContactIdFormField,
  DispositionEmailFormField,
  DispositionPhoneNumberFormField,
} from 'screens/shared/FormFields';
import { NEW_ID } from 'state';
import { loadCustomerCompanyDetails, useCustomerCompanyContacts } from 'state/customers';
import { FormComponentProps } from 'screens/shared/types';
import { useCustomerContactFormSchema } from './useCustomerContactFormSchema';
import { OrderCustomerContactFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  submitLabel: t('Continue to order details'),
  nameLabel: t('Name'),
  emailLabel: t('Email'),
  phoneNumberLabel: t('Telephone'),
  dispositionTitle: t('🚛 Contact Disposition'),
  dispositionDescription: t('This is the right recipient for the order confirmation.'),
  bookKeepingTitle: t('💵 Contact bookkeeping'),
  bookKeepingDescription: t('This is the right recipient for the invoice.'),
});

export interface OrderCustomerContactFormProps
  extends FormComponentProps<OrderCustomerContactFormValues> {}

export const DEFAULT_VALUES: OrderCustomerContactFormValues = {
  bookKeepingContactId: '',
  bookKeepingContactName: '',
  bookKeepingEmail: '',
  bookKeepingPhoneNumber: '',
  dispositionContactId: '',
  dispositionContactName: '',
  dispositionEmail: '',
  dispositionPhoneNumber: '',
};

const bookkeepingHeaderStyle = (theme: Theme) =>
  css({
    gridRow: '1',
    gridColumn: '1',

    [theme.breakpoints.down('md')]: {
      gridRow: '1',
      gridColumn: '1',
    },
  });

const dispatchingHeaderStyle = (theme: Theme) =>
  css({
    gridRow: '1',
    gridColumn: '2',

    [theme.breakpoints.down('md')]: {
      gridRow: '3',
      gridColumn: '1',
      marginTop: theme.spacing(2.5),
    },
  });

const bookkeepingFormStyle = (theme: Theme) =>
  css({
    gridRow: '2',
    gridColumn: '1',
    [theme.breakpoints.down('md')]: {
      gridRow: '2',
      gridColumn: '1',
    },
  });

const dispatchingFormStyle = (theme: Theme) =>
  css({
    gridRow: '2',
    gridColumn: '2',

    [theme.breakpoints.down('md')]: {
      gridRow: '4',
      gridColumn: 1,
    },
  });

export const OrderCustomerContactForm = memo((props: OrderCustomerContactFormProps) => {
  const { initialValues, loading, onSubmit } = props;
  const { customerId } = useParams();
  const translations = useTranslatedText(phrases);
  const schema = useCustomerContactFormSchema();

  const api = useForm<OrderCustomerContactFormValues>({
    defaultValues: DEFAULT_VALUES,
    initialValues,
    schema,
  });

  const { setValue, watch } = api;
  const bookKeepingContactId = watch('bookKeepingContactId');
  const dispositionContactId = watch('dispositionContactId');
  const companyContacts = useCustomerCompanyContacts();

  useEffect(() => {
    if (customerId) {
      loadCustomerCompanyDetails(customerId);
    }
  }, [customerId]);

  useEffect(() => {
    const bookKeepingContact = companyContacts?.find((c) => c.contactId === bookKeepingContactId);

    if (bookKeepingContactId === NEW_ID || bookKeepingContactId === '' || !bookKeepingContact) {
      setValue('bookKeepingPhoneNumber', DEFAULT_VALUES.bookKeepingPhoneNumber);
      setValue('bookKeepingEmail', DEFAULT_VALUES.bookKeepingEmail);
    } else {
      setValue('bookKeepingContactName', bookKeepingContact.contactName || '', {
        shouldValidate: true,
      });
      setValue('bookKeepingPhoneNumber', bookKeepingContact.contactDetails?.phoneNumber || '', {
        shouldValidate: true,
      });
      setValue('bookKeepingEmail', bookKeepingContact.contactDetails?.email || '', {
        shouldValidate: true,
      });
    }
  }, [companyContacts, bookKeepingContactId, setValue]);

  useEffect(() => {
    const dispositionContact = companyContacts.find((c) => c.contactId === dispositionContactId);

    if (dispositionContactId === NEW_ID || dispositionContactId === '' || !dispositionContact) {
      setValue('dispositionPhoneNumber', DEFAULT_VALUES.dispositionPhoneNumber);
      setValue('dispositionEmail', DEFAULT_VALUES.dispositionEmail);
    } else {
      setValue('dispositionContactName', dispositionContact.contactName || '', {
        shouldValidate: true,
      });
      setValue('dispositionPhoneNumber', dispositionContact.contactDetails?.phoneNumber || '', {
        shouldValidate: true,
      });
      setValue('dispositionEmail', dispositionContact.contactDetails?.email || '', {
        shouldValidate: true,
      });
    }
  }, [companyContacts, dispositionContactId, setValue]);

  return (
    <Form
      heightAuto
      api={api}
      flowDirection="column"
      loading={loading}
      submitLabel={translations.submitLabel}
      onSubmit={onSubmit}
    >
      <div css={bookkeepingHeaderStyle}>
        <Typography css={(theme) => ({ marginBottom: theme.spacing(1.25) })} variant="h3">
          {translations.bookKeepingTitle}
        </Typography>
        <Typography css={(theme) => ({ marginBottom: theme.spacing(1.25) })} variant="body1">
          {translations.bookKeepingDescription}
        </Typography>
      </div>
      <div css={bookkeepingFormStyle}>
        <BookKeepingContactIdFormField />
        <BookKeepingEmailFormField label={translations.emailLabel} />
        <BookKeepingPhoneNumberFormField label={translations.phoneNumberLabel} />
      </div>
      <div css={dispatchingHeaderStyle}>
        <Typography css={(theme) => ({ marginBottom: theme.spacing(1.25) })} variant="h3">
          {translations.dispositionTitle}
        </Typography>
        <Typography css={(theme) => ({ marginBottom: theme.spacing(1.25) })} variant="body1">
          {translations.dispositionDescription}
        </Typography>
      </div>
      <div css={dispatchingFormStyle}>
        <DispositionContactIdFormField />
        <DispositionEmailFormField label={translations.emailLabel} />
        <DispositionPhoneNumberFormField label={translations.phoneNumberLabel} />
      </div>
    </Form>
  );
});
