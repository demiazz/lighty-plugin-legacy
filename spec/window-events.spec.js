import $ from 'jquery';
import application from 'lighty';

import { fixture, clear } from './fixtures';

import plugin from '../src/index';


describe('lighty-plugin-legacy', () => {
  beforeAll(() => {
    application.use(plugin).run();
  });

  afterEach(clear);

  describe('window events', () => {
    it('binds callback to window event', () => {
      fixture('<div class="window-events-single"></div>');

      const domEventSpy = sinon.spy();
      const customEventSpy = sinon.spy();

      application.component('.window-events-single', {
        'click on window': domEventSpy,
        'custom-event on window': customEventSpy,
      });

      application.vitalize();

      expect(domEventSpy.callCount).toEqual(0);
      expect(customEventSpy.callCount).toEqual(0);

      $(window).trigger('click');

      expect(domEventSpy.callCount).toEqual(1);

      $(window).trigger('custom-event');

      expect(customEventSpy.callCount).toEqual(1);
    });

    it('binds callback to many window events', () => {
      fixture('<div class="window-events-multiple"></div>');

      const eventSpy = sinon.spy();

      application.component('.window-events-multiple', {
        'click custom-event on window': eventSpy,
      });

      application.vitalize();

      expect(eventSpy.callCount).toEqual(0);

      $(window).trigger('click');

      expect(eventSpy.callCount).toEqual(1);

      $(window).trigger('custom-event');

      expect(eventSpy.callCount).toEqual(2);
    });

    it('calls callback with component instance as context', done => {
      fixture('<div class="window-events-context"></div>');

      const data = 'some-data';

      application.component('.window-events-context', {
        init() {
          this.data = data;
        },

        'click on window': function handleEvent() {
          expect(this.data).toEqual(data);

          done();
        },
      });

      application.vitalize();

      $(window).trigger('click');
    });

    it('calls callback with event object as first argument', () => {
      fixture('<div class="window-events-event"></div>');

      application.component('.window-events-event', {
        'click on window': function handleEvent(e) {
          expect(e instanceof $.Event).toBe(true);
        },
      });

      application.vitalize();

      $(window).trigger('click');
    });

    it('calls callback with event data', () => {
      fixture('<div class="window-events-event-data"></div>');

      const single = { single: 'argument' };
      const multiple = [{ multiple: 'arguments' }, 2];

      const singleEvent = sinon.spy();
      const multipleEvent = sinon.spy();

      application.component('.window-events-event-data', {
        'single on window': function handleEvent(e, ...args) {
          singleEvent(...args);
        },

        'multiple on window': function handleEvent(e, ...args) {
          multipleEvent(...args);
        },
      });

      application.vitalize();

      expect(singleEvent.callCount).toEqual(0);
      expect(multipleEvent.callCount).toEqual(0);

      $(window).trigger('single', single);

      expect(singleEvent.calledWith(single)).toBe(true);

      $(window).trigger('multiple', multiple);

      expect(multipleEvent.calledWith(...multiple)).toBe(true);
    });
  });
});
