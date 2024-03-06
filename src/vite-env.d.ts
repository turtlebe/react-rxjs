/// <reference types="vite/client" />

interface EnvironmentConfiguration {
  API_URL: string;
  AUTH0_AUDIENCE: string;
  AUTH0_CLIENT_ID: string;
  AUTH0_DOMAIN: string;
  GOOGLE_MAPS_API_KEY: string;
  POSTHOG_API_HOST: string;
  POSTHOG_API_KEY: string;
  POSTHOG_ENABLED: boolean;
}

interface Window {
  config: EnvironmentConfiguration;
}
