import { StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { AppSetup } from 'AppSetup';

export const withMuiTheme = (Story: StoryFn) => (
  <AppSetup>
    <Story />
  </AppSetup>
);

export const withRouter = (rootPath?: string) => (Story: StoryFn) =>
  (
    <MemoryRouter initialEntries={rootPath ? [rootPath] : undefined}>
      <Story />
    </MemoryRouter>
  );
