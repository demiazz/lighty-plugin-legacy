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

  describe('window events', () => {
    it('adds support for `<event> on window` pattern', () => {
      fixture('<div class="window-events-single"></div>');

      const eventSpy = jasmine.createSpy('event');

      application.component('.window-events-single', {
        'click on window': eventSpy,
        'custom-event on window': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();

      $(window).trigger('click');

      expect(eventSpy).toHaveBeenCalledTimes(1);

      $(window).trigger('custom-event');

      expect(eventSpy).toHaveBeenCalledTimes(2);
    });

    it('adds support for `<event>[ <event> ...] on window` pattern', () => {
      fixture('<div class="window-events-multiple"></div>');

      const eventSpy = jasmine.createSpy('event');

      application.component('.window-events-multiple', {
        'click custom-event on window': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();

      $(window).trigger('click');

      expect(eventSpy).toHaveBeenCalledTimes(1);

      $(window).trigger('custom-event');

      expect(eventSpy).toHaveBeenCalledTimes(2);
    });

    it('calls handler on a component instance', () => {
      fixture('<div class="window-events-context"></div>');

      const eventSpy = jasmine.createSpy('event');

      let component;

      application.component('.window-events-context', {
        init() {
          component = this;
        },

        'click on window': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();
      expect(component).toBeTruthy();

      $(window).trigger('click');

      expect(eventSpy).toHaveBeenCalledTimes(1);
      expect(eventSpy).toHaveBeenCalledOn(component);
    });

    it('passes an event to a handler', () => {
      fixture('<div class="window-events-event"></div>');

      const eventSpy = jasmine.createSpy('event');

      application.component('.window-events-event', {
        'click on window': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();

      $(window).trigger('click');

      expect(eventSpy).toHaveBeenCalledTimes(1);
      expect(eventSpy.calls.argsFor(0)[0]).toBeInstanceOf($.Event);
    });

    it('passes an event data to a handler', () => {
      fixture('<div class="block-events-event-data"></div>');

      const singleArg = { single: 'argument' };
      const multipleArgs = [{ multiple: 'arguments' }, 2];

      const eventSpy = jasmine.createSpy('event');

      application.component('.block-events-event-data', {
        'single on window': eventSpy,
        'multiple on window': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();

      $(window).trigger('single', singleArg);

      expect(eventSpy).toHaveBeenCalledTimes(1);
      expect(eventSpy.calls.argsFor(0).slice(1)).toEqual([singleArg]);

      $(window).trigger('multiple', multipleArgs);

      expect(eventSpy).toHaveBeenCalledTimes(2);
      expect(eventSpy.calls.argsFor(1).slice(1)).toEqual(multipleArgs);
    });
  });
});
