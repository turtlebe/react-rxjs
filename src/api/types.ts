import { components, operations } from '__generated__/truckos-api';
import {
  operations as bffoperations,
  components as bffComponents,
} from '__generated__/truckos-api-bff';

export type PowerOfRepresentation =
  components['schemas']['KycLegalRepresentatives']['powerOfRepresentation'];

export type ClearingSystem = bffComponents['schemas']['OrderClearingSystem'];

export type LegalForm = bffComponents['schemas']['LegalForm'];

export type RegisterAuthority = bffComponents['schemas']['RegisterAuthority'];

export type CompanyBase = components['schemas']['CompanyBase'];

export type CompanyName = components['schemas']['CompanyName'];

export type Country = bffComponents['schemas']['Country'];

export type Company = components['schemas']['Company'];

export type CustomerCompany = bffComponents['schemas']['CustomerCompany'];

export type CustomerCompanyContact = bffComponents['schemas']['CustomerCompanyContact'];

export type CompanyContact = components['schemas']['CompanyContact'];

export type CountryCodesQuery = NonNullable<bffoperations['getCountries']['parameters']>['query'];

export type WorkflowStatus = components['schemas']['WorkflowStatus'];

export const NEW_WORKFLOW: WorkflowStatus = {
  progress: 0,
  status: 'new',
};

export type User = bffComponents['schemas']['User'];

export type UserProfile = bffComponents['schemas']['UserProfile'];

export type AccountFeatureFunctionality =
  bffComponents['schemas']['AccountFeature']['functionality'];

export type PaymentRequestDetail = components['schemas']['PaymentRequestDetail'];

export type Order = bffComponents['schemas']['Order'];

export type OrderSummary = bffComponents['schemas']['OrderSummary'];

export type OrderDetails = bffComponents['schemas']['OrderDetails'];

export type OrderCustomerInformation = bffComponents['schemas']['OrderCustomerInformation'];

export type GermanCompanyDetails = bffComponents['schemas']['GermanCompanyDetails'];

export type OrderLoadDetails = bffComponents['schemas']['OrderLoadDetails'];

export type OrderLoadTimeAndPlace = bffComponents['schemas']['OrderLoadTimeAndPlace'];

export type OrderWorkflowDetails = bffComponents['schemas']['OrderWorkflowDetails'];

export type OrderWorkflowStep = bffComponents['schemas']['OrderWorkflowStep'];

export type OrderWorkflowAction = bffComponents['schemas']['OrderWorkflowAction'];

export type OrderDocumentActions =
  bffComponents['schemas']['OrderDocumentDetails']['documentActions'];

export type DownloadFileLink = bffComponents['schemas']['DownloadFileLink'];

export type DocumentDownloadInfo = bffComponents['schemas']['DocumentDownloadInfo'];

export type DocumentTypeForSend = bffComponents['schemas']['DocumentTypeForSend'];

export type UploadableDocumentTypes = bffComponents['schemas']['UploadableDocumentTypes'];

export type UploadFileLink = bffComponents['schemas']['UploadFileLink'];

export type UploadLogoResponse = {
  logoUploadLink?: string;
  mimeType?: string;
};

export type DocumentTypeForAutogeneration =
  bffComponents['schemas']['DocumentTypeForAutogeneration'];

export type OrderServiceAgreementDetails = bffComponents['schemas']['OrderServiceAgreementDetails'];

export type CompanySummary = bffComponents['schemas']['CompanySummary'];

export type OrderStatus = OrderSummary['status'];

export type OrderStatusDetails = components['schemas']['OrderStatusDetails'];

export type PaymentRequestSummary = components['schemas']['PaymentRequestSummary'];

export type ReceivableStatus = PaymentRequestSummary['status'];

export type PaymentBalances = components['schemas']['PaymentBalances'];

export type UploadData = components['schemas']['FileUploadInfoResponse'];

export type DownloadData =
  operations['getDownloadLink']['responses']['200']['content']['application/json'];

export type PaymentRequestStatus = components['schemas']['PaymentRequestStatus'];

export type KycBankAccount = components['schemas']['KycBankAccount'];

export type KycBeneficialOwners = components['schemas']['KycBeneficialOwners'];

export type KycBusinessInformation = components['schemas']['KycBusinessData'];

export type VirtualIban = components['schemas']['VirtualIban'];

export type KycLegalRepresentatives = components['schemas']['KycLegalRepresentatives'];

export type CompanyAccountDetails = components['schemas']['CompanyAccountDetails'];

export type RegisteredCompany = components['schemas']['RegisteredCompany'];

export type AttachedCompany = components['schemas']['AttachedCompany'];

export type AccountCompany = bffComponents['schemas']['AccountCompany'];

export type Venue = bffComponents['schemas']['Venue'];

export type Address = bffComponents['schemas']['Address'];

export type TimeWindow = bffComponents['schemas']['TimeWindow'];
