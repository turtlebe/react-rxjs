import { useEffect } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { refreshUser } from 'state/user';
import { withRouter } from 'utils/storybook/decorators';
import { SideNavBar } from '../SideNavBar';

export default {
  title: 'screens/SideNavBar',
  component: SideNavBar,
  decorators: [withRouter()],
} as Meta<typeof SideNavBar>;

const Template: StoryFn<typeof SideNavBar> = (args) => {
  useEffect(() => {
    refreshUser(true);
  }, []);

  return <SideNavBar css={{ height: '100%' }} {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  user: {
    userId: 'user1',
    firstName: 'John',
    lastName: 'Galt',
    email: 'john@galt-transporte.de',
    locale: 'de-DE',
    companies: [
      {
        companyName: 'Galt Transporte',
        companyId: 'company1',
        availableFeatures: [
          {
            functionality: 'ORDER_BOOK',
            status: 'FEATURE_AVAILABLE',
          },
          {
            functionality: 'FACTORING_WALBING',
            status: 'FEATURE_AVAILABLE',
          },
        ],
      },
    ],
  },
};

export const WithoutCompany = Template.bind({});
WithoutCompany.args = {
  user: {
    userId: 'user1',
    firstName: 'John',
    lastName: 'Galt',
    email: 'john@galt-transporte.de',
    locale: 'de-DE',
    companies: [],
  },
};

export const WithMultipleCompanies = Template.bind({});
WithMultipleCompanies.args = {
  user: {
    userId: 'user1',
    firstName: 'John',
    lastName: 'Galt',
    email: 'john@galt-transporte.de',
    locale: 'de-DE',
    companies: [
      {
        companyName: 'Galt Transporte',
        companyId: 'company-id-444',
        availableFeatures: [
          {
            functionality: 'ORDER_BOOK',
            status: 'FEATURE_AVAILABLE',
          },
          {
            functionality: 'FACTORING_WALBING',
            status: 'FEATURE_AVAILABLE',
          },
        ],
      },
      {
        companyName: 'Awesome Company',
        companyId: 'company2',
        availableFeatures: [
          {
            functionality: 'ORDER_BOOK',
            status: 'FEATURE_AVAILABLE',
          },
          {
            functionality: 'FACTORING_WALBING',
            status: 'FEATURE_AVAILABLE',
          },
        ],
      },
    ],
  },
};
