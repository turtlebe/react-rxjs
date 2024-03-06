import { Order } from '../../api/types';

export interface ServiceAndPayment {
  netAmount: number;
  service: string;
}

export interface Stipulations {
  stipulation: string;
}

export interface OrderDetailsFormValues {
  clearingSystem?: 'credit_note' | 'invoice';
  currency?: string;
  customerOrderNumber?: string;
  loadDescription?: string;
  loadingAddress?: string;
  loadingAddressAddOn?: string;
  loadingCity?: string;
  loadingCountry?: string;
  loadingPostCode?: string;
  loadingStreetAndNumber?: string;
  loadingTimeIsWindow: boolean;
  loadingTimeWindowEnd?: Date | null;
  loadingTimeWindowStart?: Date | null;
  loadingVenueId?: string;
  loadingVenueName?: string;
  originalOrder?: Order;
  paymentTermDays?: number;
  services?: ServiceAndPayment[];
  stipulations?: Stipulations[];
  unloadingAddress?: string;
  unloadingAddressAddOn?: string;
  unloadingCity?: string;
  unloadingCountry?: string;
  unloadingPostCode?: string;
  unloadingStreetAndNumber?: string;
  unloadingTimeIsWindow: boolean;
  unloadingTimeWindowEnd?: Date | null;
  unloadingTimeWindowStart?: Date | null;
  unloadingVenueId?: string;
  unloadingVenueName?: string;
  vatRate?: number;
}
