import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Button } from 'components/Button';
import { ContactPopup } from '../ContactPopup';

export default {
  title: 'components/ContactPopup',
  component: ContactPopup,
} as Meta<typeof ContactPopup>;

const Template: StoryFn<typeof ContactPopup> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button fullWidth={false} onClick={() => setOpen(true)}>
        Open popup
      </Button>
      <ContactPopup {...args} open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
