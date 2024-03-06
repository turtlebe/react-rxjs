import { memo, useMemo } from 'react';
import { startOfDay } from 'date-fns';
import { css, Theme } from '@emotion/react';
import { Form, useForm } from 'components/Form';
import { Typography } from 'components/Typography';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { DateFormField } from 'screens/shared/FormFields';
import { FormComponentProps } from 'screens/shared/types';
import { RecordPaymentFormValues } from './types';
import { useRecordPaymentFormSchema } from './useRecordPaymentFormSchema';

const phrases = (t: TranslateFn) => ({
  buttonLabel: t('Record receipt of payment'),
  paymentDateLabel: t('Payment date'),
});

export interface RecordPaymentFormProps extends FormComponentProps<RecordPaymentFormValues> {}

export const DEFAULT_VALUES: RecordPaymentFormValues = {
  paymentReceivedOn: startOfDay(new Date()),
};

export const RecordPaymentForm = memo((props: RecordPaymentFormProps) => {
  const { initialValues, loading, onSubmit } = props;
  const translations = useTranslatedText(phrases);
  const schema = useRecordPaymentFormSchema();

  const api = useForm<RecordPaymentFormValues>({
    defaultValues: DEFAULT_VALUES,
    initialValues,
    schema,
  });

  const headerStyle = (theme: Theme) =>
    css({
      marginBottom: theme.spacing(1.5),
    });

  const today = useMemo(() => startOfDay(new Date()), []);

  return (
    <div>
      <Typography css={headerStyle} variant="h3">
        {translations.paymentDateLabel}
      </Typography>
      <Form
        api={api}
        flowDirection="one-column"
        loading={loading}
        submitLabel={translations.buttonLabel}
        onSubmit={onSubmit}
      >
        <DateFormField
          defaultCalendarMonth={today}
          label={translations.paymentDateLabel}
          maxDate={today}
          name="paymentReceivedOn"
        />
      </Form>
    </div>
  );
});
