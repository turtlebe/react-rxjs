import { useMemo } from 'react';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

type ParamsMap<TParams extends string> = {
  [key in TParams]: number | string | undefined;
};
type ParameterizedTranslationFn<TParams extends string = string> = (
  params: ParamsMap<TParams>
) => string;

type PhrasesMap = { [key: string]: ParameterizedTranslationFn | string };

type PhrasesFn<TReturn extends PhrasesMap = PhrasesMap> = (t: TranslateFn) => TReturn;

const dummyTranslateFunction = (translationKey: string) => translationKey;

export type TranslateFn =
  | TFunction<'translation', undefined, 'translation'>
  | typeof dummyTranslateFunction;

export const withParams =
  <TParams extends string>(translateFn: ParameterizedTranslationFn<TParams>) =>
  (params: ParamsMap<TParams>) =>
    translateFn(params);

export const useTranslatedText = <TPhrasesFn extends PhrasesFn = PhrasesFn>(
  phrases: TPhrasesFn
) => {
  const { t } = useTranslation();
  return useMemo(() => phrases(t) as ReturnType<TPhrasesFn>, [t, phrases]);
};

export const useTranslationKeys = <TPhrasesFn extends PhrasesFn = PhrasesFn>(phrases: TPhrasesFn) =>
  useMemo(() => phrases(dummyTranslateFunction) as ReturnType<TPhrasesFn>, [phrases]);
