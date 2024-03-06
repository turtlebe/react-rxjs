import { StoryFn, Meta } from '@storybook/react';
import { TextInput } from 'components/TextInput';
import { ColumnLayout } from '../ColumnLayout';

export default {
  title: 'components/ColumnLayout',
  component: ColumnLayout,
  args: {
    children: (
      <>
        <TextInput label="Input 1" />
        <TextInput label="Input 2" />
        <TextInput label="Input 3" />
        <TextInput label="Input 4" />
      </>
    ),
  },
} as Meta<typeof ColumnLayout>;

const Template: StoryFn<typeof ColumnLayout> = (args) => <ColumnLayout {...args} />;

export const RowDirection = Template.bind({});
RowDirection.args = {
  children: (
    <>
      <TextInput label="Input 1" />
      <TextInput label="Input 2" />
      <TextInput label="Input 3" />
      <TextInput label="Input 4" />
    </>
  ),
};

export const ColumnDirection = Template.bind({});
ColumnDirection.args = {
  flowDirection: 'column',
};
