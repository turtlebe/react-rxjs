import { memo, useMemo } from 'react';
import { css, Theme } from '@emotion/react';
import InputAdornment from '@mui/material/InputAdornment';
import { Search } from 'theme/icons';
import { TextInput, TextInputProps } from './TextInput';

type SearchInputBaseProps = Omit<TextInputProps, 'error' | 'helperText' | 'label'>;

export interface SearchInputProps extends SearchInputBaseProps {}

const style = (theme: Theme) =>
  css({
    '& > .MuiInputBase-root': {
      borderRadius: theme.spacing(3.75),
    },
  });

export const SearchInput = memo((props: SearchInputProps) => {
  const { InputProps, ...rest } = props;

  const endAdornment = useMemo(
    () => (
      <InputAdornment position="end">
        <Search />
      </InputAdornment>
    ),
    []
  );

  return <TextInput css={style} {...rest} InputProps={{ ...InputProps, endAdornment }} />;
});
