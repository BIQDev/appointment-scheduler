import { BiqJsonSerializePipe } from './json-serialize.pipe';

describe('JsonSerializePipe', () => {
  it('create an instance', () => {
    const pipe = new BiqJsonSerializePipe();
    expect(pipe).toBeTruthy();
  });
});
