import { Fetcher, Middleware } from 'openapi-typescript-fetch';
import { paths as currentPaths } from '../__generated__/truckos-api';
import { paths as bffPaths } from '../__generated__/truckos-api-bff';

const fetcher = Fetcher.for<currentPaths>();
const bffFetcher = Fetcher.for<bffPaths>();

let tokenFactory: (forceRefresh: boolean) => Promise<string> | undefined;
let forceTokenRefresh = false;

const loggingEnabled = false;

const setAccessTokenFactory = (factory: (forceRefresh: boolean) => Promise<string>) => {
  tokenFactory = factory;
};

const forceRefreshTokenOnNextRequest = () => {
  forceTokenRefresh = true;
};

let oldToken: string | undefined;

function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

const loggerMiddleware: Middleware = async (url, init, next) => {
  if (!loggingEnabled) {
    return next(url, init);
  }
  try {
    const response = await next(url, init);
    console.log({
      url,
      request: init,
      response,
    });
    return response;
  } catch (error) {
    console.error({
      url,
      request: init,
      error,
    });
    throw error;
  }
};

const authMiddleware: Middleware = async (url, init, next) => {
  if (tokenFactory) {
    const token = await tokenFactory(forceTokenRefresh);
    forceTokenRefresh = false;
    if (loggingEnabled && oldToken !== token) {
      console.log('** NEW TOKEN **');
      if (oldToken) {
        console.log('Old Token: ');
        console.log(parseJwt(oldToken));
      }
      if (token) {
        console.log('New Token: ', {
          token: parseJwt(token),
          stringToken: token,
        });
      }
      oldToken = token;
    }

    init.headers.set('Authorization', `Bearer ${token}`);
  }

  return next(url, init);
};

[bffFetcher, fetcher].forEach((instance) => {
  instance.configure({
    baseUrl: window.config.API_URL,
    use: [authMiddleware, loggerMiddleware],
  });
});

export { bffFetcher, fetcher, setAccessTokenFactory, forceRefreshTokenOnNextRequest };
