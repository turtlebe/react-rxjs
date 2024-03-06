import { StoryFn, Meta } from '@storybook/react';
import { NoSearchResults } from '../NoSearchResults';

export default {
  title: 'screens/Factoring/NoSearchResults',
  component: NoSearchResults,
} as Meta<typeof NoSearchResults>;

const Template: StoryFn<typeof NoSearchResults> = () => <NoSearchResults />;

export const Default = Template.bind({});
Default.args = {};
