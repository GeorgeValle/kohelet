import { describe, expect, it } from 'vitest';
import { wordCountFromText } from './wordCount';

describe('wordCountFromText', () => {
  it('returns zero for empty or blank strings', () => {
    expect(wordCountFromText('')).toBe(0);
    expect(wordCountFromText('   \n\t  ')).toBe(0);
  });

  it('does not inflate counts for multiple spaces', () => {
    expect(wordCountFromText('una   escena\ncon\tpausas')).toBe(4);
  });

  it('counts normal words', () => {
    expect(wordCountFromText('Kohelet protege el texto')).toBe(4);
  });
});
