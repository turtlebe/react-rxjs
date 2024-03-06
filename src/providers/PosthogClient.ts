import posthog from 'posthog-js';
import { User } from 'api/types';

export function posthogClientInit() {
  posthog.init(window.config.POSTHOG_API_KEY, {
    api_host: window.config.POSTHOG_API_HOST,
    // Disable posthog based on environment setting
    loaded: () => {
      if (!window.config.POSTHOG_ENABLED) posthog.opt_out_capturing();
    },
  });
  return posthog;
}

export function identifySafely(user: User) {
  try {
    posthog.identify(user.userId, {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (err) {
    /* empty */
  }
}

export function posthogLogoutSafely() {
  try {
    posthog.reset();
  } catch (err) {
    /* empty */
  }
}
