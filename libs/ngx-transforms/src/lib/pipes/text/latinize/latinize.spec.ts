import { LatinizePipe } from './latinize';
import { describe, it, expect, beforeEach } from 'vitest';

describe('LatinizePipe', () => {
  let pipe: LatinizePipe;

  beforeEach(() => {
    pipe = new LatinizePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty for null', () => {
    expect(pipe.transform(null as unknown as string)).toBe('');
  });

  it('should return empty for undefined', () => {
    expect(pipe.transform(undefined as unknown as string)).toBe('');
  });

  it('should return empty for non-string', () => {
    expect(pipe.transform(42 as unknown as string)).toBe('');
  });

  it('should return empty string unchanged', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should leave ASCII text unchanged', () => {
    expect(pipe.transform('Hello World')).toBe('Hello World');
  });

  it('should strip acute accents', () => {
    expect(pipe.transform('café')).toBe('cafe');
  });

  it('should strip grave accents', () => {
    expect(pipe.transform('à la carte')).toBe('a la carte');
  });

  it('should strip circumflex', () => {
    expect(pipe.transform('crème brûlée')).toBe('creme brulee');
  });

  it('should strip diaeresis', () => {
    expect(pipe.transform('naïve')).toBe('naive');
  });

  it('should strip tilde', () => {
    expect(pipe.transform('piñata')).toBe('pinata');
  });

  it('should preserve casing', () => {
    expect(pipe.transform('Café')).toBe('Cafe');
  });

  it('should preserve uppercase accents', () => {
    expect(pipe.transform('ÉTUDES')).toBe('ETUDES');
  });

  it('should preserve spaces', () => {
    expect(pipe.transform('Café  Résumé')).toBe('Cafe  Resume');
  });

  it('should preserve punctuation', () => {
    expect(pipe.transform('Café, voilà!')).toBe('Cafe, voila!');
  });

  it('should handle mixed accented words', () => {
    expect(pipe.transform('naïve résumé with café')).toBe('naive resume with cafe');
  });

  it('should handle Spanish characters', () => {
    expect(pipe.transform('El niño está aquí')).toBe('El nino esta aqui');
  });

  it('should handle German umlauts', () => {
    expect(pipe.transform('schöne Grüße')).toBe('schone Gruße');
  });

  it('should handle all vowel accents', () => {
    expect(pipe.transform('áéíóúàèìòùâêîôûäëïöü')).toBe('aeiouaeiouaeiouaeiou');
  });

  it('should not mutate the original string', () => {
    const original = 'Café';
    pipe.transform(original);
    expect(original).toBe('Café');
  });
});