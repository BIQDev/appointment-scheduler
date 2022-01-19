import { BiqMinsToHoursPipe } from './mins-to-hours.pipe';

describe('MinsToHoursPipe', () => {
  it('create an instance', () => {
    const pipe = new BiqMinsToHoursPipe();
    expect(pipe).toBeTruthy();
  });
});
