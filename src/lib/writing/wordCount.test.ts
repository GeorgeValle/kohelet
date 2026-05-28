import { expect,it } from 'vitest';import { wordCountFromText } from './wordCount';it('counts words',()=>expect(wordCountFromText('hola mundo')).toBe(2));
