import { memo } from 'react';
import { css, Theme } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { Form, useForm } from 'components/Form';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { FormComponentProps } from 'screens/shared/types';
import { OrderUploadOrderFormField } from '../shared/FormFields';
import { UploadOrderFormValues } from './types';
import { useOrderUploadOrderFormSchema } from './useOrderUploadOrderFormSchema';

const phrases = (t: TranslateFn) => ({
  confirmButton: t('Confirm upload'),
});

export interface UploadOrderOrderFormProps extends FormComponentProps<UploadOrderFormValues> {}

export const OrderUploadOrderForm = memo((props: UploadOrderOrderFormProps) => {
  const { onSubmit } = props;
  const { companyId, orderId } = useParams();
  const translations = useTranslatedText(phrases);
  const schema = useOrderUploadOrderFormSchema();

  const api = useForm<UploadOrderFormValues>({
    defaultValues: undefined,
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
      <OrderUploadOrderFormField
        companyId={companyId!}
        documentType="ORDER_DETAILS"
        orderId={orderId!}
      />
    </Form>
  );
});
