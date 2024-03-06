import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { Form, useForm } from 'components/Form';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { RadioGroupFormField } from 'screens/shared/FormFields';
import { Plus } from 'theme/icons';
import { PowerofRepOptions, YesNoOptions } from 'ref-data/misc';
import { FormComponentProps } from '../shared/types';
import { useLegalRepresentativesFormSchema } from './useLegalRepresentativesFormSchema';
import { DEFAULT_REP_VALUES } from './LegalRepresentativeSubForm';
import { LegalRepresentativesFormValues } from './types';
import { useLegalRepresentativesFieldArray } from './useLegalRepresentativesFieldArray';

const phrases = (t: TranslateFn) => ({
  areYouRepTitle: t('Are you a legal representative?'),
  areYouRepSubtitle: t(
    "Are you a legal representative of your company, as stated in the company's article of association? You do not have to be in order to complete this registration."
  ),
  powerOfRepTitle: t('Power of representation'),
  powerOfRepSubtitle: t(
    'Does your company have sole power of representation or do legal representatives only act together with other legal representatives?'
  ),
  addRepsLabel: t('Add another representative'),
  nextLabel: t('Next'),
  enteredAllRepsLabel: t('I have entered all representatives'),
});

export interface LegalRepresentativesFormProps
  extends FormComponentProps<LegalRepresentativesFormValues> {}

const DEFAULT_VALUES: LegalRepresentativesFormValues = {
  areYouLegalRepresentative: 'yes',
  powerOfRepresentation: 'sole',
  representatives: [DEFAULT_REP_VALUES],
};

const AdditionalFooterContent = (props: { onAppendRep: () => void }) => {
  const { onAppendRep } = props;
  const translations = useTranslatedText(phrases);
  const {
    formState: { isSubmitting },
  } = useFormContext<LegalRepresentativesFormValues>();

  return (
    <Button color="tertiary" disabled={isSubmitting} startIcon={<Plus />} onClick={onAppendRep}>
      {translations.addRepsLabel}
    </Button>
  );
};

export const LegalRepresentativesForm = memo((props: LegalRepresentativesFormProps) => {
  const { initialValues, loading, onSubmit } = props;
  const translations = useTranslatedText(phrases);
  const isMobileView = useIsMobileView();
  const schema = useLegalRepresentativesFormSchema();

  const api = useForm<LegalRepresentativesFormValues>({
    defaultValues: DEFAULT_VALUES,
    initialValues,
    schema,
  });

  const { appendRepresentative, elements } = useLegalRepresentativesFieldArray(api);

  const powerOfRepresentation = api.watch('powerOfRepresentation');

  return (
    <Form
      api={api}
      flowDirection="column"
      loading={loading}
      additionalFooterContent={
        powerOfRepresentation === 'joint' ? (
          <AdditionalFooterContent onAppendRep={appendRepresentative} />
        ) : undefined
      }
      submitLabel={
        powerOfRepresentation === 'joint'
          ? translations.enteredAllRepsLabel
          : translations.nextLabel
      }
      onSubmit={onSubmit}
    >
      <Card subtitle={translations.areYouRepSubtitle} title={translations.areYouRepTitle}>
        <RadioGroupFormField name="areYouLegalRepresentative" options={YesNoOptions} />
      </Card>
      <Card subtitle={translations.powerOfRepSubtitle} title={translations.powerOfRepTitle}>
        <RadioGroupFormField name="powerOfRepresentation" options={PowerofRepOptions} />
      </Card>
      <div css={!isMobileView ? { gridColumn: 2, gridRow: '1 / 4' } : undefined}>{elements}</div>
    </Form>
  );
});
