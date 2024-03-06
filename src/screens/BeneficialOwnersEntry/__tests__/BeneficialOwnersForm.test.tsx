import { composeStories } from '@storybook/testing-react';
import { addDays, format, subDays, subYears } from 'date-fns';
import { screen } from '@testing-library/react';
import {
  testInvalidEntryValidation,
  testRequiredValidation,
  testValidEntry,
} from 'test-utils/forms';
import { setup } from 'test-utils/rt-lib';
import * as stories from '../__stories__/BeneficialOwnersForm.stories';

jest.mock('../../../EnvironmentConfig');

const { Empty, Filled } = composeStories(stories);

describe('[component] BeneficialOwnersForm', () => {
  let onSubmit: jest.Mock;

  beforeEach(() => {
    onSubmit = jest.fn();
  });

  const renderEmptyForm = () => setup(<Empty onSubmit={onSubmit} />);
  const renderFilledForm = () => setup(<Filled onSubmit={onSubmit} />);

  describe('validation', () => {
    describe('First name', () => {
      it('should require a value', async () => {
        await testRequiredValidation({
          onSubmit,
          submitName: 'Submit',
          renderComponent: renderEmptyForm,
          validationText: 'Please enter a first name',
        });
      });

      it('should accept a valid value', async () => {
        await testValidEntry({
          label: 'First name',
          onSubmit,
          renderComponent: renderFilledForm,
          submitName: 'Submit',
          typed: 'John',
        });
      });
    });

    describe('Last name', () => {
      it('should require a value', async () => {
        await testRequiredValidation({
          onSubmit,
          submitName: 'Submit',
          renderComponent: renderEmptyForm,
          validationText: 'Please enter a last name',
        });
      });

      it('should accept a valid value', async () => {
        await testValidEntry({
          label: 'Last name',
          onSubmit,
          renderComponent: renderFilledForm,
          submitName: 'Submit',
          typed: 'Galt',
        });
      });
    });

    describe('Date of birth', () => {
      it('should require a value', async () => {
        await testRequiredValidation({
          onSubmit,
          submitName: 'Submit',
          renderComponent: renderEmptyForm,
          validationText: 'Please enter a date of birth',
        });
      });

      it('should reject an date too young', async () => {
        await testInvalidEntryValidation({
          onSubmit,
          renderComponent: renderFilledForm,
          submitName: 'Submit',
          label: 'Date of birth',
          typed: format(addDays(subYears(new Date(), 18), 1), 'dd.MM.yyyy'),
          validationText: 'Legal representatives must be at least 18 years old',
        });
      });

      it('should reject an date too old', async () => {
        await testInvalidEntryValidation({
          onSubmit,
          renderComponent: renderFilledForm,
          submitName: 'Submit',
          label: 'Date of birth',
          typed: format(subDays(subYears(new Date(), 100), 7), 'dd.MM.yyyy'),
          validationText: 'Legal representatives must be at most 100 years old',
        });
      });

      it('should reject an invalid date', async () => {
        await testInvalidEntryValidation({
          onSubmit,
          renderComponent: renderFilledForm,
          submitName: 'Submit',
          label: 'Date of birth',
          typed: '12/12/',
          validationText: 'Please enter a date of birth',
        });
      });

      it('should accept a valid value', async () => {
        await testValidEntry({
          label: 'Date of birth',
          onSubmit,
          renderComponent: renderFilledForm,
          submitName: 'Submit',
          typed: '12/12/1985',
        });
      });
    });

    describe('Place of birth', () => {
      it('should require place of birth', async () => {
        await testRequiredValidation({
          submitName: 'Submit',
          validationText: 'Please enter a place of birth',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should reject place of birth with special characters', async () => {
        await testInvalidEntryValidation({
          submitName: 'Submit',
          label: 'Place of birth',
          typed: 'Spec!al Char$',
          validationText: 'Place of birth cannot have special characters',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should reject place of birth with numbers', async () => {
        await testInvalidEntryValidation({
          submitName: 'Submit',
          label: 'Place of birth',
          typed: 'Some numbers 123',
          validationText: 'Place of birth cannot have numbers',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should accept a place of birth with German characters', async () => {
        await testValidEntry({
          renderComponent: renderFilledForm,
          submitName: 'Submit',
          onSubmit,
          label: 'Place of birth',
          typed: 'ÄäÖöÜü',
        });
      });

      it('should accept a valid place of birth input', async () => {
        await testValidEntry({
          renderComponent: renderFilledForm,
          submitName: 'Submit',
          onSubmit,
          label: 'Place of birth',
          typed: 'München',
        });
      });
    });

    describe('Street, number', () => {
      it('should require street', async () => {
        await testRequiredValidation({
          submitName: 'Submit',
          validationText: 'Please enter a street and number',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should reject street with special characters', async () => {
        await testInvalidEntryValidation({
          submitName: 'Submit',
          label: 'Street & number',
          typed: '$fss44s&"',
          validationText: 'Street & number cannot have special characters',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should reject street with no numbers', async () => {
        await testInvalidEntryValidation({
          submitName: 'Submit',
          label: 'Street & number',
          typed: 'This is a street',
          validationText: 'Please enter a house number',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should accept a valid street input', async () => {
        await testValidEntry({
          renderComponent: renderFilledForm,
          submitName: 'Submit',
          onSubmit,
          label: 'Street & number',
          typed: 'Am Wacker 23',
        });
      });
    });

    describe('Postcode', () => {
      it('should require postcode', async () => {
        await testRequiredValidation({
          submitName: 'Submit',
          validationText: 'Please enter a postcode',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should reject postcode with less than 3 length', async () => {
        await testInvalidEntryValidation({
          submitName: 'Submit',
          label: 'Postcode',
          typed: 'ab',
          validationText: 'Postcode must have at least 3 characters',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should reject postcode with invalid characters', async () => {
        await testInvalidEntryValidation({
          submitName: 'Submit',
          label: 'Postcode',
          typed: '$fsss&"',
          validationText: 'Postcode cannot have special characters',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should accept a valid postcode input', async () => {
        await testValidEntry({
          renderComponent: renderFilledForm,
          submitName: 'Submit',
          onSubmit,
          label: 'Postcode',
          typed: '20384',
        });
      });
    });

    describe('beneficial owners', () => {
      it('should add another beneficial owner on clicking add', async () => {
        // setup
        const { user } = renderEmptyForm();

        // run
        const addButton = await screen.findByText('Add another beneficial owner');
        await user.click(addButton);

        // verify
        expect(await screen.findAllByText(/^Beneficial owner \d$/)).toHaveLength(2);
      });

      it('should remove the beneficial owner on clicking remove', async () => {
        // setup
        const { user } = renderEmptyForm();

        // run
        const addButton = await screen.findByText('Add another beneficial owner');
        await user.click(addButton);
        const removeButton = await screen.findByLabelText('remove beneficial owner');
        await user.click(removeButton);

        // verify
        expect(await screen.findAllByText(/^Beneficial owner \d$/)).toHaveLength(1);
      });
    });
  });
});
