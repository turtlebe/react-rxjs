import { StoryFn, Meta } from '@storybook/react';
import { SearchInput } from '../SearchInput';

export default {
  title: 'components/SearchInput',
  component: SearchInput,
} as Meta<typeof SearchInput>;

const Template: StoryFn<typeof SearchInput> = (args) => <SearchInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Search',
};
