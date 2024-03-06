import { memo } from 'react';
import { css, Theme } from '@emotion/react';
import { Form, useForm } from 'components/Form';
import { Typography } from 'components/Typography';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { FormComponentProps } from 'screens/shared/types';
import { TextFormField } from 'screens/shared/FormFields';
import { useOrderCreateInvoiceFormSchema } from './useOrderCreateInvoiceFormSchema';
import { CreateInvoiceFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  confirmButton: t('Create invoice preview'),
  title: t('Create invoice'),
  invoiceNumberLabel: t('Invoice number'),
  invoiceNumberDescription: t('Please provide the invoice number for this invoice.'),
});

export interface OrderCreateInvoiceFormProps extends FormComponentProps<CreateInvoiceFormValues> {}

export const OrderCreateInvoiceForm = memo((props: OrderCreateInvoiceFormProps) => {
  const { loading, onSubmit } = props;
  const translations = useTranslatedText(phrases);
  const schema = useOrderCreateInvoiceFormSchema();

  const api = useForm<CreateInvoiceFormValues>({
    defaultValues: undefined,
    initialValues: undefined,
    schema,
  });

  const formStyle = (theme: Theme) =>
    css({
      paddingTop: theme.spacing(3),

      [theme.breakpoints.down('md')]: {
        flexGrow: 1,
      },
    });

  return (
    <Form
      heightAuto
      api={api}
      css={formStyle}
      flowDirection="one-column"
      loading={loading}
      submitLabel={translations.confirmButton}
      onSubmit={onSubmit}
    >
      <Typography css={(theme) => ({ marginBottom: theme.spacing(1) })} variant="h3">
        {translations.invoiceNumberLabel}
      </Typography>
      <TextFormField label={translations.invoiceNumberLabel} name="invoiceNumber" />
      <Typography variant="body2">{translations.invoiceNumberDescription}</Typography>
    </Form>
  );
});
