import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Typography } from 'components/Typography';
import { Button } from 'components/Button';
import { Form, useForm } from 'components/Form';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { Plus } from 'theme/icons';
import { FormComponentProps } from '../shared/types';
import { useBenficialOwnersFormSchema } from './useBeneficialOwnersFormSchema';
import { DEFAULT_OWNER_VALUES } from './BeneficialOwnerSubForm';
import { BeneficialOwnersFormValues } from './types';
import { useBeneficialOwnersFieldArray } from './useBeneficialOwnersFieldArray';

const phrases = (t: TranslateFn) => ({
  addBeneficialOwnerLabel: t('Add another beneficial owner'),
  submitTitle: t('Submit your information'),
  submitText: t(
    'Click on "submit" to send your information to our factoring partner Walbing. We will immediately check your data and inform you once we are done, so you can start factoring.'
  ),
});

export interface BeneficialOwnersFormProps extends FormComponentProps<BeneficialOwnersFormValues> {}

const DEFAULT_VALUES: BeneficialOwnersFormValues = {
  beneficialOwners: [DEFAULT_OWNER_VALUES],
};

const AdditionalFooterContent = (props: { onAppendOwner: () => void }) => {
  const { onAppendOwner } = props;
  const translations = useTranslatedText(phrases);
  const {
    formState: { isSubmitting },
  } = useFormContext<BeneficialOwnersFormValues>();
  const isMobileView = useIsMobileView();

  return (
    <>
      <Button color="tertiary" disabled={isSubmitting} startIcon={<Plus />} onClick={onAppendOwner}>
        {translations.addBeneficialOwnerLabel}
      </Button>
      <Typography
        css={(theme) => ({ marginTop: theme.spacing(3) })}
        variant={isMobileView ? 'h2' : 'h1'}
      >
        {translations.submitTitle}
      </Typography>
      <Typography
        css={(theme) => ({ marginTop: theme.spacing(1.5), marginBottom: theme.spacing(1.5) })}
        variant="body1"
      >
        {translations.submitText}
      </Typography>
    </>
  );
};

export const BeneficialOwnersForm = memo((props: BeneficialOwnersFormProps) => {
  const { initialValues, loading, onSubmit } = props;
  const schema = useBenficialOwnersFormSchema();

  const api = useForm<BeneficialOwnersFormValues>({
    defaultValues: DEFAULT_VALUES,
    initialValues,
    schema,
  });

  const { appendOwner, elements } = useBeneficialOwnersFieldArray(api);

  return (
    <Form
      additionalFooterContent={<AdditionalFooterContent onAppendOwner={appendOwner} />}
      api={api}
      loading={loading}
      onSubmit={onSubmit}
    >
      {elements}
    </Form>
  );
});
