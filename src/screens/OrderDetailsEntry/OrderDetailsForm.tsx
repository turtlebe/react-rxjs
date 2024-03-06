import { memo, useCallback } from 'react';
import { Form, useForm } from 'components/Form';
import { Typography } from 'components/Typography';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import { FormComponentProps } from 'screens/shared/types';
import {
  CustomerOrderNumberFormField,
  LoadDescriptionFormField,
  NumberFormField,
  RadioGroupFormField,
} from 'screens/shared/FormFields';
import {
  Address,
  GooglePlaceAutocompleteFormField,
} from 'screens/shared/FormFields/GooglePlaceAutoCompleteFormField';
import { ClearingSystemOptions } from 'ref-data/misc';
import { VatRateFormField } from 'screens/shared/FormFields/VatRateFormField';
import { OrderDetailsFormValues } from './types';
import { useOrderDetailsFormSchema } from './useOrderDetailsFormSchema';
import { useStipulationsFieldArray } from './useStipulationsFieldArray';
import { useServicesFieldArray } from './useServicesFieldArray';
import { LoadTimeWindow } from './LoadTimeWindow';

export interface OrderDetailsFormProps extends FormComponentProps<OrderDetailsFormValues> {}

export const DEFAULT_VALUES: OrderDetailsFormValues = {
  clearingSystem: 'invoice',
  currency: 'EUR',
  customerOrderNumber: '',
  loadDescription: '',
  loadingAddressAddOn: '',
  loadingCity: '',
  loadingCountry: '',
  loadingPostCode: '',
  loadingStreetAndNumber: '',
  loadingTimeWindowStart: null,
  loadingTimeWindowEnd: null,
  loadingTimeIsWindow: false,
  loadingVenueName: '',
  paymentTermDays: 0,
  services: [{ service: '', netAmount: 0 }],
  stipulations: [{ stipulation: '' }],
  unloadingAddressAddOn: '',
  unloadingCity: '',
  unloadingCountry: '',
  unloadingPostCode: '',
  unloadingStreetAndNumber: '',
  unloadingTimeWindowStart: null,
  unloadingTimeWindowEnd: null,
  unloadingTimeIsWindow: false,
  unloadingVenueName: '',
  loadingAddress: '',
  vatRate: 0.19,
  unloadingAddress: '',
};

const ONE_HOUR_IN_MILLIS = 60 * 60 * 1000;

const addHours = (date: Date, numberOfHours: number) =>
  new Date(date.getTime() + numberOfHours * ONE_HOUR_IN_MILLIS);

const phrases = (t: TranslateFn) => ({
  title: t('Order details'),
  customerOrder: t('🧾 Customer order number'),
  placeOfLoading: t('🏗️ Place & time of loading'),
  submitLabel: t('Save order details'),
  customerOrderNumberLabel: t('Transport request number'),
  startOfLoading: t('Start of loading window'),
  endOfLoading: t('End of loading window'),
  timeOfLoading: t('Time of loading'),
  startOfUnloading: t('Start of unloading window'),
  endOfUnloading: t('End of unloading window'),
  timeOfUnloading: t('Time of unloading'),
  placeOfUnloading: t('📍 Place & time of unloading'),
  address: t('Place or address'),
  load: t('📦 Load'),
  servicesAndPayment: t('💸 Services & payment'),
  addAnotherService: t('+ Add another service'),
  paymentTermLabel: t('Payment term'),
  clearingSystemTitle: t('Will you write an invoice or receive a credit note for this order?'),
  stipulationsTitle: t('🤝 Other stipulations'),
  stipulationsDescription: t(
    'Other stipulations that have e.g. been discussed over the phone or standard terms like standing time remunerations.'
  ),
  addOtherStipulation: t('+ Add other stipulation'),
  freightTransport: t('Freight transport'),
  days: t('days'),
});

