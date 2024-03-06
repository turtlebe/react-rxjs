import { join } from 'lodash';
import { Address, Order, OrderDetails, TimeWindow } from '../../api/types';
import { anyChildExistsOrUndefined, dateOrNull } from '../../utils/api';
import { OrderDetailsFormValues } from './types';

const toIsoStringOrUndefined = (date: Date | null | undefined) => {
  if (date) {
    return date.toISOString();
  }
  return undefined;
};

const timeWindowOrUndefined = (
  start: Date | null | undefined,
  end: Date | null | undefined,
  isTimeWindow: boolean
): TimeWindow | undefined => {
  if (start) {
    let endTime;
    if (isTimeWindow && end && end.toISOString() !== start.toISOString()) {
      endTime = toIsoStringOrUndefined(end);
    }
    return {
      start: start.toISOString(),
      end: endTime,
    };
  }
  return undefined;
};

export const detailsFormApiToOrderDetailsMapper = (
  data: OrderDetailsFormValues
): Partial<OrderDetails> => ({
  clearingSystem: data.clearingSystem,
  serviceAgreementDetails: anyChildExistsOrUndefined({
    currency: data.currency,
    paymentTermDays: data.paymentTermDays,
    vatRate: data.vatRate,
    services: data.services,
  }),
  customerInformation: anyChildExistsOrUndefined({
    customerOrderNumber: data.customerOrderNumber,
  }),
  stipulations: data.stipulations?.map((item) => item.stipulation),
  loadDetails: anyChildExistsOrUndefined({
    loadDescription: data.loadDescription,
    loadingTimeAndPlace: anyChildExistsOrUndefined({
      timeWindow: timeWindowOrUndefined(
        data.loadingTimeWindowStart,
        data.loadingTimeWindowEnd,
        data.loadingTimeIsWindow
      ),
      venue: anyChildExistsOrUndefined({
        venueId: data.loadingVenueId,
        venueName: data.loadingVenueName,
        address: anyChildExistsOrUndefined({
          addressAddOn: data.loadingAddressAddOn,
          city: data.loadingCity,
          country: data.loadingCountry,
          postcode: data.loadingPostCode,
          streetAndNumber: data.loadingStreetAndNumber,
          formattedAddress: data.loadingAddress,
        }),
      }),
    }),
    unloadingTimeAndPlace: anyChildExistsOrUndefined({
      timeWindow: timeWindowOrUndefined(
        data.unloadingTimeWindowStart,
        data.unloadingTimeWindowEnd,
        data.unloadingTimeIsWindow
      ),
      venue: anyChildExistsOrUndefined({
        venueId: data.unloadingVenueId,
        venueName: data.unloadingVenueName,
        address: anyChildExistsOrUndefined({
          addressAddOn: data.unloadingAddressAddOn,
          city: data.unloadingCity,
          country: data.unloadingCountry,
          postcode: data.unloadingPostCode,
          streetAndNumber: data.unloadingStreetAndNumber,
          formattedAddress: data.unloadingAddress,
        }),
      }),
    }),
  }),
});

const getFormattedAddress = (address: Address | undefined) => {
  if (!address) {
    return undefined;
  }
  if (address.formattedAddress) {
    return address.formattedAddress;
  }
  const parts = [address.streetAndNumber];
  if (address.addressAddOn) {
    parts.push(address.addressAddOn);
  }
  parts.push(address.city, address.postcode, address.country);
  return join(parts, ', ');
};

export const orderToDetailsFormApiMapper = (data: Order | undefined): OrderDetailsFormValues => {
  const { orderDetails } = data!;

  return {
    originalOrder: data,

    clearingSystem: orderDetails?.clearingSystem,
    currency: orderDetails?.serviceAgreementDetails?.currency,
    paymentTermDays: orderDetails?.serviceAgreementDetails?.paymentTermDays,
    vatRate: orderDetails?.serviceAgreementDetails?.vatRate,
    services: orderDetails?.serviceAgreementDetails?.services,
    customerOrderNumber: orderDetails?.customerInformation.customerOrderNumber,
    loadDescription: orderDetails?.loadDetails?.loadDescription,
    loadingTimeWindowStart: dateOrNull(
      orderDetails?.loadDetails?.loadingTimeAndPlace?.timeWindow?.start
    ),
    loadingTimeWindowEnd: dateOrNull(
      orderDetails?.loadDetails?.loadingTimeAndPlace?.timeWindow?.end
    ),
    loadingTimeIsWindow: !!orderDetails?.loadDetails?.loadingTimeAndPlace?.timeWindow?.end,
    loadingVenueName: orderDetails?.loadDetails?.loadingTimeAndPlace?.venue?.venueName,
    loadingVenueId: orderDetails?.loadDetails?.loadingTimeAndPlace?.venue?.venueId,
    loadingAddress: getFormattedAddress(
      orderDetails?.loadDetails?.loadingTimeAndPlace?.venue?.address
    ),
    loadingAddressAddOn:
      orderDetails?.loadDetails?.loadingTimeAndPlace?.venue?.address?.addressAddOn,
    loadingCity: orderDetails?.loadDetails?.loadingTimeAndPlace?.venue?.address?.city,
    loadingCountry: orderDetails?.loadDetails?.loadingTimeAndPlace?.venue?.address?.country,
    loadingPostCode: orderDetails?.loadDetails?.loadingTimeAndPlace?.venue?.address?.postcode,
    loadingStreetAndNumber:
      orderDetails?.loadDetails?.loadingTimeAndPlace?.venue?.address?.streetAndNumber,

    unloadingVenueName: orderDetails?.loadDetails?.unloadingTimeAndPlace?.venue?.venueName,
    unloadingVenueId: orderDetails?.loadDetails?.unloadingTimeAndPlace?.venue?.venueId,
    unloadingAddress: getFormattedAddress(
      orderDetails?.loadDetails?.unloadingTimeAndPlace?.venue?.address
    ),
    unloadingAddressAddOn:
      orderDetails?.loadDetails?.unloadingTimeAndPlace?.venue?.address?.addressAddOn,
    unloadingCity: orderDetails?.loadDetails?.unloadingTimeAndPlace?.venue?.address?.city,
    unloadingCountry: orderDetails?.loadDetails?.unloadingTimeAndPlace?.venue?.address?.country,
    unloadingPostCode: orderDetails?.loadDetails?.unloadingTimeAndPlace?.venue?.address?.postcode,
    unloadingStreetAndNumber:
      orderDetails?.loadDetails?.unloadingTimeAndPlace?.venue?.address?.streetAndNumber,
    unloadingTimeWindowStart: dateOrNull(
      orderDetails?.loadDetails?.unloadingTimeAndPlace?.timeWindow?.start
    ),
    unloadingTimeWindowEnd: dateOrNull(
      orderDetails?.loadDetails?.unloadingTimeAndPlace?.timeWindow?.end
    ),
    unloadingTimeIsWindow: !!orderDetails?.loadDetails?.unloadingTimeAndPlace?.timeWindow?.end,

    stipulations: orderDetails?.stipulations?.map((item) => ({ stipulation: item })),
  };
};
