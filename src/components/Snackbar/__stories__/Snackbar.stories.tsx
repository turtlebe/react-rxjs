import { useState } from 'react';
import { AlertColor } from '@mui/material/Alert';
import { StoryFn, Meta } from '@storybook/react';
import { Button } from 'components/Button';
import { Alert } from '../Alert';
import { Snackbar } from '../Snackbar';

export default {
  title: 'components/Snackbar',
  component: Snackbar,
} as Meta<typeof Snackbar>;

const Template: StoryFn<typeof Snackbar> = () => {
  const [type, setType] = useState<AlertColor | undefined>(undefined);

  const alert = type ? <Alert severity={type}>This is a message</Alert> : undefined;

  return (
    <div css={{ display: 'flex' }}>
      <Button color="secondary" onClick={() => setType('success')}>
        Success
      </Button>
      <Button color="secondary" onClick={() => setType('error')}>
        Error
      </Button>
      <Button color="secondary" onClick={() => setType('warning')}>
        Warning
      </Button>
      <Button color="secondary" onClick={() => setType('info')}>
        Info
      </Button>
      <Snackbar>{alert}</Snackbar>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
