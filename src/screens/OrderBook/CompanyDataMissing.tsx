import { memo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { posthog } from 'posthog-js';
import { Card } from 'components/Card';
import { Typography } from 'components/Typography';
import { Button } from 'components/Button';
import { TruckGraphic } from 'components/TruckGraphic';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { fromRoot, path, paths, sibling } from 'paths';

const phrases = (t: TranslateFn) => ({
  welcomeLabel: t('Welcome to truckOS!'),
  subtitleLabel: t('We just need a few infos before you can start managing your orders'),
  ctaText: t(
    'We need some information about your company as well as your bank details so that we can generate order confirmations and invoices for you.'
  ),
  verifyButtonLabel: t('Add your company data now'),
});

export const CompanyDataMissing = memo(() => {
  const translations = useTranslatedText(phrases);
  const { companyId } = useParams();
  const navigate = useNavigate();

  const handleVerify = useCallback(() => {
    if (companyId) {
      navigate(sibling(path(paths.root.kycLight.path, companyId)));
    } else {
      navigate(fromRoot(paths.root.kycLight.path));
      posthog.capture('KYClight started');
    }
  }, [companyId, navigate]);

  return (
    <Card css={(theme) => ({ textAlign: 'center', padding: theme.spacing(1.25, 2.5, 2.5) })}>
      <Typography css={(theme) => ({ marginBottom: theme.spacing(1.25) })} variant="h2">
        {translations.welcomeLabel}
      </Typography>
      <TruckGraphic css={(theme) => ({ height: theme.spacing(19.5) })} />
      <Typography css={(theme) => ({ margin: theme.spacing(1.25, 6.25, 2.5) })} variant="h4">
        {translations.subtitleLabel}
      </Typography>
      <Typography css={(theme) => ({ marginBottom: theme.spacing(4) })} variant="body1">
        {translations.ctaText}
      </Typography>
      <Button color="primary" onClick={handleVerify}>
        {translations.verifyButtonLabel}
      </Button>
    </Card>
  );
});
