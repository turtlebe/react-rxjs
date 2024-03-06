import { Option } from 'components/types';
import { ClearingSystem, PowerOfRepresentation } from 'api/types';

// dummy translate fn for extraction
const t = (str: string) => str;

export const YesNoOptions: Option[] = [
  {
    label: t('Yes'),
    value: 'yes',
  },
  {
    label: t('No'),
    value: 'no',
  },
];

export const PowerofRepOptions: Option<PowerOfRepresentation>[] = [
  {
    label: t('Sole power'),
    value: 'sole',
  },
  {
    label: t('Joint power'),
    value: 'joint',
  },
];

export const ClearingSystemOptions: Option<ClearingSystem>[] = [
  {
    label: t('Invoice'),
    value: 'invoice',
  },
  {
    label: t('Credit note'),
    value: 'credit_note',
  },
];

export const TruckOsTermsAndConditionsUrl = '/files/TruckOS-Special-Conditions-DE.pdf';

export const TruckOsPrivacyPolicyUrl = 'https://www.truckos.de/datenschutzerklaerung';

export const WalbingTermsAndConditionsUrl = 'https://www.walbing.com/pdf/Plattformbedingungen.pdf';
