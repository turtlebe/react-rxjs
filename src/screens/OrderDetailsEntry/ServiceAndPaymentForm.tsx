import { memo } from 'react';
import { Grid } from '@mui/material';
import { IconButton } from 'components/Button';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { CurrencyFormField, ServiceFormField } from 'screens/shared/FormFields';
import { Bin } from 'theme/icons';

export interface ServiceAndPaymentFormProps {
  handleDelete: (id: number) => void;
  index: number;
}

const phrases = (t: TranslateFn) => ({
  netAmount: t('Amount (net)'),
});

export const ServiceAndPaymentForm = memo((props: ServiceAndPaymentFormProps) => {
  const { handleDelete, index } = props;
  const translations = useTranslatedText(phrases);

  return (
    <Grid container direction="row" spacing={1.25}>
      <Grid item xs={index === 0 ? 8 : 7}>
        <ServiceFormField namePath={['services', index]} />
      </Grid>
      <Grid item xs={4}>
        <CurrencyFormField
          country="DE"
          label={translations.netAmount}
          name="netAmount"
          namePath={['services', index]}
        />
      </Grid>
      {index > 0 && (
        <Grid item xs={1}>
          <IconButton
            css={(theme) => ({ marginTop: theme.spacing(2) })}
            onClick={() => handleDelete(index)}
          >
            <Bin />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
});
