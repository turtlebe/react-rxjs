import { StoryFn, Meta } from '@storybook/react';
import { CurrencyInput } from '../CurrencyInput';

export default {
  title: 'components/CurrencyInput',
  component: CurrencyInput,
} as Meta<typeof CurrencyInput>;

const Template: StoryFn<typeof CurrencyInput> = (args) => <CurrencyInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  country: 'DE',
};
