const mockConfig: EnvironmentConfiguration = {
  API_URL: '',
  AUTH0_CLIENT_ID: '',
  AUTH0_DOMAIN: '',
  AUTH0_AUDIENCE: '',
  GOOGLE_MAPS_API_KEY: '',
  POSTHOG_API_KEY: '',
  POSTHOG_API_HOST: '',
  POSTHOG_ENABLED: false,
};

export const getEnvironmentConfig = jest.fn().mockReturnValue(Promise.resolve(mockConfig));
