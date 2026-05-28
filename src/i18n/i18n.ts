import locale from './locales/es-AR.json';
export type I18nDict = typeof locale;
export const t = (path: string, vars?: Record<string, string | number>): string => {
  const value = path.split('.').reduce<unknown>((acc, key) => (acc as Record<string, unknown>)?.[key], locale as unknown);
  const base = typeof value === 'string' ? value : path;
  return vars ? Object.entries(vars).reduce((txt, [k, v]) => txt.replace(`{{${k}}}`, String(v)), base) : base;
};
