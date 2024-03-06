import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppSetup } from 'AppSetup';

export const setup = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => ({
  user: userEvent.setup(),
  ...render(<AppSetup>{ui}</AppSetup>, options),
});
