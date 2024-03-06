import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Button } from 'components/Button';
import { Backdrop } from '../Backdrop';

export default {
  title: 'components/Backdrop',
  component: Backdrop,
} as Meta<typeof Backdrop>;

const Template: StoryFn<typeof Backdrop> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button css={{ width: 200 }} onClick={() => setOpen(true)}>
        Open backdrop
      </Button>
      <Backdrop open={open} onClick={() => setOpen(false)} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
