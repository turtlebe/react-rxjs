import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

window.config = {
  API_URL: '',
  AUTH0_DOMAIN: '',
  AUTH0_CLIENT_ID: '',
  AUTH0_AUDIENCE: '',
  GOOGLE_MAPS_API_KEY: '',
  POSTHOG_API_KEY: '',
  POSTHOG_API_HOST: '',
  POSTHOG_ENABLED: false,
};

jest.setTimeout(10000);
