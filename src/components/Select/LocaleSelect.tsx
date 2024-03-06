import { useCallback, useMemo } from 'react';
import { css } from '@emotion/react';
import { getFlagForLocale, Locale, locales } from 'theme/icons/locales';
import { Option } from '../types';
import { Select } from './Select';

export interface LocaleSelectProps {
  className?: string;
  hideLabels?: boolean;
  onChange: (value: Locale) => void;
  value: Locale;
}

const style = css({
  '& .MuiSelect-select': {
    display: 'flex',
  },
});

const labelStyle = (hideLabels?: boolean) =>
  css({
    display: 'flex',
    alignItems: 'center',
    ...(hideLabels && { justifyContent: 'center', flexGrow: 1 }),
  });

export const LocaleSelect = (props: LocaleSelectProps) => {
  const { className, hideLabels, onChange, value } = props;

  const renderFlag = useCallback((locale: Locale) => {
    const Flag = getFlagForLocale(locale);
    return <Flag />;
  }, []);

  const options = useMemo<Option[]>(
    () =>
      locales.map((locale) => {
        const localeParts = locale.toUpperCase().split('-');

        return {
          label: (
            <div css={labelStyle(hideLabels)}>
              {renderFlag(locale)}
              {!hideLabels && (
                <span
                  css={{ paddingLeft: 3, marginBottom: -2 }}
                >{`${localeParts[0]} (${localeParts[1]})`}</span>
              )}
            </div>
          ),
          value: locale,
        };
      }),
    [renderFlag, hideLabels]
  );

  return (
    <Select
      className={className}
      css={style}
      fullWidth={false}
      options={options}
      value={value}
      onChange={(e) => onChange(e.target.value as Locale)}
    />
  );
};
