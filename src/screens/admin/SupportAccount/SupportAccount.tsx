import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { defer, Navigate, RouteObject, useLoaderData } from 'react-router-dom';
import { Grid } from '@mui/material';
import { css, Theme } from '@emotion/react';
import { startOfDay } from 'date-fns';
import { Typography } from 'components/Typography';
import { DateInput } from 'components/DateInput';
import { Button } from 'components/Button';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { fromRoot, path, paths, sibling } from 'paths';
import { useUser } from 'state/user';
import { RegisteredCompany, User } from 'api/types';
import { RegisteredCompaniesResponse } from 'ref-data/admin';
import {
  attachCompanyId,
  deleteCompanyId,
  getAllCompanies,
  setAttachedCompanyList,
  useAttachCompanyStatus,
  useDeleteAttachedCompanyStatus,
} from 'state/admin';
import { PENDING } from 'state';
import { RegisteredCompaniesTable } from './RegisteredCompaniesTable';
import { AttachedCompaniesTable } from './AttachedCompaniesTable';

const phrases = (t: TranslateFn) => ({
  titleLabel: t('Support account selection'),
  yourAccount: t('Your account: '),
  attachYourself: t('Attach yourself until'),
  attachButtonLabel: t('Attach yourself to the selected company'),
  removeButtonLabel: t('Remove yourself from the selected company'),
  errorLoadingCompanies: t('An error occurred loading admin data'),
  backToDashboard: t('Back to the payment dashboard'),
});

const wrapperStyle = (theme: Theme) =>
  css({
    padding: theme.spacing(0, 10),
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  });

const SupportAccountError = () => {
  const translations = useTranslatedText(phrases);
  return (
    <Navigate
      replace
      to={sibling(paths.root.admin.path, 'error')}
      state={{
        description: translations.errorLoadingCompanies,
        actionText: translations.backToDashboard,
        to: fromRoot(paths.root.factoring.path),
      }}
    />
  );
};

export const SupportAccount = memo(() => {
  const translations = useTranslatedText(phrases);
  const isMobileView = useIsMobileView();
  const user = useUser() as User;
  const today = useMemo(() => startOfDay(new Date()), []);
  const [selectedCompany, setSelectedCompany] = useState<RegisteredCompany | undefined>();
  const [selectedAttachedCompany, setSelectedAttachedCompany] = useState<string | undefined>();
  const [attachedUntil, setAttachedUntil] = useState<Date>(today);
  const deleteStatus = useDeleteAttachedCompanyStatus(selectedAttachedCompany);
  const attachStatus = useAttachCompanyStatus(
    selectedCompany
      ? {
          companyId: selectedCompany.companyId,
          companyName: selectedCompany.companyName,
          role: 'support_admin',
          attachedUntil: attachedUntil?.toString(),
        }
      : undefined
  );
  const attachLoading = attachStatus === PENDING;
  const deleteLoading = deleteStatus === PENDING;
  const data = useLoaderData() as {
    registeredCompanies: Promise<RegisteredCompaniesResponse>;
  };

  const handleClickAttach = useCallback(() => {
    if (selectedCompany) {
      attachCompanyId({
        ...selectedCompany,
        role: 'support_admin',
        attachedUntil: attachedUntil?.toString(),
      });
    }
  }, [selectedCompany, attachedUntil]);

  useEffect(() => {
    setAttachedCompanyList();
  }, []);

  return (
    <div css={wrapperStyle}>
      <Typography variant={isMobileView ? 'h2' : 'h1'}>{translations.titleLabel}</Typography>
      <Typography
        css={(theme) => ({ margin: theme.spacing(1.25, 0, 3.75) })}
        variant="body1"
      >{`${translations.yourAccount}${user.email}`}</Typography>
      <Grid container direction="row" spacing={2}>
        <Grid item md={6} xs={12}>
          <RegisteredCompaniesTable
            registeredCompanies={data.registeredCompanies}
            selectedCompany={selectedCompany}
            setSelectedCompany={(company) => setSelectedCompany(company)}
          />
          <Typography
            css={(theme) => ({ marginTop: theme.spacing(2.5) })}
            variant={isMobileView ? 'h3' : 'h2'}
          >
            {translations.attachYourself}
          </Typography>
          <DateInput
            minDate={today}
            value={attachedUntil}
            onChange={(v) => setAttachedUntil(v || today)}
          />
          <Button
            css={(theme) => ({ marginTop: theme.spacing(2.5) })}
            disabled={attachLoading}
            onClick={handleClickAttach}
          >
            {translations.attachButtonLabel}
          </Button>
        </Grid>
        <Grid item md={6} xs={12}>
          <AttachedCompaniesTable
            selectedAttachedCompany={selectedAttachedCompany}
            setSelectedAttachedCompany={(company) => setSelectedAttachedCompany(company)}
          />
          <Button
            css={(theme) => ({ marginTop: theme.spacing(2.75) })}
            disabled={deleteLoading}
            onClick={() => selectedAttachedCompany && deleteCompanyId(selectedAttachedCompany)}
          >
            {translations.removeButtonLabel}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
});

export const SupportAccountRoute: RouteObject[] = [
  {
    path: path(paths.root.admin.supportAccount.path),
    element: <SupportAccount />,
    errorElement: <SupportAccountError />,
    loader: () =>
      defer({
        registeredCompanies: getAllCompanies(),
      }),
  },
];
