export interface BenficialOwnerFormValues {
  city: string;
  country: string;
  dob: Date | null;
  firstName: string;
  lastName: string;
  nationality: string;
  placeOfBirth: string;
  postcode: string;
  streetAndNumber: string;
}

export interface BeneficialOwnersFormValues {
  beneficialOwners: BenficialOwnerFormValues[];
}
