import { AttachedCompany, RegisteredCompany } from 'api/types';

export type RegisteredCompaniesResponse = {
  companies: RegisteredCompany[];
  isEnd: boolean;
};

export type AttachedCompaniesResponse = {
  attachedCompanies: AttachedCompany[];
  isEnd: boolean;
};