export const OrderDetailsForm = memo((props: OrderDetailsFormProps) => {
  const { initialValues, loading, onSubmit } = props;
  const translations = useTranslatedText(phrases);
  const schema = useOrderDetailsFormSchema();

  const api = useForm<OrderDetailsFormValues>({
    defaultValues: DEFAULT_VALUES,
    initialValues,
    schema,
  });

  const { setValue, watch } = api;

  const handleUpdateLoadingAddress = useCallback(
    (address: Address, placeName: string | undefined) => {
      setValue('loadingAddressAddOn', address.addressAddOn);
      setValue('loadingCity', address.city);
      setValue('loadingCountry', address.country);
      setValue('loadingStreetAndNumber', address.streetAndNumber);
      setValue('loadingPostCode', address.postalCode);
      setValue('loadingVenueId', address.placeId);
      setValue('loadingVenueName', placeName);
      setValue('loadingAddress', address.formattedAddress);
    },
    [setValue]
  );

  const handleUpdateUnLoadingAddress = useCallback(
    (address: Address, placeName: string | undefined) => {
      setValue('unloadingAddressAddOn', address.addressAddOn);
      setValue('unloadingCity', address.city);
      setValue('unloadingCountry', address.country);
      setValue('unloadingStreetAndNumber', address.streetAndNumber);
      setValue('unloadingPostCode', address.postalCode);
      setValue('unloadingVenueId', address.placeId);
      setValue('unloadingVenueName', placeName);
      setValue('unloadingAddress', address.formattedAddress);
    },
    [setValue]
  );

  const { appendStipulation, stipulationElements } = useStipulationsFieldArray(api);
  const { appendService, serviceElements } = useServicesFieldArray(api);

  const loadingTimeStart = watch('loadingTimeWindowStart');
  const loadingTimeEnd = watch('loadingTimeWindowEnd');
  const unloadingTimeStart = watch('unloadingTimeWindowStart');
  const unloadingTimeEnd = watch('unloadingTimeWindowEnd');

  const setLoadingTimeIsWindow = useCallback(
    (isTimeWindow: boolean) => {
      setValue('loadingTimeIsWindow', isTimeWindow);
      if (loadingTimeStart && !loadingTimeEnd) {
        setValue('loadingTimeWindowEnd', addHours(loadingTimeStart, 1));
      }
    },
    [loadingTimeEnd, loadingTimeStart, setValue]
  );

  const setUnloadingTimeIsWindow = useCallback(
    (isTimeWindow: boolean) => {
      setValue('unloadingTimeIsWindow', isTimeWindow);
      if (unloadingTimeStart && !unloadingTimeEnd) {
        setValue('unloadingTimeWindowEnd', addHours(unloadingTimeStart, 1));
      }
    },
    [unloadingTimeEnd, unloadingTimeStart, setValue]
  );

  return (
    <Form
      heightAuto
      api={api}
      flowDirection="column"
      loading={loading}
      submitLabel={translations.submitLabel}
      onSubmit={onSubmit}
    >
      <div>
        <Typography variant="h3">{translations.placeOfLoading}</Typography>
        <GooglePlaceAutocompleteFormField
          id="loadingAddress"
          label={translations.address}
          name="loadingAddress"
          setAddress={handleUpdateLoadingAddress}
          defaultOption={{
            value: initialValues?.loadingVenueId,
            label: initialValues?.loadingAddress,
          }}
        />
        <LoadTimeWindow
          endTimeFieldName="loadingTimeWindowEnd"
          endTimeLabel={translations.endOfLoading}
          isTimeWindow={!!initialValues?.loadingTimeIsWindow}
          setIsTimeWindow={setLoadingTimeIsWindow}
          startTimeFieldName="loadingTimeWindowStart"
          startTimeLabel={translations.startOfLoading}
          timeLabel={translations.timeOfLoading}
        />
        <Typography variant="h3">{translations.placeOfUnloading}</Typography>
        <GooglePlaceAutocompleteFormField
          id="unloadingAddress"
          label={translations.address}
          name="unloadingAddress"
          setAddress={handleUpdateUnLoadingAddress}
          defaultOption={{
            value: initialValues?.unloadingVenueId,
            label: initialValues?.unloadingAddress,
          }}
        />
        <LoadTimeWindow
          endTimeFieldName="unloadingTimeWindowEnd"
          endTimeLabel={translations.endOfUnloading}
          isTimeWindow={!!initialValues?.unloadingTimeIsWindow}
          setIsTimeWindow={setUnloadingTimeIsWindow}
          startTimeFieldName="unloadingTimeWindowStart"
          startTimeLabel={translations.startOfUnloading}
          timeLabel={translations.timeOfUnloading}
        />
        <Typography variant="h3">{translations.load}</Typography>
        <LoadDescriptionFormField />
        <Typography variant="h3">{translations.customerOrder}</Typography>
        <CustomerOrderNumberFormField label={translations.customerOrderNumberLabel} />
      </div>
      <div>
        <Typography variant="h3">{translations.servicesAndPayment}</Typography>
        {serviceElements}
        <Button
          color="secondary"
          css={(theme) => ({ marginBottom: theme.spacing(1.25) })}
          onClick={appendService}
        >
          {translations.addAnotherService}
        </Button>
        <NumberFormField
          label={translations.paymentTermLabel}
          name="paymentTermDays"
          unit={translations.days}
        />
        <VatRateFormField />
        <Typography css={(theme) => ({ marginBottom: theme.spacing(0.625) })} variant="body1">
          {translations.clearingSystemTitle}
        </Typography>
        <Card>
          <RadioGroupFormField
            css={(theme) => ({ margin: theme.spacing(-2, 0, -2.5) })}
            name="clearingSystem"
            options={ClearingSystemOptions}
          />
        </Card>
        <Typography variant="h3">{translations.stipulationsTitle}</Typography>
        <Typography css={(theme) => ({ margin: theme.spacing(1.25, 0) })} variant="body1">
          {translations.stipulationsDescription}
        </Typography>
        {stipulationElements}
        <Button
          color="secondary"
          css={(theme) => ({ marginBottom: theme.spacing(1.25) })}
          onClick={appendStipulation}
        >
          {translations.addOtherStipulation}
        </Button>
      </div>
    </Form>
  );
});
