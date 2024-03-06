import { StoryFn, Meta } from '@storybook/react';
import { BeneficialOwnersForm } from '../BeneficialOwnersForm';

export default {
  title: 'screens/KYC/BeneficialOwnersForm',
  component: BeneficialOwnersForm,
} as Meta<typeof BeneficialOwnersForm>;

const Template: StoryFn<typeof BeneficialOwnersForm> = (args) => <BeneficialOwnersForm {...args} />;

export const Empty = Template.bind({});
Empty.args = {};

export const Filled = Template.bind({});
Filled.args = {
  initialValues: {
    beneficialOwners: [
      {
        firstName: 'John',
        lastName: 'Galt',
        city: 'Hamburg',
        country: 'DE',
        dob: new Date('02/15/1982'),
        nationality: 'DE',
        placeOfBirth: 'Bremen',
        postcode: '20384',
        streetAndNumber: 'Am Wacker 23',
      },
    ],
  },
};
