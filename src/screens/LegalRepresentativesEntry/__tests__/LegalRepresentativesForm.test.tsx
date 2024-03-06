import { composeStories } from '@storybook/testing-react';
import { addDays, format, subDays, subYears } from 'date-fns';
import { screen } from '@testing-library/react';
import {
  testInvalidEntryValidation,
  testRequiredValidation,
  testValidEntry,
} from 'test-utils/forms';
import { setup } from 'test-utils/rt-lib';
import * as stories from '../__stories__/LegalRepresentativesForm.stories';

jest.mock('../../../EnvironmentConfig');

const { Empty, Filled } = composeStories(stories);

describe('[component] LegalRepresentativesForm', () => {
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
          submitName: 'Next',
          renderComponent: renderEmptyForm,
          validationText: 'Please enter a first name',
        });
      });

      it('should accept a valid value', async () => {
        await testValidEntry({
          label: 'First name',
          onSubmit,
          renderComponent: renderFilledForm,
          submitName: 'Next',
          typed: 'John',
        });
      });
    });

    describe('Last name', () => {
      it('should require a value', async () => {
        await testRequiredValidation({
          onSubmit,
          submitName: 'Next',
          renderComponent: renderEmptyForm,
          validationText: 'Please enter a last name',
        });
      });

      it('should accept a valid value', async () => {
        await testValidEntry({
          label: 'Last name',
          onSubmit,
          renderComponent: renderFilledForm,
          submitName: 'Next',
          typed: 'Galt',
        });
      });
    });

    describe('Email', () => {
      it('should require a value', async () => {
        await testRequiredValidation({
          onSubmit,
          submitName: 'Next',
          renderComponent: renderEmptyForm,
          validationText: 'Please enter an email',
        });
      });

      it('should reject an invalid email', async () => {
        await testInvalidEntryValidation({
          onSubmit,
          renderComponent: renderFilledForm,
          submitName: 'Next',
          label: 'Email',
          typed: 'foo',
          validationText: 'Please enter a valid email',
        });
      });

      it('should accept a valid value', async () => {
        await testValidEntry({
          label: 'Email',
          onSubmit,
          renderComponent: renderFilledForm,
          submitName: 'Next',
          typed: 'john@galt.com',
        });
      });
    });

    describe('Date of birth', () => {
      it('should require a value', async () => {
        await testRequiredValidation({
          onSubmit,
          submitName: 'Next',
          renderComponent: renderEmptyForm,
          validationText: 'Please enter a date of birth',
        });
      });

      it('should reject an date too young', async () => {
        await testInvalidEntryValidation({
          onSubmit,
          renderComponent: renderFilledForm,
          submitName: 'Next',
          label: 'Date of birth',
          typed: format(addDays(subYears(new Date(), 18), 1), 'dd.MM.yyyy'),
          validationText: 'Legal representatives must be at least 18 years old',
        });
      });

      it('should reject an date too old', async () => {
        await testInvalidEntryValidation({
          onSubmit,
          renderComponent: renderFilledForm,
          submitName: 'Next',
          label: 'Date of birth',
          typed: format(subDays(subYears(new Date(), 100), 1), 'dd.MM.yyyy'),
          validationText: 'Legal representatives must be at most 100 years old',
        });
      });

      it('should reject an invalid date', async () => {
        await testInvalidEntryValidation({
          onSubmit,
          renderComponent: renderFilledForm,
          submitName: 'Next',
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
          submitName: 'Next',
          typed: '12/12/1985',
        });
      });
    });
  });

  describe('Representatives', () => {
    it('should show two representative forms when joint power selected', async () => {
      // setup
      const { user } = renderEmptyForm();

      // run
      const jointRadio = await screen.findByText('Joint power');
      await user.click(jointRadio);

      // verify
      expect(await screen.findAllByText(/^Representative \d$/)).toHaveLength(2);
      await screen.findByText('Add another representative');
      await screen.findByText('I have entered all representatives');
    });

    it('should show one representative when joint and then sole power selected', async () => {
      // setup
      const { user } = renderEmptyForm();

      // run
      const jointRadio = await screen.findByText('Joint power');
      await user.click(jointRadio);
      const soleRadio = await screen.findByText('Sole power');
      await user.click(soleRadio);

      // verify
      expect(screen.queryAllByText(/^Representative \d$/)).toHaveLength(0);
      expect(screen.queryByText('Add another representative')).toBeNull();
      await screen.findByText('Sole representative');
      await screen.findByText('Next');
    });

    it('should add another representative when add button clicked', async () => {
      // setup
      const { user } = renderEmptyForm();

      // run
      const jointRadio = await screen.findByText('Joint power');
      await user.click(jointRadio);
      const addButton = await screen.findByText('Add another representative');
      await user.click(addButton);

      // verify
      expect(await screen.findAllByText(/^Representative \d$/)).toHaveLength(3);
    });

    it('should remove the representative with the delete button', async () => {
      // setup
      const { user } = renderEmptyForm();

      // run
      const jointRadio = await screen.findByText('Joint power');
      await user.click(jointRadio);
      const addButton = await screen.findByText('Add another representative');
      await user.click(addButton);
      const removeButton = await screen.findByLabelText('remove representative');
      await user.click(removeButton);

      // verify
      expect(await screen.findAllByText(/^Representative \d$/)).toHaveLength(2);
    });
  });
});
