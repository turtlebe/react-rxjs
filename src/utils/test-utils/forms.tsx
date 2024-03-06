import { screen } from '@testing-library/react';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { setup } from './rt-lib';

export const clickSubmit = async (user: UserEvent, name: string) => {
  const submitButton = await screen.findByRole('button', { name });
  await user.click(submitButton);
};

export const checkForValidationText = async (onSubmit: jest.Mock, text: string) => {
  expect(onSubmit).not.toHaveBeenCalled();
  await screen.findByText(text);
};

export const testRequiredValidation = async ({
  onSubmit,
  renderComponent,
  submitName,
  validationText,
}: {
  onSubmit: jest.Mock;
  renderComponent: () => ReturnType<typeof setup>;
  submitName: string;
  validationText: string;
}) => {
  // setup
  const { user } = renderComponent();

  // run
  await clickSubmit(user, submitName);

  // verify
  await checkForValidationText(onSubmit, validationText);
};

export const testInvalidEntryValidation = async ({
  label,
  onSubmit,
  renderComponent,
  submitName,
  typed,
  validationText,
}: {
  label: string;
  onSubmit: jest.Mock;
  renderComponent: () => ReturnType<typeof setup>;
  submitName: string;
  typed: string;
  validationText: string;
}) => {
  // setup
  const { user } = renderComponent();

  // run
  const input = (await screen.findByLabelText(label)) as HTMLInputElement;
  user.clear(input);
  await user.type(input, typed);
  await clickSubmit(user, submitName);

  // verify
  await checkForValidationText(onSubmit, validationText);
};

export const testValidEntry = async ({
  label,
  onSubmit,
  renderComponent,
  submitName,
  typed,
}: {
  label: string;
  onSubmit: jest.Mock;
  renderComponent: () => ReturnType<typeof setup>;
  submitName: string;
  typed: string;
}) => {
  // setup
  const { user } = renderComponent();

  // run
  const input = (await screen.findByLabelText(label)) as HTMLInputElement;
  user.clear(input);
  await user.type(input, typed);
  await clickSubmit(user, submitName);

  // verify
  expect(onSubmit).toHaveBeenCalled();
};
