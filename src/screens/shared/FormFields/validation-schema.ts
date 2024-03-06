import { useMemo } from 'react';
import { startOfDay, subYears } from 'date-fns';
import { matchIsValidTel } from 'mui-tel-input';
import { boolean, date, string } from 'yup';
import validator from 'validator';
import { TranslateFn, useTranslatedText } from 'hooks/useTranslatedText';
import {
  GermanAlphaNumericOrEmptyRegex,
  GermanAlphaNumericRegex,
  GermanLettersOrEmptyRegex,
  GermanLettersRegex,
} from 'utils/regex';

const phrases = (t: TranslateFn) => ({
  businessLicenseRequired: t('Please upload a document'),
  cityRequired: t('Please enter a city'),
  cityNoNumbers: t('City cannot have numbers'),
  cityNoSpecialCharacters: t('City cannot have special characters'),
  commercialRegisterNumberRequired: t('Please enter a commercial register number'),
  companyNameRequired: t('Please enter the name of your company'),
  countryRequired: t('Please enter a country'),
  legalFormRequired: t('Please enter a legal form'),
  phoneNumberRequired: t('Please enter a phone number'),
  phoneNumberInvalid: t('Please enter a valid phone number'),
  postcodeRequired: t('Please enter a postcode'),
  postcodeMinCharacters: t('Postcode must have at least 3 characters'),
  postcodeInvalidCharacters: t('Postcode cannot have special characters'),
  registrationAuthorityRequired: t('Please enter a registration authority'),
  streetRequired: t('Please enter a street and number'),
  streetNoSpecialCharacters: t('Street & number cannot have special characters'),
  streetNoHouseNumber: t('Please enter a house number'),
  vatIdRequired: t('Please enter a VAT ID'),
  vatIdInvalid: t('Please provide a valid VAT ID'),
  taxIdRequired: t('Please enter a Tax ID'),
  ibanRequired: t('Please enter an IBAN'),
  ibanInvalid: t('Please provide a valid IBAN'),
  bicRequired: t('Please enter a BIC'),
  bicInvalid: t('Please provide a valid BIC'),
  firstNameRequired: t('Please enter a first name'),
  lastNameRequired: t('Please enter a last name'),
  emailRequired: t('Please enter an email'),
  emailInvalid: t('Please enter a valid email'),
  dobRequired: t('Please enter a date of birth'),
  dobTooYoung: t('Legal representatives must be at least 18 years old'),
  dobTooOld: t('Legal representatives must be at most 100 years old'),
  languageRequired: t('Language is required'),
  placeOfBirthRequired: t('Please enter a place of birth'),
  placeOfBirthNoNumbers: t('Place of birth cannot have numbers'),
  placeOfBirthNoSpecialCharacters: t('Place of birth cannot have special characters'),
  nationalityRequired: t('Please select a nationality'),
  contactNameRequired: t('Please enter a contact name'),
  contactEmailRequired: t('Please enter a contact email'),
  contactNameInvalidChars: t('Contact name cannot contain special characters'),
  contactNameContainsNumbers: t('Contact name cannot contain numbers'),
});

export const booleanTrueSchema = (message: string) => boolean().required().oneOf([true], message);

