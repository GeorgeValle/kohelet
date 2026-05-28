import esAR from './locales/es-AR.json';

type LocaleDictionary = typeof esAR;
type TranslationKey = 'app.shellLabel' | 'app.editorName' | 'app.tagline' | 'app.foundationStatus';

const dictionary: LocaleDictionary = esAR;

export function t(key: TranslationKey): string {
  const value = key.split('.').reduce<unknown>((current, segment) => {
    if (typeof current !== 'object' || current === null || !(segment in current)) {
      return undefined;
    }

    return (current as Record<string, unknown>)[segment];
  }, dictionary);

  if (typeof value !== 'string') {
    throw new Error(`Missing translation key: ${key}`);
  }

  return value;
}
