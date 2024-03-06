import { memo, useMemo } from 'react';
import { css, Theme } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { startOfDay } from 'date-fns';
import { Form, useForm } from 'components/Form';
import { Typography } from 'components/Typography';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { FormComponentProps } from 'screens/shared/types';
import { DateFormField, OrderCreditNoteUploadFormField } from 'screens/shared/FormFields';
import { useUploadCreditNoteFormSchema } from './useOrderUploadCreditNoteFormSchema';
import { UploadCreditNoteFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  confirmButton: t('Confirm upload'),
  dateOfCreditNote: t('Credit note date'),
  titleLabel: t('📅 Credit note date'),
});

export interface UploadOrderCreditNoteFormProps
  extends FormComponentProps<UploadCreditNoteFormValues> {}

const DEFAULT_VALUES: UploadCreditNoteFormValues = {
  creditNoteDate: null,
  creditNoteFilename: '',
  creditNoteUploadId: '',
};

export const OrderUploadCreditNoteForm = memo((props: UploadOrderCreditNoteFormProps) => {
  const { onSubmit } = props;
  const { companyId, orderId } = useParams();
  const translations = useTranslatedText(phrases);
  const schema = useUploadCreditNoteFormSchema();
  const today = useMemo(() => startOfDay(new Date()), []);

  const api = useForm<UploadCreditNoteFormValues>({
    defaultValues: DEFAULT_VALUES,
    initialValues: undefined,
    schema,
  });

  const formStyle = (theme: Theme) =>
    css({
      [theme.breakpoints.down('md')]: {
        flexGrow: 1,
      },
    });

  return (
    <Form
      api={api}
      css={formStyle}
      flowDirection="one-column"
      submitLabel={translations.confirmButton}
      onSubmit={onSubmit}
    >
      <OrderCreditNoteUploadFormField
        companyId={companyId!}
        documentType="CREDIT_NOTE"
        orderId={orderId!}
      />
      <Typography css={(theme) => ({ marginBottom: theme.spacing(1) })} variant="h3">
        {translations.titleLabel}
      </Typography>
      <DateFormField
        defaultCalendarMonth={today}
        label={translations.dateOfCreditNote}
        maxDate={today}
        name="creditNoteDate"
      />
    </Form>
  );
});
