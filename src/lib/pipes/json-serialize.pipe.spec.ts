import { JsonSerializePipe } from './json-serialize.pipe';

describe('JsonSerializePipe', () => {
  it('create an instance', () => {
    const pipe = new JsonSerializePipe();
    expect(pipe).toBeTruthy();
  });
});
