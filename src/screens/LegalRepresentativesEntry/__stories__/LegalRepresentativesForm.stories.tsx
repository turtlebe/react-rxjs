import { StoryFn, Meta } from '@storybook/react';
import { LegalRepresentativesForm } from '../LegalRepresentativesForm';

export default {
  title: 'screens/KYC/LegalRepresentativesForm',
  component: LegalRepresentativesForm,
} as Meta<typeof LegalRepresentativesForm>;

const Template: StoryFn<typeof LegalRepresentativesForm> = (args) => (
  <LegalRepresentativesForm {...args} />
);

export const Empty = Template.bind({});
Empty.args = {};

export const Filled = Template.bind({});
Filled.args = {
  initialValues: {
    areYouLegalRepresentative: 'yes',
    powerOfRepresentation: 'sole',
    representatives: [
      {
        firstName: 'John',
        lastName: 'Gelt',
        email: 'john@galt.com',
        dob: new Date('12/12/1985'),
        language: 'en_GB',
      },
    ],
  },
};