export const useCommonSchemas = () => {
  const translations = useTranslatedText(phrases);

  const schemas = useMemo(() => {
    const citySchema = string()
      .required(translations.cityRequired)
      .matches(GermanAlphaNumericRegex, translations.cityNoSpecialCharacters)
      .matches(GermanLettersRegex, translations.cityNoNumbers);

    const addressAddonSchema = string();

    const businessLicenseUploadIdSchema = string().when('businessLicenseFileRequired', {
      is: true,
      then: (schema) => schema.required(translations.businessLicenseRequired),
    });

    const commercialRegisterNumberSchema = string().when('commercialRegisterNumberRequired', {
      is: true,
      then: (schema) => schema.required(translations.commercialRegisterNumberRequired),
    });

    const companyNameSchema = string().required(translations.companyNameRequired);

    const countrySchema = string().required(translations.countryRequired);

    const legalFormSchema = string().required(translations.legalFormRequired);

    const phoneNumberSchema = string()
      .required(translations.phoneNumberRequired)
      .min(4, translations.phoneNumberRequired)
      .test(
        'valid-phone-number',
        translations.phoneNumberInvalid,
        (value) => !!value && matchIsValidTel(value)
      );

    const postcodeSchema = string()
      .required(translations.postcodeRequired)
      .min(3, translations.postcodeMinCharacters)
      .matches(/^[a-zA-Z0-9-]+$/, translations.postcodeInvalidCharacters);

    const registrationAuthoritySchema = string().required(
      translations.registrationAuthorityRequired
    );

    const streetAndNumberSchema = string()
      .required(translations.streetRequired)
      .matches(/^[a-zA-Z0-9ÄäÖöÜüß& ,.-]+$/, translations.streetNoSpecialCharacters)
      .matches(/[0-9]$/, translations.streetNoHouseNumber);

    const vatIdSchema = string()
      .required(translations.vatIdRequired)
      .test(
        'valid-vatid',
        translations.vatIdInvalid,
        (value, context) => !!value && validator.isVAT(value, context.parent.country)
      );

    const taxIdSchema = string();

    const ibanSchema = string()
      .required(translations.ibanRequired)
      .test('valid-iban', translations.ibanInvalid, (value) => !!value && validator.isIBAN(value));

    const bicSchema = string()
      .required(translations.bicRequired)
      .test('valid-bic', translations.bicInvalid, (value) => !!value && validator.isBIC(value));

    const firstNameSchema = string().required(translations.firstNameRequired);

    const lastNameSchema = string().required(translations.lastNameRequired);

    const nullableEmailSchema = string().email(translations.emailInvalid);

    const emailSchema = nullableEmailSchema.required(translations.emailRequired);

    const today = startOfDay(new Date());
    const dobSchema = date()
      .nullable()
      .required(translations.dobRequired)
      .min(subYears(today, 100), translations.dobTooOld)
      .max(subYears(today, 18), translations.dobTooYoung);

    const languageSchema = string().required(translations.languageRequired);

    const placeOfBirthSchema = string()
      .required(translations.placeOfBirthRequired)
      .matches(GermanAlphaNumericRegex, translations.placeOfBirthNoSpecialCharacters)
      .matches(GermanLettersRegex, translations.placeOfBirthNoNumbers);

    const nationalitySchema = string().required(translations.nationalityRequired);

    const contactNameSchema = string()
      .required(translations.contactNameRequired)
      .matches(GermanAlphaNumericRegex, translations.contactNameInvalidChars)
      .matches(GermanLettersRegex, translations.contactNameContainsNumbers);

    const orderContactNameSchema = string()
      .matches(GermanAlphaNumericOrEmptyRegex, translations.contactNameInvalidChars)
      .matches(GermanLettersOrEmptyRegex, translations.contactNameContainsNumbers);

    const orderPhoneNumberSchema = string().nullable();

    return {
      citySchema,
      addressAddonSchema,
      businessLicenseUploadIdSchema,
      commercialRegisterNumberSchema,
      companyNameSchema,
      countrySchema,
      legalFormSchema,
      phoneNumberSchema,
      postcodeSchema,
      registrationAuthoritySchema,
      streetAndNumberSchema,
      vatIdSchema,
      taxIdSchema,
      ibanSchema,
      bicSchema,
      firstNameSchema,
      lastNameSchema,
      emailSchema,
      nullableEmailSchema,
      dobSchema,
      languageSchema,
      placeOfBirthSchema,
      nationalitySchema,
      contactNameSchema,
      orderContactNameSchema,
      orderPhoneNumberSchema,
    };
  }, [translations]);

  return schemas;
};
