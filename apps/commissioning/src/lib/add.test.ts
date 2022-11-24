import add from '@src/lib/add';

describe('testing add', () => {
  it('should be 3', () => {
    //@ts-ignore TODO fix later
    expect(add(1, 2)).toBe(3);
  });
});
