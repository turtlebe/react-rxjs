import MuiCircularProgress, {
  CircularProgressProps as MuiCircularProgressProps,
} from '@mui/material/CircularProgress';

export interface CircularProgressProps extends MuiCircularProgressProps {}

export const CircularProgress = (props: CircularProgressProps) => {
  const { color = 'primary', ...rest } = props;

  return <MuiCircularProgress color={color} {...rest} />;
};
