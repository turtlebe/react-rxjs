import { useTranslation } from 'react-i18next';
import { Option, OptionType } from 'components/types';

export const useTranslatedOptions = <T extends OptionType = string>(options: Option<T>[]) => {
  const { t } = useTranslation();

  return options.map<Option<T>>(({ label, value }) => ({
    value,
    label: typeof label === 'string' ? t(label) || label : label,
  }));
};
