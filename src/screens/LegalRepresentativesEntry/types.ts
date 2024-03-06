import { PowerOfRepresentation } from 'api/types';

export interface RepresentativeFormValues {
  dob: Date | null;
  email: string;
  firstName: string;
  language: string;
  lastName: string;
}

export interface LegalRepresentativesFormValues {
  areYouLegalRepresentative: string;
  powerOfRepresentation: PowerOfRepresentation;
  representatives: RepresentativeFormValues[];
}
