import $ from 'jquery';
import { create } from 'lighty';

import { fixture, clear, matchers } from './helpers';

import plugin from '../src/index';


describe('lighty-plugin-legacy', () => {
  let application;

  beforeAll(() => {
    application = create({ plugins: [plugin] });
  });

  beforeEach(() => {
    window.jasmine.addMatchers(matchers);
  });

  afterEach(clear);

  describe('block alias', () => {
    it('adds `this.block` alias for `$(node)`', (done) => {
      fixture('<div class="bind"></div>');

      application.component('.bind', {
        init() {
          expect(this.block).toHaveLength(1);
          expect(this.block[0]).toEqual($('.bind')[0]);

          done();
        },
      }).vitalize();
    });
  });
});
