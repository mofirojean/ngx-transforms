import { QrCodePipe } from './qr-code';

describe('QrCodePipe', () => {
  let pipe: QrCodePipe;

  beforeEach(() => {
    pipe = new QrCodePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return a data URL for a given string', async () => {
    const data = await pipe.transform('hello world');
    expect(data).toMatch(/^data:image\/png;base64,/);
  });

  it('should return an empty string if no value is provided', async () => {
    const data = await pipe.transform('');
    expect(data).toBe('');
  });
});