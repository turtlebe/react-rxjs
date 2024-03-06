import { memo, useMemo } from 'react';
import { RouteObject, useNavigate } from 'react-router-dom';
import { Page } from 'components/Page';
import { BackButton } from 'components/Button';
import { Typography } from 'components/Typography';
import { Menu } from 'components/Menu';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { useUser } from 'state/user';
import { PENDING } from 'state';
import { paths } from 'paths';
import { ArrowRight } from 'theme/icons';
import { TruckOsTermsAndConditionsUrl, WalbingTermsAndConditionsUrl } from 'ref-data/misc';

const phrases = (t: TranslateFn) => ({
  backButtonLabel: t('Back'),
  titleLabel: t('Terms & conditions'),
  truckOsTerms: t('truckOS terms & conditions'),
  walbingTerms: t('Walbing terms & conditions'),
});

export const TermsAndConditions = memo(() => {
  const user = useUser();
  const translations = useTranslatedText(phrases);
  const navigate = useNavigate();
  const isMobileView = useIsMobileView();
  const menuItems = useMemo(
    () => [
      {
        rightIcon: <ArrowRight />,
        text: 'truckOS terms & conditions',
        borderBottom: true,
        onClickItem: () => {
          window.open(TruckOsTermsAndConditionsUrl, '_blank');
        },
      },
      {
        rightIcon: <ArrowRight />,
        text: 'Walbing terms & conditions',
        onClickItem: () => {
          window.open(WalbingTermsAndConditionsUrl, '_blank');
        },
      },
    ],
    []
  );

  return (
    <Page>
      {user !== PENDING ? (
        <div>
          <BackButton label={translations.backButtonLabel} onClick={() => navigate(-1)} />
          <Typography
            css={(theme) => ({ margin: theme.spacing(1.25, 0, 3.75) })}
            variant={isMobileView ? 'h2' : 'h1'}
          >
            {translations.titleLabel}
          </Typography>
          <Menu items={menuItems} />
        </div>
      ) : (
        <LoadingBackdrop loading={user === PENDING} />
      )}
    </Page>
  );
});

export const TermsAndConditionsRoute: RouteObject[] = [
  {
    path: paths.root.account.termsAndConditions.path,
    element: <TermsAndConditions />,
  },
];
