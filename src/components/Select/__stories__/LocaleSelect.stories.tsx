import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Locale } from 'theme/icons/locales';
import { LocaleSelect } from '../LocaleSelect';

export default {
  title: 'components/LocaleSelect',
  component: LocaleSelect,
} as Meta<typeof LocaleSelect>;

const Template: StoryFn<typeof LocaleSelect> = (args) => {
  const [value, setValue] = useState<Locale>('de-DE');

  return <LocaleSelect {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {};

export const HideLabels = Template.bind({});
HideLabels.args = {
  hideLabels: true,
};
