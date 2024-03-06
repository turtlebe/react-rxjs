import { composeStories } from '@storybook/testing-react';
import { setup } from 'test-utils/rt-lib';
import { testRequiredValidation, testValidEntry } from 'test-utils/forms';
import * as stories from '../__stories__/BankAccountForm.stories';

jest.mock('../../../EnvironmentConfig');

describe('[component] BankAccountForm', () => {
  describe('validation', () => {
    let onSubmit: jest.Mock;

    beforeEach(() => {
      onSubmit = jest.fn();
    });
    describe('validation', () => {
      const { Empty, Filled } = composeStories(stories);
      const renderEmptyForm = () => setup(<Empty onSubmit={onSubmit} />);
      const renderFilledForm = () => setup(<Filled onSubmit={onSubmit} />);
      describe('IBAN', () => {
        it('should require IBAN', async () => {
          await testRequiredValidation({
            onSubmit,
            submitName: 'Next',
            renderComponent: renderEmptyForm,
            validationText: 'Please enter an IBAN',
          });
        });

        it('should accept a valid IBAN', async () => {
          await testValidEntry({
            renderComponent: renderFilledForm,
            label: 'IBAN',
            onSubmit,
            submitName: 'Next',
            typed: 'DE89 3704 0044 0532 0130 00',
          });
        });
      });

      describe('BIC', () => {
        it('should require BIC', async () => {
          await testRequiredValidation({
            onSubmit,
            submitName: 'Next',
            renderComponent: renderEmptyForm,
            validationText: 'Please enter a BIC',
          });
        });

        it('should accept a valid BIC', async () => {
          await testValidEntry({
            renderComponent: renderFilledForm,
            label: 'Bic',
            onSubmit,
            submitName: 'Next',
            typed: 'SSKMDEMM',
          });
        });
      });
    });
  });
});
