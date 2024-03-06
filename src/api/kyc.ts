import { catchError, from, map, Observable } from 'rxjs';
import { handleError, ifOkThenTrue, toResponseData } from 'utils/api';
import { unFuckedIsoDate } from 'utils/date';
import { BankAccountFormValues } from 'screens/BankAccountEntry/types';
import { BeneficialOwnersFormValues } from 'screens/BeneficialOwnersEntry/types';
import { BusinessDataFormValues } from 'screens/BusinessDataEntry/types';
import { LegalRepresentativesFormValues } from 'screens/LegalRepresentativesEntry/types';
import { components } from '__generated__/truckos-api';
import { components as bffComponents } from '__generated__/truckos-api-bff';
import { CountryCode } from 'ref-data/countries';
import { KycLightFormValues } from 'screens/KycLight/types';
// TODO: Fix the cycle dependency... bad practice/yikes. Allowing for now as we need to CTFU.
// eslint-disable-next-line import/no-cycle
import { setSelectedCompanyId } from '../state/user';
import { bffFetcher, fetcher } from './fetch';
import { NEW_WORKFLOW, WorkflowStatus } from './types';

// dummy t function for translation extraction
const t = (str: string) => str;
const phrases = {
  noResponse: t('No response received'),
  getBusinessDataError: t('An error occurred initializing the business data form'),
  sendBusinessDataError: t('An error occurred submitting the business data form'),
  getBankAccountError: t('An error occurred initializing the bank account form'),
  sendBankAccountError: t('An error occurred submitting the bank account form'),
  getLegalRepsError: t('An error occurred initializing the legal representatives form'),
  sendLegalRepsError: t('An error occurred submitting the legal representatives form'),
  getBeneficialOwnersError: t('An error occurred initializing the beneficial owners form'),
  sendBeneficialOwnersError: t('An error occurred submitting the beneficial owners form'),
};

const fetchNewKycCompanyId = bffFetcher.path('/account').method('post').create();
export const getNewKycCompanyId = (): Observable<string | undefined> =>
  from(fetchNewKycCompanyId(null)).pipe(
    map(toResponseData(undefined)),
    map((response) => {
      if (response) {
        setSelectedCompanyId(response.accountCompanyId);
        return response.accountCompanyId;
      }
      throw new Error(phrases.noResponse);
    })
  );

const fetchKycWorkflowStatus = fetcher.path('/kyc/{companyId}').method('get').create();
export const getKycWorkflowStatus = (companyId: string): Observable<WorkflowStatus> =>
  from(fetchKycWorkflowStatus({ companyId })).pipe(map(toResponseData(NEW_WORKFLOW)));

const fetchBusinessDataFormData = fetcher
  .path('/kyc/{companyId}/business-data')
  .method('get')
  .create();
export const getBusinessDataFormData = (
  companyId: string
): Observable<Partial<BusinessDataFormValues> | undefined> =>
  from(fetchBusinessDataFormData({ companyId })).pipe(
    map(toResponseData(undefined)),
    map((data) =>
      data
        ? {
            ...data,
            country: data.country as CountryCode,
          }
        : data
    ),
    catchError(handleError(phrases.getBusinessDataError, undefined))
  );

const postBusinessDataFormData = fetcher
  .path('/kyc/{companyId}/business-data')
  .method('post')
  .create();
export const sendBusinessDataFormData = (companyId: string, data: BusinessDataFormValues) =>
  from(postBusinessDataFormData({ companyId, form: data })).pipe(
    map(ifOkThenTrue),
    catchError(handleError(phrases.sendBusinessDataError, false))
  );

const convertKycLightApiData = (
  data: bffComponents['schemas']['AccountCompany']
): KycLightFormValues => ({
  bic: data?.accountCompanyBankDetails?.bic || '',
  companyName: data?.companyName || '',
  city: data?.details?.address?.city || '',
  country: (data?.details?.address?.country as CountryCode) || 'DE',
  email:
    data?.accountCompanyContacts?.find((c) => c.includeIn?.includes('outgoingBookkeeping'))
      ?.contactDetails?.email || '',
  iban: data?.accountCompanyBankDetails?.iban || '',
  legalForm: data?.details?.legalForm || '',
  phoneNumber:
    data?.accountCompanyContacts?.find((c) => c.includeIn?.includes('outgoingBookkeeping'))
      ?.contactDetails?.phoneNumber || '',
  postcode: data?.details?.address?.postcode || '',
  taxId: data?.details?.taxId || '',
  streetAndNumber: data?.details?.address?.streetAndNumber || '',
  vatId: data?.details?.vatId || '',
});

const fetchKycLightFormData = bffFetcher.path('/account/{companyIdParam}').method('get').create();
export const getKycLightFormData = (
  companyId: string
): Observable<Partial<KycLightFormValues> | undefined> =>
  from(fetchKycLightFormData({ companyIdParam: companyId })).pipe(
    map(toResponseData(undefined)),
    map((data) => (data ? convertKycLightApiData(data) : data)),
    catchError(handleError(phrases.getBusinessDataError, undefined))
  );

