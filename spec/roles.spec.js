import $ from 'jquery';

import { fixture, clear } from './fixtures';

import '../src/roles';


describe('jquery', () => {
  afterEach(clear);

  it('adds `@<role>` alias for `[data-role=<role>]` selector', () => {
    fixture(`
      <b data-role="roleTest" />
      <b data-role="multi one" />
      <b data-role="multi" />
    `);

    expect($('@roleTest').length).toEqual(1);
    expect($('@multi').length).toEqual(2);
  });

  it('adds `@@<block>` alias for `[data-block=<block>]` selector', () => {
    fixture(`
      <b data-block="blockTest" />
      <b data-block="multi one" />
      <b data-block="multi" />
    `);

    expect($('@@blockTest').length).toEqual(1);
    expect($('@@multi').length).toEqual(2);
  });
});
