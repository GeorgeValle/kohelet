import esAR from './locales/es-AR.json';

type TranslationParams = Record<string, string | number>;

const dictionary = esAR;

export function t(key: string, params: TranslationParams = {}): string {
  const value = key.split('.').reduce<unknown>((current, segment) => {
    if (typeof current !== 'object' || current === null || !(segment in current)) {
      return undefined;
    }

    return (current as Record<string, unknown>)[segment];
  }, dictionary);

  if (typeof value !== 'string') {
    throw new Error(`Missing translation key: ${key}`);
  }

  return Object.entries(params).reduce(
    (translation, [paramName, paramValue]) => translation.replaceAll(`{${paramName}}`, String(paramValue)),
    value,
  );
}
