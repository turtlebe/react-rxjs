/* eslint-disable no-console */

import { StoryFn, Meta } from '@storybook/react';
import { KycLightForm } from '../KycLightForm';

export default {
  title: 'screens/Orderbook/KYCLight/KYCLightForm',
  component: KycLightForm,
} as Meta<typeof KycLightForm>;

const Template: StoryFn<typeof KycLightForm> = (args) => <KycLightForm {...args} />;

export const Empty = Template.bind({});
Empty.args = {};

export const Filled = Template.bind({});
Filled.args = {
  initialValues: {
    city: 'München',
    companyName: 'Monster AG',
    country: 'DE',
    legalForm: 'DE0001',
    phoneNumber: '+49123456789',
    postcode: '80333',
    streetAndNumber: 'Luisenstr. 51',
    vatId: 'DE912345678',
  },
};