const putKycLightFormData = bffFetcher.path('/account/{companyIdParam}').method('put').create();
export const sendKycLightFormData = (companyId: string, data: KycLightFormValues) =>
  from(
    putKycLightFormData({
      companyIdParam: companyId,
      companyId,
      companyName: data.companyName,
      details: {
        companyType: 'GermanCompanyDetails',
        address: {
          streetAndNumber: data?.streetAndNumber,
          city: data.city,
          postcode: data.postcode,
          country: data.country,
        },
        legalForm: data.legalForm,
        vatId: data.vatId,
        taxId: data.taxId,
      },
      accountCompanyContacts: [
        {
          contactDetails: {
            email: data.email,
            phoneNumber: data.phoneNumber,
          },
          includeIn: ['outgoingBookkeeping'],
        },
      ],
      accountCompanyBankDetails: {
        iban: data.iban,
        bic: data.bic,
      },
    })
  ).pipe(map(ifOkThenTrue), catchError(handleError(phrases.sendBusinessDataError, false)));

const fetchBankAccountFormData = fetcher
  .path('/kyc/{companyId}/bank-account')
  .method('get')
  .create();
export const getBankAccountFormData = (
  companyId: string
): Observable<Partial<BankAccountFormValues> | undefined> =>
  from(fetchBankAccountFormData({ companyId })).pipe(
    map(toResponseData(undefined)),
    catchError(handleError(phrases.getBankAccountError, undefined))
  );

const postBankAccountFormData = fetcher
  .path('/kyc/{companyId}/bank-account')
  .method('post')
  .create();
export const sendBankAccountFormData = (companyId: string, data: BankAccountFormValues) =>
  from(postBankAccountFormData({ companyId, form: data })).pipe(
    map(ifOkThenTrue),
    catchError(handleError(phrases.sendBankAccountError, false))
  );

const convertLegalRepresentativesApiData = (
  data: components['schemas']['KycLegalRepresentatives']
): LegalRepresentativesFormValues => ({
  areYouLegalRepresentative: data.areYouLegalRepresentative ? 'yes' : 'no',
  powerOfRepresentation: data.powerOfRepresentation,
  representatives: data.representatives.map((rep) => ({
    ...rep,
    dob: new Date(rep.dob),
  })),
});

const fetchLegalRepresentativesFormData = fetcher
  .path('/kyc/{companyId}/legal-representatives')
  .method('get')
  .create();
export const getLegalRepresentativesFormData = (
  companyId: string
): Observable<LegalRepresentativesFormValues | undefined> =>
  from(fetchLegalRepresentativesFormData({ companyId })).pipe(
    map(toResponseData(undefined)),
    map((data) => (data ? convertLegalRepresentativesApiData(data) : data)),
    catchError(handleError(phrases.getLegalRepsError, undefined))
  );

const convertLegalRepresentativeFormData = (
  data: LegalRepresentativesFormValues
): components['schemas']['KycLegalRepresentatives'] => ({
  ...data,
  areYouLegalRepresentative: data.areYouLegalRepresentative === 'yes',
  representatives: data.representatives.map((rep) => ({
    ...rep,
    dob: unFuckedIsoDate(rep.dob),
  })),
});

const postLegalRepresentativesFormData = fetcher
  .path('/kyc/{companyId}/legal-representatives')
  .method('post')
  .create();
export const sendLegalRepresentativesFormData = (
  companyId: string,
  data: LegalRepresentativesFormValues
) =>
  from(
    postLegalRepresentativesFormData({ companyId, form: convertLegalRepresentativeFormData(data) })
  ).pipe(map(ifOkThenTrue), catchError(handleError(phrases.sendLegalRepsError, false)));

const convertBeneficialOwnersApiData = (
  data: components['schemas']['KycBeneficialOwners']
): BeneficialOwnersFormValues => ({
  beneficialOwners: data.beneficialOwners.map((owner) => ({
    ...owner,
    dob: new Date(owner.dob),
  })),
});

const fetchBeneficialOwnersFormData = fetcher
  .path('/kyc/{companyId}/beneficial-owners')
  .method('get')
  .create();
export const getBeneficialOwnersFormData = (
  companyId: string
): Observable<BeneficialOwnersFormValues | undefined> =>
  from(fetchBeneficialOwnersFormData({ companyId })).pipe(
    map(toResponseData(undefined)),
    map((data) => (data ? convertBeneficialOwnersApiData(data) : data)),
    catchError(handleError(phrases.getBeneficialOwnersError, undefined))
  );

const convertBeneficialOwnersFormData = (
  data: BeneficialOwnersFormValues
): components['schemas']['KycBeneficialOwners'] => ({
  beneficialOwners: data.beneficialOwners.map((owner) => ({
    ...owner,
    dob: unFuckedIsoDate(owner.dob),
  })),
});

const postBeneficialOwnersFormData = fetcher
  .path('/kyc/{companyId}/beneficial-owners')
  .method('post')
  .create();
export const sendBeneficialOwnersFormData = (companyId: string, data: BeneficialOwnersFormValues) =>
  from(
    postBeneficialOwnersFormData({ companyId, form: convertBeneficialOwnersFormData(data) })
  ).pipe(map(ifOkThenTrue), catchError(handleError(phrases.sendBeneficialOwnersError, false)));
