import { memo, Suspense } from 'react';
import { css, Theme } from '@emotion/react';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Await } from 'react-router-dom';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { RegisteredCompany } from 'api/types';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';
import { RegisteredCompaniesResponse } from 'ref-data/admin';

export type RegisteredCompaniesTableProps = {
  registeredCompanies: Promise<RegisteredCompaniesResponse>;
  selectedCompany: RegisteredCompany | undefined;
  setSelectedCompany: (company: RegisteredCompany) => void;
};

const phrases = (t: TranslateFn) => ({
  allCompanies: t('All companies on truckOS'),
  companyName: t('Company name'),
  kycStatus: t('KYC status'),
  errorLoadingCompanies: t('An error occurred loading company data'),
});

const RegisteredCompaniesError = () => {
  const translations = useTranslatedText(phrases);

  return (
    <div>
      <Typography>{translations.errorLoadingCompanies}</Typography>
    </div>
  );
};

const tableContainerStyle = (theme: Theme) =>
  css({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1.25),
    padding: theme.spacing(1.25, 2.5),
    marginTop: theme.spacing(2.5),
    minHeight: theme.spacing(66.5),
  });

const headerStyle = (theme: Theme) =>
  css({
    fontSize: theme.typography.button.fontSize,
    fontWeight: theme.typography.button.fontWeight,
    padding: theme.spacing(1.25, 0),
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.body2.fontSize,
    },
  });

const bodyStyle = (theme: Theme) =>
  css({
    fontSize: theme.typography.button.fontSize,
    padding: 0,
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.body2.fontSize,
    },
  });

export const RegisteredCompaniesTable = memo((props: RegisteredCompaniesTableProps) => {
  const isMobileView = useIsMobileView();
  const { registeredCompanies, selectedCompany, setSelectedCompany } = props;
  const translations = useTranslatedText(phrases);
  return (
    <div>
      <Typography variant={isMobileView ? 'h4' : 'h2'}>{translations.allCompanies}</Typography>
      <div css={tableContainerStyle}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell css={headerStyle} />
              <TableCell css={headerStyle}>{translations.companyName}</TableCell>
              <TableCell css={headerStyle}>{translations.kycStatus}</TableCell>
            </TableRow>
          </TableHead>
          <Suspense fallback={<LoadingBackdrop loading />}>
            <Await errorElement={<RegisteredCompaniesError />} resolve={registeredCompanies}>
              {(registeredCompaniesData: RegisteredCompaniesResponse) => (
                <TableBody>
                  {registeredCompaniesData.companies.map((company) => (
                    <TableRow key={company.companyId}>
                      <TableCell css={bodyStyle}>
                        <Checkbox
                          checked={selectedCompany?.companyId === company.companyId}
                          size="medium"
                          onChange={() => setSelectedCompany(company)}
                        />
                      </TableCell>
                      <TableCell css={bodyStyle}>{company.companyName}</TableCell>
                      <TableCell css={bodyStyle}>{company.kycStatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Await>
          </Suspense>
        </Table>
      </div>
    </div>
  );
});
