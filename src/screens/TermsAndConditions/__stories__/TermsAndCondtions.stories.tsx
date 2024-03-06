import { useEffect } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { refreshUser } from 'state/user';
import { withRouter } from 'utils/storybook/decorators';
import { TermsAndConditions } from '../TermsAndConditions';

export default {
  title: 'screens/TermsAndConditions',
  component: TermsAndConditions,
  decorators: [withRouter()],
} as Meta<typeof TermsAndConditions>;

const Template: StoryFn<typeof TermsAndConditions> = () => {
  useEffect(() => {
    refreshUser(true);
  }, []);
  return <TermsAndConditions />;
};

export const TermsAndConditionsMenu = Template.bind({});
