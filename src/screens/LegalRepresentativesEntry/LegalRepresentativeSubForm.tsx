import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Card } from 'components/Card';
import { IconButton } from 'components/Button';
import { Bin } from 'theme/icons';
import {
  DobFormField,
  EmailFormField,
  FirstNameFormField,
  LanguageFormField,
  LastNameFormField,
} from '../shared/FormFields';
import { LegalRepresentativesFormValues, RepresentativeFormValues } from './types';

const SoleRepTitle = 'Sole representative';
const JointRepTitle = 'Representative';

export interface LegalRepresentativeSubFormProps {
  id: string;
  index: number;
  onRemoveRep: (index: number) => void;
}

export const DEFAULT_REP_VALUES: RepresentativeFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  dob: null,
  language: 'de_DE',
};

export const LegalRepresentativeSubForm = memo((props: LegalRepresentativeSubFormProps) => {
  const { id, index, onRemoveRep } = props;
  const { watch } = useFormContext<LegalRepresentativesFormValues>();

  const powerOfRepresentation = watch('powerOfRepresentation');

  const firstRepTitle = powerOfRepresentation === 'sole' ? SoleRepTitle : `${JointRepTitle} 1`;

  return (
    <Card
      key={id}
      title={index === 0 ? firstRepTitle : `${JointRepTitle} ${index + 1}`}
      variant="outlined"
      headerButton={
        index > 1 ? (
          <IconButton
            aria-label="remove representative"
            size="small"
            onClick={() => onRemoveRep(index)}
          >
            <Bin />
          </IconButton>
        ) : undefined
      }
    >
      <FirstNameFormField namePath={['representatives', index]} />
      <LastNameFormField namePath={['representatives', index]} />
      <EmailFormField namePath={['representatives', index]} />
      <DobFormField namePath={['representatives', index]} />
      <LanguageFormField namePath={['representatives', index]} />
    </Card>
  );
});
