import { forwardRef, useCallback } from 'react';
import { Grid } from '@mui/material';
import { Typography } from 'components/Typography';
import { Card, CardLineItem } from 'components/Card';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { KycBeneficialOwners } from 'api/types';

export type TBeneficialOwner = {
  city: string;
  country: string;
  firstName: string;
  lastName: string;
  nationality: string;
  placeOfBirth: string;
  postcode: string;
  streetAndNumber: string;
};

export interface BeneficialOwnersProps {
  owners: KycBeneficialOwners;
}

const phrases = (t: TranslateFn) => ({
  name: t('Name'),
  placeOfBirth: t('Place of birth'),
  nationality: t('Nationality'),
  street: t('Street'),
  postcode: t('Postcode'),
  city: t('City'),
  country: t('Country'),
  beneficialOwner: t('Beneficial owner'),
});

export const BeneficialOwner = forwardRef<HTMLDivElement, TBeneficialOwner & { title: string }>(
  (props, ref) => {
    const {
      city,
      country,
      firstName,
      lastName,
      nationality,
      placeOfBirth,
      postcode,
      streetAndNumber,
      title,
    } = props;
    const translations = useTranslatedText(phrases);
    return (
      <Card color="tertiary" ref={ref}>
        <Typography css={(theme) => ({ marginBottom: theme.spacing(1.5) })}>{title}</Typography>
        <CardLineItem label={translations.name} space="small" value={`${firstName} ${lastName}`} />
        <CardLineItem label={translations.placeOfBirth} space="small" value={placeOfBirth} />
        <CardLineItem label={translations.nationality} space="small" value={nationality} />
        <CardLineItem label={translations.street} space="small" value={streetAndNumber} />
        <CardLineItem label={translations.postcode} space="small" value={postcode} />
        <CardLineItem label={translations.city} space="small" value={city} />
        <CardLineItem label={translations.country} space="small" value={country} />
      </Card>
    );
  }
);

export const BeneficialOwners = forwardRef<HTMLDivElement, KycBeneficialOwners>((props, ref) => {
  const { beneficialOwners } = props;
  const translation = useTranslatedText(phrases);
  const getTitle = useCallback(
    (id: number) => {
      if (beneficialOwners.length === 1) {
        return translation.beneficialOwner;
      }
      return `${translation.beneficialOwner} ${id}`;
    },
    [beneficialOwners, translation]
  );
  return (
    <Grid container ref={ref} spacing={2}>
      {beneficialOwners.map((rep, index) => (
        <Grid item key={getTitle(index + 1)} md={beneficialOwners.length === 1 ? 12 : 6} xs={12}>
          <BeneficialOwner {...rep} title={getTitle(index + 1)} />
        </Grid>
      ))}
    </Grid>
  );
});
