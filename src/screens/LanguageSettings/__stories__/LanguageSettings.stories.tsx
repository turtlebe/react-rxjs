import { useEffect } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { refreshUser } from 'state/user';
import { withRouter } from 'utils/storybook/decorators';
import { LanguageSettings } from '../LanguageSettings';

export default {
  title: 'screens/LanguageSettings',
  component: LanguageSettings,
  decorators: [withRouter()],
} as Meta<typeof LanguageSettings>;

const Template: StoryFn<typeof LanguageSettings> = () => {
  useEffect(() => {
    refreshUser(true);
  }, []);
  return <LanguageSettings />;
};

export const LanguageSettingsMenu = Template.bind({});
