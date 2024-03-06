import { composeStories } from '@storybook/testing-react';
import { screen, waitFor } from '@testing-library/react';
import {
  testInvalidEntryValidation,
  testRequiredValidation,
  testValidEntry,
} from 'test-utils/forms';
import { setup } from 'test-utils/rt-lib';
import { BusinessDataFormProps, DEFAULT_VALUES } from '../BusinessDataForm';
import * as stories from '../__stories__/BusinessDataForm.stories';

jest.mock('../../../EnvironmentConfig');

const { Empty, Filled } = composeStories(stories);

describe('[component] BusinessDataForm', () => {
  let onSubmit: jest.Mock;

  beforeEach(() => {
    onSubmit = jest.fn();
  });

  const renderEmptyForm = (props?: Partial<BusinessDataFormProps>) =>
    setup(<Empty {...props} onSubmit={onSubmit} />);
  const renderFilledForm = (props?: Partial<BusinessDataFormProps>) =>
    setup(<Filled {...props} onSubmit={onSubmit} />);

  describe('validation', () => {
    describe('City', () => {
      it('should require city', async () => {
        await testRequiredValidation({
          submitName: 'Next',
          validationText: 'Please enter a city',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should reject city with special characters', async () => {
        await testInvalidEntryValidation({
          submitName: 'Next',
          label: 'City',
          typed: 'Spec!al Char$',
          validationText: 'City cannot have special characters',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should reject city with numbers', async () => {
        await testInvalidEntryValidation({
          submitName: 'Next',
          label: 'City',
          typed: 'Some numbers 123',
          validationText: 'City cannot have numbers',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should accept a city with German characters', async () => {
        await testValidEntry({
          renderComponent: renderFilledForm,
          submitName: 'Next',
          onSubmit,
          label: 'City',
          typed: 'ÄäÖöÜü',
        });
      });

      it('should accept a valid city input', async () => {
        await testValidEntry({
          renderComponent: renderFilledForm,
          submitName: 'Next',
          onSubmit,
          label: 'City',
          typed: 'München',
        });
      });
    });

    describe('Commercial register number', () => {
      it('should require commercial register number', async () => {
        await testRequiredValidation({
          submitName: 'Next',
          validationText: 'Please enter a commercial register number',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should accept a valid commercial register number', async () => {
        await testValidEntry({
          renderComponent: renderFilledForm,
          submitName: 'Next',
          onSubmit,
          label: 'Commercial register number',
          typed: 'HRA162345',
        });
      });
    });

    describe('Company name', () => {
      it('should require company name', async () => {
        await testRequiredValidation({
          submitName: 'Next',
          validationText: 'Please enter the name of your company',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should accept a valid company name', async () => {
        await testValidEntry({
          renderComponent: renderFilledForm,
          submitName: 'Next',
          onSubmit,
          label: 'Company name',
          typed: 'Monster AG',
        });
      });
    });

    describe('Legal form', () => {
      it('should require legal form', async () => {
        await testRequiredValidation({
          submitName: 'Next',
          validationText: 'Please enter a legal form',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });
    });

    describe('Phone number', () => {
      it('should require phone number', async () => {
        await testRequiredValidation({
          submitName: 'Next',
          validationText: 'Please enter a phone number',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should reject phone number less than 4 length', async () => {
        await testInvalidEntryValidation({
          submitName: 'Next',
          label: 'Phone number',
          typed: '+4',
          validationText: 'Please enter a phone number',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should reject phone number that is invalid', async () => {
        await testInvalidEntryValidation({
          submitName: 'Next',
          label: 'Phone number',
          typed: '+44125',
          validationText: 'Please enter a valid phone number',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should accept a valid phone number', async () => {
        await testValidEntry({
          renderComponent: renderFilledForm,
          submitName: 'Next',
          onSubmit,
          label: 'Phone number',
          typed: '+49123456789',
        });
      });
    });

    describe('Postcode', () => {
      it('should require postcode', async () => {
        await testRequiredValidation({
          submitName: 'Next',
          validationText: 'Please enter a postcode',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should reject postcode with less than 3 length', async () => {
        await testInvalidEntryValidation({
          submitName: 'Next',
          label: 'Postcode',
          typed: 'ab',
          validationText: 'Postcode must have at least 3 characters',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should reject postcode with invalid characters', async () => {
        await testInvalidEntryValidation({
          submitName: 'Next',
          label: 'Postcode',
          typed: '$fsss&"',
          validationText: 'Postcode cannot have special characters',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should accept a valid postcode', async () => {
        await testValidEntry({
          renderComponent: renderFilledForm,
          submitName: 'Next',
          onSubmit,
          label: 'Postcode',
          typed: '80333',
        });
      });
    });

    describe('Registration authority', () => {
      it('should require registration authority', async () => {
        await testRequiredValidation({
          submitName: 'Next',
          validationText: 'Please enter a registration authority',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });
    });

    describe('Street, number', () => {
      it('should require street', async () => {
        await testRequiredValidation({
          submitName: 'Next',
          validationText: 'Please enter a street and number',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should reject street with special characters', async () => {
        await testInvalidEntryValidation({
          submitName: 'Next',
          label: 'Street & number',
          typed: '$fss44s&"',
          validationText: 'Street & number cannot have special characters',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should reject street with no numbers', async () => {
        await testInvalidEntryValidation({
          submitName: 'Next',
          label: 'Street & number',
          typed: 'This is a street',
          validationText: 'Please enter a house number',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });
      it('should accept a valid street', async () => {
        await testValidEntry({
          renderComponent: renderFilledForm,
          submitName: 'Next',
          onSubmit,
          label: 'Street & number',
          typed: 'Luisenstr. 51',
        });
      });
    });

    describe('Vat id', () => {
      it('should require vat id', async () => {
        await testRequiredValidation({
          submitName: 'Next',
          validationText: 'Please enter a VAT ID',
          onSubmit,
          renderComponent: renderEmptyForm,
        });
      });

      it('should accept a vat id', async () => {
        await testValidEntry({
          renderComponent: renderFilledForm,
          submitName: 'Next',
          onSubmit,
          label: 'VAT ID',
          typed: 'DE912345678',
        });
      });
    });
  });

  describe('business license', () => {
    const matches = ['GbR', 'Einzelunternehmen'];
    it('should not show the upload button when legal form is not matching', async () => {
      // run
      renderEmptyForm({
        initialValues: {
          ...DEFAULT_VALUES,
          legalForm: 'GmbH',
        },
      });
      // verify
      expect(screen.queryByText('Upload business license (pdf)')).toBeNull();
    });

    test.each(matches)('should disable the registration authority', async (legalForm) => {
      // run
      const { container } = renderFilledForm({
        initialValues: {
          ...DEFAULT_VALUES,
          legalForm,
        },
      });
      // verify
      await waitFor(() => {
        const registrationAuthority = container.querySelector(
          'input[name="registrationAuthority"]'
        );
        expect(registrationAuthority).toHaveAttribute('disabled');
      });
    });
  });
});
