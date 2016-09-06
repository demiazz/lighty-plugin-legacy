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

      const eventSpy = sinon.spy();

      application.component('.window-events-single', {
        'click on window': eventSpy,
        'custom-event on window': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);

      $(window).trigger('click');

      expect(eventSpy.callCount).toEqual(1);

      $(window).trigger('custom-event');

      expect(eventSpy.callCount).toEqual(2);
    });

    it('binds callback to many window events', () => {
      fixture('<div class="window-events-multiple"></div>');

      const eventSpy = sinon.spy();

      application.component('.window-events-multiple', {
        'click custom-event on window': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);

      $(window).trigger('click');

      expect(eventSpy.callCount).toEqual(1);

      $(window).trigger('custom-event');

      expect(eventSpy.callCount).toEqual(2);
    });

    it('calls callback with component instance as context', () => {
      fixture('<div class="window-events-context"></div>');

      const eventSpy = sinon.spy();

      let component;

      application.component('.window-events-context', {
        init() {
          component = this;
        },

        'click on window': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);
      expect(component).toBeTruthy();

      $(window).trigger('click');

      expect(eventSpy.callCount).toEqual(1);
      expect(eventSpy.calledOn(component)).toBe(true);
    });

    it('calls callback with event object as first argument', () => {
      fixture('<div class="window-events-event"></div>');

      const eventSpy = sinon.spy();

      application.component('.window-events-event', {
        'click on window': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);

      $(window).trigger('click');

      expect(eventSpy.callCount).toEqual(1);
      expect(eventSpy.getCall(0).args[0] instanceof $.Event).toBe(true);
    });

    it('calls callback with event data', () => {
      fixture('<div class="block-events-event-data"></div>');

      const singleArg = { single: 'argument' };
      const multipleArgs = [{ multiple: 'arguments' }, 2];

      const eventSpy = sinon.spy();

      application.component('.block-events-event-data', {
        'single on window': eventSpy,
        'multiple on window': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);

      $(window).trigger('single', singleArg);

      expect(eventSpy.callCount).toEqual(1);
      expect(eventSpy.getCall(0).args.slice(1)).toEqual([singleArg]);

      $(window).trigger('multiple', multipleArgs);

      expect(eventSpy.callCount).toEqual(2);
      expect(eventSpy.getCall(1).args.slice(1)).toEqual(multipleArgs);
    });
  });
});
