import { memo } from 'react';
import { Card } from 'components/Card';
import { IconButton } from 'components/Button';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { Bin } from 'theme/icons';
import {
  CityFormField,
  CountryFormField,
  DobFormField,
  FirstNameFormField,
  LastNameFormField,
  NationalityFormField,
  PlaceOfBirthFormField,
  PostcodeFormField,
  StreetAndNumberFormField,
} from '../shared/FormFields';
import { BenficialOwnerFormValues } from './types';

const phrases = (t: TranslateFn) => ({ beneficialOwnerCardTitle: t('Beneficial owner') });

export interface BeneficialOwnerSubFormProps {
  id: string;
  index: number;
  onRemoveOwner: (index: number) => void;
}

export const DEFAULT_OWNER_VALUES: BenficialOwnerFormValues = {
  city: '',
  firstName: '',
  country: 'DE',
  dob: null,
  lastName: '',
  nationality: 'DE',
  placeOfBirth: '',
  postcode: '',
  streetAndNumber: '',
};

export const BeneficialOwnerSubForm = memo((props: BeneficialOwnerSubFormProps) => {
  const { id, index, onRemoveOwner } = props;
  const translations = useTranslatedText(phrases);

  return (
    <Card
      key={id}
      title={`${translations.beneficialOwnerCardTitle} ${index + 1}`}
      variant="outlined"
      headerButton={
        index > 0 ? (
          <IconButton
            aria-label="remove beneficial owner"
            size="small"
            onClick={() => onRemoveOwner(index)}
          >
            <Bin />
          </IconButton>
        ) : undefined
      }
    >
      <FirstNameFormField namePath={['beneficialOwners', index]} />
      <LastNameFormField namePath={['beneficialOwners', index]} />
      <DobFormField namePath={['beneficialOwners', index]} />
      <PlaceOfBirthFormField namePath={['beneficialOwners', index]} />
      <NationalityFormField namePath={['beneficialOwners', index]} />
      <StreetAndNumberFormField namePath={['beneficialOwners', index]} />
      <PostcodeFormField namePath={['beneficialOwners', index]} />
      <CityFormField namePath={['beneficialOwners', index]} />
      <CountryFormField namePath={['beneficialOwners', index]} />
    </Card>
  );
});
