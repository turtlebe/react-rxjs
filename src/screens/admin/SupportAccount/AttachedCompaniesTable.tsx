import { memo, useCallback } from 'react';
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
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useDateFormat } from 'hooks/useDateFormat';
import { useIsMobileView } from 'hooks/useIsMobileView';
import { useAttachedCompaniesList } from 'state/admin';

export type AttachedCompaniesTableProps = {
  selectedAttachedCompany: string | undefined;
  setSelectedAttachedCompany: (company: string) => void;
};

const phrases = (t: TranslateFn) => ({
  attachedCompanies: t('Companies you are attached to'),
  companyName: t('Company name'),
  yourRole: t('Your role'),
  attachedUntil: t('Attached until'),
  errorLoadingCompanies: t('An error occurred loading company data'),
  noAttachedCompany: t('There is no company attached to you.'),
});

const tableContainerStyle = (theme: Theme) =>
  css({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1.25),
    padding: theme.spacing(1.25, 2.5),
    marginTop: theme.spacing(2.5),
    minHeight: theme.spacing(79),
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

const emptyContainerStyle = (theme: Theme) =>
  css({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(35),
  });

export const DateTableCell = memo((props: { attachedUntil: string }) => {
  const { attachedUntil } = props;
  const formattedDate = useDateFormat(attachedUntil);
  return <TableCell css={bodyStyle}>{formattedDate}</TableCell>;
});

export const AttachedCompaniesTable = memo((props: AttachedCompaniesTableProps) => {
  const { selectedAttachedCompany, setSelectedAttachedCompany } = props;
  const isMobileView = useIsMobileView();
  const attachedCompanies = useAttachedCompaniesList();
  const translations = useTranslatedText(phrases);
  const formattedRole = useCallback((role: string) => {
    const strArr = role.split('_');
    return strArr.map((item) => item[0].toUpperCase() + item.substring(1)).join(' ');
  }, []);

  return (
    <div>
      <Typography variant={isMobileView ? 'h4' : 'h2'}>{translations.attachedCompanies}</Typography>
      <div css={tableContainerStyle}>
        {attachedCompanies.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell css={headerStyle} />
                <TableCell css={headerStyle}>{translations.companyName}</TableCell>
                <TableCell css={headerStyle}>{translations.yourRole}</TableCell>
                <TableCell css={headerStyle}>{translations.attachedUntil}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attachedCompanies.map((company) => (
                <TableRow key={company.companyId}>
                  <TableCell css={bodyStyle}>
                    <Checkbox
                      checked={selectedAttachedCompany === company.companyId}
                      size="medium"
                      onChange={() => setSelectedAttachedCompany(company.companyId)}
                    />
                  </TableCell>
                  <TableCell css={bodyStyle}>{company.companyName}</TableCell>
                  <TableCell css={bodyStyle}>{formattedRole(company.role)}</TableCell>
                  <DateTableCell attachedUntil={company.attachedUntil} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div css={emptyContainerStyle}>
            <Typography>{translations.noAttachedCompany}</Typography>
          </div>
        )}
      </div>
    </div>
  );
});
