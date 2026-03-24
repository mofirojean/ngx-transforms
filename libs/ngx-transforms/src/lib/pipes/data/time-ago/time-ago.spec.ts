import { TimeAgoPipePipe } from './time-ago';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TimeAgoPipePipe', () => {
  let pipe: TimeAgoPipePipe;

  beforeEach(() => {
    pipe = new TimeAgoPipePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  // --- Null / empty / invalid guards ---

  it('should return empty string for null', () => {
    expect(pipe.transform(null as unknown as Date)).toBe('');
  });

  it('should return empty string for undefined', () => {
    expect(pipe.transform(undefined as unknown as Date)).toBe('');
  });

  it('should return empty string for empty string', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should return empty string for invalid date string', () => {
    expect(pipe.transform('not-a-date')).toBe('');
  });

  // --- Time units (past) ---

  it('should return seconds ago for recent dates', () => {
    const thirtySecondsAgo = new Date(Date.now() - 30_000);
    const result = pipe.transform(thirtySecondsAgo);
    expect(result).toContain('second');
  });

  it('should return minutes ago', () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60_000);
    const result = pipe.transform(fiveMinutesAgo);
    expect(result).toContain('minute');
  });

  it('should return hours ago', () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 3_600_000);
    const result = pipe.transform(threeHoursAgo);
    expect(result).toContain('hour');
  });

  it('should return days ago', () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 86_400_000);
    const result = pipe.transform(twoDaysAgo);
    expect(result).toContain('day');
  });

  it('should return weeks ago', () => {
    const tenDaysAgo = new Date(Date.now() - 10 * 86_400_000);
    const result = pipe.transform(tenDaysAgo);
    expect(result).toContain('week');
  });

  it('should return months ago', () => {
    const sixtyDaysAgo = new Date(Date.now() - 60 * 86_400_000);
    const result = pipe.transform(sixtyDaysAgo);
    expect(result).toContain('month');
  });

  it('should return years ago', () => {
    const fourHundredDaysAgo = new Date(Date.now() - 400 * 86_400_000);
    const result = pipe.transform(fourHundredDaysAgo);
    expect(result).toContain('year');
  });

  // --- Input types ---

  it('should accept a Date object', () => {
    const date = new Date(Date.now() - 60_000);
    const result = pipe.transform(date);
    expect(result).toContain('minute');
  });

  it('should accept a number (timestamp)', () => {
    const timestamp = Date.now() - 60_000;
    const result = pipe.transform(timestamp);
    expect(result).toContain('minute');
  });

  it('should accept an ISO date string', () => {
    const isoString = new Date(Date.now() - 60_000).toISOString();
    const result = pipe.transform(isoString);
    expect(result).toContain('minute');
  });

  // --- Future dates ---

  it('should handle future dates', () => {
    const fiveMinutesFromNow = new Date(Date.now() + 5 * 60_000);
    const result = pipe.transform(fiveMinutesFromNow);
    expect(result).toContain('in');
    expect(result).toContain('minute');
  });

  // --- Localization ---

  it('should return Spanish for locale "es"', () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60_000);
    const result = pipe.transform(fiveMinutesAgo, 'es');
    expect(result).toContain('hace');
    expect(result).toContain('minuto');
  });

  it('should return French for locale "fr"', () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60_000);
    const result = pipe.transform(fiveMinutesAgo, 'fr');
    expect(result).toContain('il y a');
    expect(result).toContain('minute');
  });

  it('should return German for locale "de"', () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 3_600_000);
    const result = pipe.transform(threeHoursAgo, 'de');
    expect(result).toContain('vor');
    expect(result).toContain('Stunden');
  });

  // --- numeric: 'auto' behavior ---

  it('should return "yesterday" for exactly 1 day ago', () => {
    const oneDayAgo = new Date(Date.now() - 86_400_000);
    const result = pipe.transform(oneDayAgo);
    expect(result).toBe('yesterday');
  });

  it('should return "last week" for exactly 7 days ago', () => {
    const oneWeekAgo = new Date(Date.now() - 7 * 86_400_000);
    const result = pipe.transform(oneWeekAgo);
    expect(result).toBe('last week');
  });

  // --- Caching ---

  it('should reuse cached formatter for same locale', () => {
    const date1 = new Date(Date.now() - 60_000);
    const date2 = new Date(Date.now() - 120_000);
    const result1 = pipe.transform(date1, 'en');
    const result2 = pipe.transform(date2, 'en');
    expect(result1).toContain('minute');
    expect(result2).toContain('minute');
  });

  it('should update formatter when locale changes', () => {
    const date = new Date(Date.now() - 5 * 60_000);
    const english = pipe.transform(date, 'en');
    const spanish = pipe.transform(date, 'es');
    expect(english).not.toBe(spanish);
    expect(english).toContain('minute');
    expect(spanish).toContain('minuto');
  });
});
