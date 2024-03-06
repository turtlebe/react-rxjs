import { Observable, from, map, catchError } from 'rxjs';
import { handleError, ifOkThenTrue, toResponseData } from 'utils/api';
import { bffFetcher } from './fetch';
import { UserProfile, User } from './types';

const t = (str: string) => str;
const phrases = {
  sendRegistrationDataError: t('An error occurred submitting the registration form'),
};
const fetchUser = bffFetcher.path('/user').method('get').create();
export const getUser = (): Observable<User | undefined> =>
  from(fetchUser({})).pipe(map(toResponseData(undefined)));

const putUserData = bffFetcher.path('/user').method('put').create();
export const updateUserData = (data: UserProfile) =>
  from(putUserData(data)).pipe(
    map(ifOkThenTrue),
    catchError(handleError(phrases.sendRegistrationDataError, false))
  );
