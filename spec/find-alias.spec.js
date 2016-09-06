import $ from 'jquery';
import application from 'lighty';

import { fixture, clear } from './fixtures';

import plugin from '../src/index';


describe('lighty-plugin-legacy', () => {
  beforeAll(() => {
    application.use(plugin).run();
  });

  afterEach(clear);

  describe('find alias', () => {
    it('bind `$(node).find` to `this.$`', done => {
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
          expect(this.$('.element').length).toEqual(2);
          expect(this.$('.element').toArray()).toEqual($('.inside').toArray());

          done();
        },
      });

      application.vitalize();
    });
  });
});