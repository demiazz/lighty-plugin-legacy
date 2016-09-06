import $ from 'jquery';
import application from 'lighty';

import { fixture, clear } from './fixtures';

import plugin from '../src/index';


describe('lighty-plugin-legacy', () => {
  beforeAll(() => {
    application.use(plugin).run();
  });

  afterEach(clear);

  describe('body events', () => {
    it('binds callback to body event', () => {
      fixture('<div class="body-events-single"></div>');

      const domEventSpy = sinon.spy();
      const customEventSpy = sinon.spy();

      application.component('.body-events-single', {
        'click on body': domEventSpy,
        'custom-event on body': customEventSpy,
      });

      application.vitalize();

      expect(domEventSpy.callCount).toEqual(0);
      expect(customEventSpy.callCount).toEqual(0);

      $('body').trigger('click');

      expect(domEventSpy.callCount).toEqual(1);

      $('body').trigger('custom-event');

      expect(customEventSpy.callCount).toEqual(1);
    });

    it('binds callback to many body events', () => {
      fixture('<div class="body-events-multiple"></div>');

      const eventSpy = sinon.spy();

      application.component('.body-events-multiple', {
        'click custom-event on body': eventSpy,
      });

      application.vitalize();

      expect(eventSpy.callCount).toEqual(0);

      $('body').trigger('click');

      expect(eventSpy.callCount).toEqual(1);

      $('body').trigger('custom-event');

      expect(eventSpy.callCount).toEqual(2);
    });

    it('calls callback with component instance as context', done => {
      fixture('<div class="body-events-context"></div>');

      const data = 'some-data';

      application.component('.body-events-context', {
        init() {
          this.data = data;
        },

        'click on body': function handleEvent() {
          expect(this.data).toEqual(data);

          done();
        },
      });

      application.vitalize();

      $('body').trigger('click');
    });

    it('calls callback with event object as first argument', () => {
      fixture('<div class="body-events-event"></div>');

      application.component('.body-events-event', {
        'click on body': function handleEvent(e) {
          expect(e instanceof $.Event).toBe(true);
        },
      });

      application.vitalize();

      $('body').trigger('click');
    });

    it('calls callback with event data', () => {
      fixture('<div class="body-events-event-data"></div>');

      const single = { single: 'argument' };
      const multiple = [{ multiple: 'arguments' }, 2];

      const singleEvent = sinon.spy();
      const multipleEvent = sinon.spy();

      application.component('.body-events-event-data', {
        'single on body': function handleEvent(e, ...args) {
          singleEvent(...args);
        },

        'multiple on body': function handleEvent(e, ...args) {
          multipleEvent(...args);
        },
      });

      application.vitalize();

      expect(singleEvent.callCount).toEqual(0);
      expect(multipleEvent.callCount).toEqual(0);

      $('body').trigger('single', single);

      expect(singleEvent.calledWith(single)).toBe(true);

      $('body').trigger('multiple', multiple);

      expect(multipleEvent.calledWith(...multiple)).toBe(true);
    });
  });
});
