import { memo, useCallback, useState } from 'react';
import { RouteObject, useNavigate } from 'react-router-dom';
import { css, Theme } from '@emotion/react';
import posthog from 'posthog-js';
import { Page } from 'components/Page';
import { BackButton, Button } from 'components/Button';
import { Typography } from 'components/Typography';
import { Card } from 'components/Card';
import { CompanyAvatar } from 'components/CompanyAvatar';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { paths } from 'paths';
import { UploadAccountLogoField } from 'screens/shared/FormFields/UploadAccountLogoField';
import {
  deleteAccountCompanyLogoFile,
  getAccountCompanyLogo,
  useSelectedCompany,
} from 'state/user';

const phrases = (t: TranslateFn) => ({
  titleLabel: t('Company logo'),
  descriptionLabel: t(
    'You can upload your company logo so your invoices and order confirmations look great!'
  ),
  backButtonLabel: t('Back'),
  uploadTitle: t('📤 Upload new logo'),
  buttonLabel: t('Upload logo'),
  previewTitle: t('Your current logo'),
  noLogoUploaded: t('No logo uploaded yet'),
  deleteLogo: t('Delete logo'),
});

const logoWrapper = (theme: Theme) =>
  css({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    padding: theme.spacing(1.25, 0, 3.75),
  });

const emptyLogoPreview = (theme: Theme) =>
  css({
    height: 80,
    width: 230,
    borderRadius: 10,
    padding: 5,
    background: theme.palette.background.default,
    border: `1px solid ${theme.palette.background.side}`,
    boxShadow: `0px 0px 10px rgba(0, 0, 0, 0.05)`,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  });

export const AccountCompanyLogoUpload = memo(() => {
  const translations = useTranslatedText(phrases);
  const navigate = useNavigate();
  const isMobileView = useIsMobileView();
  const accountCompany = useSelectedCompany();
  const [logoUrl, setLogoUrl] = useState<string | undefined>(
    accountCompany?.accountCompanyLogo?.logoUrl
  );

  const handleUpdateLogo = useCallback(async () => {
    const url = await getAccountCompanyLogo();
    setLogoUrl(url);
    posthog.capture('Company logo uploaded', {
      companyId: accountCompany?.companyId,
      companyName: accountCompany?.companyName,
    });
  }, [accountCompany?.companyId, accountCompany?.companyName]);

  const handleDeleteLogo = useCallback(async () => {
    const result = await deleteAccountCompanyLogoFile();
    if (result) {
      const url = await getAccountCompanyLogo();
      setLogoUrl(url);
    }
  }, []);

  return (
    <Page header={<BackButton label={translations.backButtonLabel} onClick={() => navigate(-1)} />}>
      <Typography
        css={(theme) => ({ margin: theme.spacing(1.25, 0) })}
        variant={isMobileView ? 'h2' : 'h1'}
      >
        {translations.titleLabel}
      </Typography>
      <Typography
        css={(theme) => ({ margin: theme.spacing(1.25, 0) })}
        variant={isMobileView ? 'body2' : 'body1'}
      >
        {translations.descriptionLabel}
      </Typography>
      <UploadAccountLogoField
        handleUpdateLogo={handleUpdateLogo}
        label={translations.buttonLabel}
        title={translations.uploadTitle}
      />
      <Typography css={(theme) => ({ margin: theme.spacing(3.75, 0, 2) })} variant="h3">
        {translations.previewTitle}
      </Typography>
      <div css={logoWrapper}>
        {logoUrl ? (
          <CompanyAvatar avatarUrl={logoUrl} />
        ) : (
          <Card css={emptyLogoPreview}>
            <Typography variant="h4">{translations.noLogoUploaded}</Typography>
          </Card>
        )}
      </div>
      <Button color="secondary" onClick={handleDeleteLogo}>
        {translations.deleteLogo}
      </Button>
    </Page>
  );
});

export const AccountCompanyLogoUploadRoute: RouteObject[] = [
  {
    path: paths.root.account.uploadLogo.path,
    element: <AccountCompanyLogoUpload />,
  },
];
