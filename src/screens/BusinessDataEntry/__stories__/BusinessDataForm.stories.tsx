/* eslint-disable no-console */
import { StoryFn, Meta } from '@storybook/react';
import { BusinessDataForm } from '../BusinessDataForm';

export default {
  title: 'screens/KYC/BusinessDataForm',
  component: BusinessDataForm,
} as Meta<typeof BusinessDataForm>;

const Template: StoryFn<typeof BusinessDataForm> = (args) => <BusinessDataForm {...args} />;

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
    country: 'DE',
    legalForm: 'DE0001',
    businessLicenseUploadId: '',
    businessLicenseFilename: '',
    businessLicenseFileRequired: false,
    phoneNumber: '+49123456789',
    postcode: '80333',
    registrationAuthority: 'RADE0001',
    streetAndNumber: 'Luisenstr. 51',
    vatId: 'DE912345678',
  },
};
