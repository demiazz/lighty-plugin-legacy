import $ from 'jquery';

import { fixture, clear } from './fixtures';

import '../src/roles';


describe('jquery', () => {
  afterEach(clear);

  it('adds `@<role>` alias for `[data-role=<role>]` selector', () => {
    fixture(`
      <div class="inside" data-role="roleTest"></div>
      <div class="inside" data-role="multi one"></div>
      <div class="inside" data-role="multi"></div>
    `);

    expect($('@roleTest').length).toEqual(1);
    expect($('@multi').length).toEqual(2);
  });

  it('adds `@@<block>` alias for `[data-block=<block>]` selector', () => {
    fixture(`
      <div data-block="blockTest"></div>
      <div data-block="multi one"></div>
      <div data-block="multi"></div>
    `);

    expect($('@@blockTest').length).toEqual(1);
    expect($('@@multi').length).toEqual(2);
  });
});
