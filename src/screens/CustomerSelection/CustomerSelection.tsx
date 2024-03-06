import { ChangeEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import { css, Theme } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { Autocomplete, MenuItem, Select } from '@mui/material';
import { Subscription } from 'rxjs';
import { Button } from 'components/Button';
import { Typography } from 'components/Typography';
import { SearchInput } from 'components/TextInput';
import { Option } from 'components/types';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { useWorkflowNavigation } from 'hooks/useWorkflowNavigation';
import { WorkflowLayoutContent } from 'screens/shared/Workflow';
import { paths, sibling } from 'paths';
import {
  loadCustomerCompanyDetails,
  setCustomerSearchText,
  useCustomerCompanyDetails,
  useGlobalCustomers,
} from 'state/customers';
import { PENDING } from 'state';
import { AutocompleteOption } from 'screens/shared/FormFields/AutocompleteWithCreateFormField';
import { sendCustomerInformationForm } from 'state/payments';
import { CustomerInformationFormValues } from 'screens/shared/CustomerInformationForm/types';
import { CompanySummary } from 'api/types';

const DEFAULT_TOS_COMPANY_OPTIONS: AutocompleteOption[] = [];
const DEFAULT_PREV_COMPANY_OPTIONS: Option[] = [];

const phrases = (t: TranslateFn) => ({
  title: t('Customer selection'),
  description: t(
    'Please select one of your previous customers or search for a customer in our database. If you can’t find you customer there either, we will create a new customer record.'
  ),
  previousCustomer: t('Your previous customers'),
  clickHere: t('Click here'),
  customerDatabase: t('Customer database'),
  notFound: t("Haven't found your customer yet?"),
  companyName: t('Company name'),
  createNew: t('+ Create new customer record'),
  noOptions: t('No options'),
});

const searchStyle = (theme: Theme) =>
  css({
    color: theme.palette.text.secondary,
    '& > .MuiInputBase-root': {
      borderRadius: theme.spacing(1.25),
    },
    '& > .MuiOutlinedInput-root': {
      paddingRight: `${theme.spacing(1.5)}!important`,
    },
  });

const selectStyle = (theme: Theme) =>
  css({
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
    '& > .MuiSelect-select': {
      padding: `${theme.spacing(1, 1.5)}!important`,
    },
    '&.Mui-focused fieldset': {
      borderColor: `${theme.palette.text.primary}!important`,
    },
  });

export const CustomerSelection = memo((props: { prevCompanies?: CompanySummary[] }) => {
  const { prevCompanies } = props;
  const translations = useTranslatedText(phrases);
  const navigate = useNavigate();
  const { next } = useWorkflowNavigation();
  const { paymentId } = useParams();
  const companyDetails = useCustomerCompanyDetails();
  const subscription = useRef<Subscription>();
  const [selected, setSelected] = useState<boolean>(false);
  const globalCompanies = useGlobalCustomers();

  const globalCompanyOptions =
    globalCompanies !== PENDING && globalCompanies?.length
      ? globalCompanies.map(({ companyId, companyName }) => ({
          id: companyId,
          label: companyName,
          name: companyName,
        }))
      : DEFAULT_TOS_COMPANY_OPTIONS;

  const prevCompanyOptions: Option[] = prevCompanies?.length
    ? prevCompanies.map(({ companyId, companyName }) => ({
        label: companyName,
        value: companyId,
      }))
    : DEFAULT_PREV_COMPANY_OPTIONS;

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCustomerSearchText(e.target.value.trim());
  }, []);

  useEffect(() => {
    if (companyDetails && companyDetails !== PENDING && paymentId && selected) {
      subscription.current = sendCustomerInformationForm(
        paymentId,
        companyDetails.form as CustomerInformationFormValues
      ).subscribe((result) => {
        if (result) {
          next(companyDetails.form.companyId);
        }
      });
    }
  }, [companyDetails, paymentId, selected, next]);

  return (
    <WorkflowLayoutContent description={translations.description} title={translations.title}>
      <Typography variant="h2">{translations.previousCustomer}</Typography>
      <Select
        displayEmpty
        css={selectStyle}
        renderValue={() => translations.clickHere}
        onChange={(e) => {
          setSelected(true);
          loadCustomerCompanyDetails(e.target.value as string);
        }}
      >
        {prevCompanyOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <Typography css={(theme) => ({ marginTop: theme.spacing(4.5) })} variant="h2">
        {translations.customerDatabase}
      </Typography>
      <Autocomplete
        noOptionsText={translations.noOptions}
        options={globalCompanyOptions}
        renderInput={(params) => (
          <SearchInput
            {...params}
            css={searchStyle}
            placeholder={translations.companyName}
            onChange={handleSearchChange}
          />
        )}
        onChange={(_, newValue) => {
          const option = globalCompanyOptions.find(({ name }) => name === newValue?.name);
          if (option) {
            setSelected(true);
            loadCustomerCompanyDetails(option.id);
          }
        }}
      />
      <Typography css={(theme) => ({ margin: theme.spacing(4.5, 0, 2.5) })} variant="h2">
        {translations.notFound}
      </Typography>
      <Button
        color="secondary"
        css={(theme) => ({ border: `1px solid ${theme.palette.secondary.main}` })}
        onClick={() => navigate(sibling(paths.root.factoring.createPayment.newCustomer.path))}
      >
        {translations.createNew}
      </Button>
    </WorkflowLayoutContent>
  );
});
