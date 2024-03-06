import { memo } from 'react';
import { css, Theme } from '@emotion/react';
import { Form, useForm } from 'components/Form';
import { Typography } from 'components/Typography';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { EmailFormField } from 'screens/shared/FormFields';
import { FormComponentProps } from 'screens/shared/types';
import { Order } from 'api/types';
import { LoadSection } from '../shared/Order/LoadSection';
import { PlaceOfLoadingSection } from '../shared/Order/PlaceOfLoadingSection';
import { ShareOrderFormValues } from './types';
import { useShareOrderFormSchema } from './useShareOrderFormSchema';

const phrases = (t: TranslateFn) => ({
  description: t('The following infos will be shared:'),
  buttonLabel: t('Share order via email'),
  recipientLabel: t('Email of recipient'),
  emailLabel: t('Email'),
});

export interface ShareOrderFormProps extends FormComponentProps<ShareOrderFormValues> {
  order: Order;
}

export const ShareOrderForm = memo((props: ShareOrderFormProps) => {
  const { loading, onSubmit, order } = props;
  const translations = useTranslatedText(phrases);
  const schema = useShareOrderFormSchema();

  const api = useForm<ShareOrderFormValues>({
    schema,
  });

  const headerStyle = (theme: Theme) =>
    css({
      marginBottom: theme.spacing(0.5),
    });

  return (
    <Form
      api={api}
      flowDirection="one-column"
      loading={loading}
      submitLabel={translations.buttonLabel}
      onSubmit={onSubmit}
    >
      <Typography css={(theme) => ({ marginBottom: theme.spacing(3) })} variant="body1">
        {translations.description}
      </Typography>
      <PlaceOfLoadingSection
        hideEdit
        editPath=""
        timeWindow={order.orderDetails?.loadDetails?.loadingTimeAndPlace?.timeWindow}
        venue={order.orderDetails?.loadDetails?.loadingTimeAndPlace?.venue}
      />
      <PlaceOfLoadingSection
        hideEdit
        unloading
        editPath=""
        timeWindow={order.orderDetails?.loadDetails?.unloadingTimeAndPlace?.timeWindow}
        venue={order.orderDetails?.loadDetails?.unloadingTimeAndPlace?.venue}
      />
      <LoadSection
        hideEdit
        editPath=""
        loadDescription={order.orderDetails?.loadDetails?.loadDescription}
      />
      <Typography css={headerStyle} variant="h3">
        {translations.recipientLabel}
      </Typography>
      <EmailFormField label={translations.emailLabel} name="email" />
    </Form>
  );
});
