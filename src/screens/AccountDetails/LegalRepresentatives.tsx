import { forwardRef, useCallback } from 'react';
import { Grid } from '@mui/material';
import format from 'date-fns/format';
import { Typography } from 'components/Typography';
import { Card, CardLineItem } from 'components/Card';
import { TranslateFn, useTranslatedText, withParams } from 'hooks/useTranslatedText';

export type TLegalRepresentative = {
  dob: string;
  email: string;
  firstName: string;
  lastName: string;
};

export interface LegalRepresentativesProps {
  representatives: TLegalRepresentative[];
}

const phrases = (t: TranslateFn) => ({
  name: t('Name'),
  email: t('Email'),
  birthDate: t('Birthdate'),
  soleLegalRepresentative: t('Sole legal representative'),
  legalRepresentativeWithNumber: withParams<'index'>((p) => t('Legal representative {{index}}', p)),
});

export const LegalRepresentative = forwardRef<
  HTMLDivElement,
  TLegalRepresentative & { title: string }
>((props, ref) => {
  const { dob, email, firstName, lastName, title } = props;
  const translations = useTranslatedText(phrases);
  return (
    <Card color="tertiary" ref={ref}>
      <Typography css={(theme) => ({ marginBottom: theme.spacing(1.5) })}>{title}</Typography>
      <CardLineItem label={translations.name} space="small" value={`${firstName} ${lastName}`} />
      <CardLineItem label={translations.email} space="small" value={email} />
      <CardLineItem
        label={translations.birthDate}
        space="small"
        value={format(new Date(dob), 'MM.dd.yyyy')}
      />
    </Card>
  );
});

export const LegalRepresentatives = forwardRef<HTMLDivElement, LegalRepresentativesProps>(
  (props, ref) => {
    const { representatives } = props;
    const translation = useTranslatedText(phrases);
    const getTitle = useCallback(
      (id: number) => {
        if (representatives.length === 1) {
          return translation.soleLegalRepresentative;
        }
        return translation.legalRepresentativeWithNumber({ index: `${id}` });
      },
      [representatives, translation]
    );
    return (
      <Grid container ref={ref} spacing={2}>
        {representatives.map((rep, index) => (
          <Grid item key={getTitle(index + 1)} md={representatives.length === 1 ? 12 : 6} xs={12}>
            <LegalRepresentative {...rep} title={getTitle(index + 1)} />
          </Grid>
        ))}
      </Grid>
    );
  }
);
