import { StoryFn, Meta } from '@storybook/react';
import { CustomerInformationForm } from '../CustomerInformationForm';

export default {
  title: 'screens/shared/CustomerInformationForm',
  component: CustomerInformationForm,
} as Meta<typeof CustomerInformationForm>;

const Template: StoryFn<typeof CustomerInformationForm> = (args) => (
  <CustomerInformationForm {...args} />
);

export const Empty = Template.bind({});
Empty.args = {};

export const Filled = Template.bind({});
Filled.args = {
  initialValues: {
    addressAddon: 'Loft 2',
    city: 'München',
    commercialRegisterNumber: 'HRA162345',
    commercialRegisterNumberRequired: true,
    companyName: 'Monster AG',
    companyId: 'company1',
    country: 'DE',
    legalForm: 'GmbH',
    postcode: '80333',
    registrationAuthority: 'Amtsgericht München (RA000304)',
    streetAndNumber: 'Luisenstr. 51',
    vatId: 'DE912345678',
  },
};
