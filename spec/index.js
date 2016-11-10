import internalQuerySelector from '../src/query-selector';
import { querySelector } from '../src';


describe('exports', () => {
  it('exports `querySelector`', () => {
    expect(querySelector).toEqual(internalQuerySelector);
  });
});
