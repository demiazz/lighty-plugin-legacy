import $ from 'jquery';
import application from 'lighty';

import { fixture, clear } from './fixtures';

import plugin from '../src/index';


describe('lighty-plugin-legacy', () => {
  beforeAll(() => {
    application.use(plugin).run();
  });

  afterEach(clear);

  describe('load events', () => {
    it('binds callback to load event on window', done => {
      fixture('<div class="load-events"></div>');

      const eventSpy = sinon.spy();

      application.component('.load-events', {
        'load on window': eventSpy,
      });

      application.vitalize();

      expect(eventSpy.callCount).toEqual(0);

      setTimeout(() => {
        expect(eventSpy.callCount).toEqual(1);

        done();
      }, 10);
    });

    it('calls callback with component instance as context', done => {
      fixture('<div class="load-events-context"></div>');

      const data = 'some-data';

      application.component('.load-events-context', {
        init() {
          this.data = data;
        },

        'load on window': function handleEvent() {
          expect(this.data).toEqual(data);

          done();
        },
      });

      application.vitalize();
    });

    it('calls callback with event object as first argument', () => {
      fixture('<div class="load-events-event"></div>');

      application.component('.load-events-event', {
        'load on window': function handleEvent(e) {
          expect(e instanceof $.Event).toBe(true);
        },
      });

      application.vitalize();
    });
  });
});
