import { ChangeEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import { css, Theme } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { Autocomplete, MenuItem, Select } from '@mui/material';
import { Subscription } from 'rxjs';
import posthog from 'posthog-js';
import { Button } from 'components/Button';
import { Typography } from 'components/Typography';
import { SearchInput } from 'components/TextInput';
import { Option } from 'components/types';
import { ForestHeaderPage } from 'components/Page';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { CustomerInformationFormValues } from 'screens/shared/CustomerInformationForm/types';
import { path, paths, sibling } from 'paths';
import {
  loadCustomerCompanyDetails,
  setCustomerSearchText,
  useCustomerCompanyDetails,
  useGlobalCustomers,
} from 'state/customers';
import { PENDING } from 'state';
import { AutocompleteOption } from 'screens/shared/FormFields/AutocompleteWithCreateFormField';
import { sendOrderCustomerInformationForm } from 'state/orders';
import { CompanySummary } from 'api/types';

const DEFAULT_TOS_CUSTOMER_OPTIONS: AutocompleteOption[] = [];
const DEFAULT_PREV_CUSTOMER_OPTIONS: Option[] = [];

const phrases = (t: TranslateFn) => ({
  title: t('Customer selection'),
  description: t(
    'Please select one of your previous customers or search for a customer in our database. If you can’t find you customer there either, we will create a new customer record.'
  ),
  previousCustomer: t('Your previous customers'),
  clickHere: t('Click here'),
  noPreviousCustomers: t('No previous customers'),
  customerDatabase: t('Customer database'),
  notFound: t("Haven't found your customer yet?"),
  companyName: t('Company name'),
  createNew: t('+ Create new customer record'),
  searching: t('Searching...'),
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

export const CreateOrderCustomerSelectionPage = memo(
  (props: { prevCompanies?: CompanySummary[] }) => {
    const { prevCompanies } = props;
    const translations = useTranslatedText(phrases);
    const navigate = useNavigate();
    const { orderId } = useParams();
    const customerDetails = useCustomerCompanyDetails();
    const subscription = useRef<Subscription>();
    const [selected, setSelected] = useState<boolean>(false);
    const globalCustomers = useGlobalCustomers();

    const globalCustomerOptions =
      globalCustomers !== PENDING && globalCustomers?.length
        ? globalCustomers.map(({ companyId, companyName }) => ({
            id: companyId,
            label: companyName,
            name: companyName,
          }))
        : DEFAULT_TOS_CUSTOMER_OPTIONS;

    const searching = globalCustomers === PENDING;

    const prevCompanyOptions: Option[] = prevCompanies?.length
      ? prevCompanies.map(({ companyId, companyName }) => ({
          label: companyName,
          value: companyId,
        }))
      : DEFAULT_PREV_CUSTOMER_OPTIONS;

    const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setCustomerSearchText(e.target.value.trim());
    }, []);

    useEffect(() => {
      if (customerDetails && customerDetails !== PENDING && selected) {
        if (orderId) {
          subscription.current = sendOrderCustomerInformationForm(
            orderId,
            customerDetails.form as CustomerInformationFormValues
          ).subscribe((result) => {
            if (result) {
              navigate(
                sibling(
                  `${paths.root.orders.order.create.customerContacts.path}/${customerDetails.form.companyId}/${orderId}`
                )
              );
            }
          });
        }
        navigate(
          sibling(
            `${paths.root.orders.order.create.customerContacts.path}/${customerDetails.form.companyId}`
          )
        );
      }
    }, [customerDetails, orderId, selected, navigate]);

    const handleClose = useCallback(() => {
      navigate(-1);
    }, [navigate]);

    return (
      <ForestHeaderPage title={translations.title} onClose={handleClose}>
        <Typography css={(theme) => ({ marginBottom: theme.spacing(2.5) })} variant="body1">
          {translations.description}
        </Typography>
        <Typography variant="h2">{translations.previousCustomer}</Typography>
        <Select
          displayEmpty
          css={selectStyle}
          disabled={prevCompanyOptions.length === 0}
          renderValue={() =>
            prevCompanyOptions.length === 0
              ? translations.noPreviousCustomers
              : translations.clickHere
          }
          onChange={(e) => {
            setSelected(true);
            loadCustomerCompanyDetails(e.target.value as string);
            posthog.capture('Previous customer used');
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
          loading={searching}
          loadingText={translations.searching}
          noOptionsText={translations.noOptions}
          options={globalCustomerOptions}
          renderInput={(params) => (
            <SearchInput
              {...params}
              css={searchStyle}
              placeholder={translations.companyName}
              onChange={handleSearchChange}
            />
          )}
          onChange={(_, newValue) => {
            const option = globalCustomerOptions.find(({ name }) => name === newValue?.name);
            if (option) {
              setSelected(true);
              loadCustomerCompanyDetails(option.id);
              posthog.capture('Customer from db used');
            }
          }}
        />
        <Typography css={(theme) => ({ margin: theme.spacing(4.5, 0, 2.5) })} variant="h2">
          {translations.notFound}
        </Typography>
        <Button
          color="secondary"
          css={(theme) => ({ border: `1px solid ${theme.palette.secondary.main}` })}
          onClick={() => {
            navigate(sibling(path(paths.root.orders.order.create.newCustomer.path, orderId || '')));
            posthog.capture('New customer creation started');
          }}
        >
          {translations.createNew}
        </Button>
      </ForestHeaderPage>
    );
  }
);
