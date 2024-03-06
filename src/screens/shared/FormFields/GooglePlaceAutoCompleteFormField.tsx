import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { Autocomplete, TextField } from '@mui/material';
import { getFirstSubstring } from 'utils/string';

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface PlaceDetails {
  address_components: AddressComponent[];
  formatted_address: string;
  name: string;
}

export interface Address {
  addressAddOn?: string;
  city?: string;
  country?: string;
  formattedAddress?: string;
  placeId?: string;
  postalCode?: string;
  streetAndNumber?: string;
}

export interface GooglePlaceAutocompleteFormFieldProps {
  defaultOption?: { label?: string; value?: string };
  id: string;
  label: string;
  name: string;
  setAddress: (address: Address, placeName: string | undefined) => void;
}

export const GooglePlaceAutocompleteFormField = memo(
  (props: GooglePlaceAutocompleteFormFieldProps) => {
    const { defaultOption, id, label, name, setAddress } = props;
    const [firstLoad, setFirstLoad] = useState(true);
    const [selectedValue, setSelectedValue] = useState<{ label: string; value: string }>({
      label: '',
      value: '',
    });

    const { getPlacePredictions, isPlacePredictionsLoading, placePredictions, placesService } =
      usePlacesService({
        apiKey: window.config.GOOGLE_MAPS_API_KEY,
        debounce: 500,
      });

    const predictionOptions = useMemo(
      () =>
        placePredictions.map((prediction): { label: string; value: string } => ({
          label: prediction.description,
          value: prediction.place_id,
        })),
      [placePredictions]
    );

    const parseAddressData = useCallback(
      (placeId: string, placeDetails: PlaceDetails) => {
        const city = placeDetails.address_components.find(({ types }) =>
          types.includes('locality')
        );
        const country = placeDetails.address_components.find(({ types }) =>
          types.includes('country')
        );
        const postalCode = placeDetails.address_components.find(({ types }) =>
          types.includes('postal_code')
        );
        const addressAddOn = placeDetails.address_components.find(({ types }) =>
          types.includes('sublocality')
        );
        const streetAndNumberDerived = getFirstSubstring(placeDetails.formatted_address, ',');
        let googlePlaceName;
        if (placeDetails.name !== streetAndNumberDerived) {
          googlePlaceName = placeDetails.name;
        }

        setAddress(
          {
            city: city?.long_name,
            country: country?.short_name,
            streetAndNumber: streetAndNumberDerived,
            postalCode: postalCode?.long_name,
            addressAddOn: addressAddOn?.long_name,
            placeId: `google-maps|${placeId}`,
            formattedAddress: placeDetails.formatted_address,
          },
          googlePlaceName
        );
      },
      [setAddress]
    );

    const getAddressDetails = useCallback(
      (optionDescription: string, optionPlaceId?: string) => {
        let queryPlaceId = optionPlaceId;
        if (!queryPlaceId) {
          const addressData = placePredictions.find(
            ({ description }) => description === optionDescription
          );
          queryPlaceId = addressData.place_id;
        }

        if (queryPlaceId) {
          placesService.getDetails(
            {
              placeId: queryPlaceId,
              fields: ['name', 'address_component', 'formatted_address'],
            },
            (placeDetails: PlaceDetails) => parseAddressData(queryPlaceId!, placeDetails)
          );
          setSelectedValue({ label: optionDescription, value: queryPlaceId });
        }
      },
      [placePredictions, placesService, parseAddressData]
    );

    useEffect(() => {
      if (firstLoad && defaultOption?.label && defaultOption?.value) {
        const placeId = defaultOption.value.replace('google-maps|', '');
        setFirstLoad(false);
        setSelectedValue({ label: defaultOption.label, value: placeId });
      }
    }, [firstLoad, defaultOption]);

    return (
      <Autocomplete
        freeSolo
        filterOptions={(x) => x}
        id={id}
        loading={isPlacePredictionsLoading && !!placePredictions.length}
        options={predictionOptions}
        value={selectedValue}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            name={name}
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
        onInputChange={(_, newInputValue) => getPlacePredictions({ input: newInputValue })}
        onChange={(_, newValue) => {
          if (typeof newValue === 'string') {
            getAddressDetails(newValue);
          } else if (newValue) {
            getAddressDetails(newValue.label, newValue.value);
          }
        }}
      />
    );
  }
);
