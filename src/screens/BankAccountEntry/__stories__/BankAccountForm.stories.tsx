/* eslint-disable no-console */
import { StoryFn, Meta } from '@storybook/react';
import { BankAccountForm } from '../BankAccountForm';

export default {
  title: 'screens/KYC/BankAccountForm',
  component: BankAccountForm,
} as Meta<typeof BankAccountForm>;

const Template: StoryFn<typeof BankAccountForm> = (args) => <BankAccountForm {...args} />;

export const Empty = Template.bind({});
Empty.args = {};

export const Filled = Template.bind({});
Filled.args = {
  initialValues: {
    bic: 'SSKMDEMM',
    iban: 'DE89 3704 0044 0532 0130 00',
    authorization: true,
  },
};
