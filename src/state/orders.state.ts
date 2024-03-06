import { firstValueFrom, switchMap } from 'rxjs';
import { apiCreateOrder, CreateOrderRequest } from '../api/orders.api';
import { nonEmptySelectedCompanyId$ } from './user';

export const createOrder = (request: CreateOrderRequest) =>
  firstValueFrom(
    nonEmptySelectedCompanyId$.pipe(
      switchMap((companyId) => apiCreateOrder({ companyId }, request))
    )
  );
