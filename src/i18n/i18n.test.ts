import { expect,it } from 'vitest';import { t } from './i18n';it('resolves key',()=>expect(t('app.title')).toBe('Kohelet'));
