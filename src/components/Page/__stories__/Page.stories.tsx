import { StoryFn, Meta } from '@storybook/react';
import { Typography } from 'components/Typography';
import { Page } from '../Page';

export default {
  title: 'components/Page',
  component: Page,
  args: {
    children: (
      <div>
        <Typography>This is a page which fills the area and sets css styles.</Typography>
      </div>
    ),
  },
} as Meta<typeof Page>;

const Template: StoryFn<typeof Page> = (args) => <Page {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithClose = Template.bind({});
WithClose.args = {
  onClose: () => null,
};

export const WithHeader = Template.bind({});
WithHeader.args = {
  onClose: () => null,
  header: <div>Header element</div>,
};
