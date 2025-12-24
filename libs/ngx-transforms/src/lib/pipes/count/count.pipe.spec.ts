import { CountPipe } from './count.pipe';

describe('CountPipe', () => {
  let pipe: CountPipe;

  beforeEach(() => {
    pipe = new CountPipe();
  });

  it('should return the length of an array', () => {
    expect(pipe.transform([1, 2, 3])).toBe(3);
  });

  it('should return the length of a string', () => {
    expect(pipe.transform('hello')).toBe(5);
  });

  it('should return 0 for an empty array', () => {
    expect(pipe.transform([])).toBe(0);
  });

  it('should return 0 for an empty string', () => {
    expect(pipe.transform('')).toBe(0);
  });
});
