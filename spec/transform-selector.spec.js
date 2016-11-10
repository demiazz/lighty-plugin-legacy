import transformSelector from '../src/transform-selector';


describe('transform-selector', () => {
  it('transform blocks shortcuts', () => {
    const selector = '@@customBlock';
    const expected = '[data-block~="customBlock"]';

    expect(transformSelector(selector)).toEqual(expected);
  });

  it('transform multiple blocks shortcuts', () => {
    const selector = '@@firstBlock@@secondBlock';
    const expected = '[data-block~="firstBlock"][data-block~="secondBlock"]';

    expect(transformSelector(selector)).toEqual(expected);
  });

  it('transform roles shortcuts', () => {
    const selector = '@customRole';
    const expected = '[data-role~="customRole"]';

    expect(transformSelector(selector)).toEqual(expected);
  });

  it('transform multiple blocks shortcuts', () => {
    const selector = '@firstRole@secondRole';
    const expected = '[data-role~="firstRole"][data-role~="secondRole"]';

    expect(transformSelector(selector)).toEqual(expected);
  });

  it('transform blocks and roles shortcuts', () => {
    const selector = '@@customBlock, @customRole';
    const expected = '[data-block~="customBlock"], [data-role~="customRole"]';

    expect(transformSelector(selector)).toEqual(expected);
  });

  it('transform multiple blocks and roles shortcuts', () => {
    const selector = '@@customBlock@customRole';
    const expected = '[data-block~="customBlock"][data-role~="customRole"]';

    expect(transformSelector(selector)).toEqual(expected);
  });
});
