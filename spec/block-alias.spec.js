import $ from 'jquery';
import application from 'lighty';

import { fixture, clear } from './fixtures';

import plugin from '../src/index';


describe('lighty-plugin-legacy', () => {
  beforeAll(() => {
    application.use(plugin).run();
  });

  afterEach(clear);

  describe('block alias', () => {
    it('adds `this.block` alias for `$(node)`', done => {
      fixture('<div class="bind"></div>');

      application.component('.bind', {
        init() {
          expect(this.block.length).toEqual(1);
          expect(this.block[0]).toEqual($('.bind')[0]);

          done();
        },
      }).vitalize();
    });
  });
});
