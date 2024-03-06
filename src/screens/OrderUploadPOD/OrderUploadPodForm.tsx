import { memo } from 'react';
import { css, Theme } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { Form, useForm } from 'components/Form';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { FormComponentProps } from 'screens/shared/types';
import { OrderPODUploadFormField } from '../shared/FormFields';
import { useUploadPodFormSchema } from './useOrderUploadPodFormSchema';
import { UploadPodFormValues } from './types';

const phrases = (t: TranslateFn) => ({
  confirmButton: t('Confirm upload'),
});

export interface UploadOrderPodFormProps extends FormComponentProps<UploadPodFormValues> {}

export const OrderUploadPodForm = memo((props: UploadOrderPodFormProps) => {
  const { onSubmit } = props;
  const { companyId, orderId } = useParams();
  const translations = useTranslatedText(phrases);
  const schema = useUploadPodFormSchema();

  const api = useForm<UploadPodFormValues>({
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
      <OrderPODUploadFormField
        companyId={companyId!}
        documentType="PROOF_OF_DELIVERY"
        orderId={orderId!}
      />
    </Form>
  );
});
