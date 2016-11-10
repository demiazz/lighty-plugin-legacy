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

  describe('find alias', () => {
    it('adds `this.$(<selector>)` alias for `this.block.find(<selector>)`', (done) => {
      fixture(`
        <div class="outside element">
        <div class="find">
          <div class="inside element" />
          <div>
            <div class="inside element" />
          </div>
        </div>
      `);

      application.component('.find', {
        init() {
          expect(this.$('.element')).toHaveLength(2);
          expect(this.$('.element').toArray()).toEqual($('.inside').toArray());

          done();
        },
      }).vitalize();
    });
  });
});
