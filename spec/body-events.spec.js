import $ from 'jquery';
import application from 'lighty';

import { fixture, clear, matchers } from './helpers';

import plugin from '../src/index';


describe('lighty-plugin-legacy', () => {
  beforeAll(() => {
    application.use(plugin).run();
  });

  beforeEach(() => {
    window.jasmine.addMatchers(matchers);
  });

  afterEach(clear);

  describe('body events', () => {
    it('adds support for `<event> on body` pattern', () => {
      fixture('<div class="body-events-single"></div>');

      const eventSpy = jasmine.createSpy('event');

      application.component('.body-events-single', {
        'click on body': eventSpy,
        'custom-event on body': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();

      $('body').trigger('click');

      expect(eventSpy).toHaveBeenCalledTimes(1);

      $('body').trigger('custom-event');

      expect(eventSpy).toHaveBeenCalledTimes(2);
    });

    it('adds support for `<event>[ <event> ...] on body` pattern', () => {
      fixture('<div class="body-events-multiple"></div>');

      const eventSpy = jasmine.createSpy('event');

      application.component('.body-events-multiple', {
        'click custom-event on body': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();

      $('body').trigger('click');

      expect(eventSpy).toHaveBeenCalledTimes(1);

      $('body').trigger('custom-event');

      expect(eventSpy).toHaveBeenCalledTimes(2);
    });

    it('calls handler on a component instance', () => {
      fixture('<div class="body-events-context"></div>');

      const eventSpy = jasmine.createSpy('event');

      let component;

      application.component('.body-events-context', {
        init() {
          component = this;
        },

        'click on body': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();
      expect(component).toBeTruthy();

      $('body').trigger('click');

      expect(eventSpy).toHaveBeenCalledTimes(1);
      expect(eventSpy).toHaveBeenCalledOn(component);
    });

    it('passes an event to a handler', () => {
      fixture('<div class="body-events-event"></div>');

      const eventSpy = jasmine.createSpy('event');

      application.component('.body-events-event', {
        'click on body': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();

      $('body').trigger('click');

      expect(eventSpy).toHaveBeenCalledTimes(1);
      expect(eventSpy.calls.argsFor(0)[0]).toBeInstanceOf($.Event);
    });

    it('passes an event data to a handler', () => {
      fixture('<div class="block-events-event-data"></div>');

      const singleArg = { single: 'argument' };
      const multipleArgs = [{ multiple: 'arguments' }, 2];

      const eventSpy = jasmine.createSpy('event');

      application.component('.block-events-event-data', {
        'single on body': eventSpy,
        'multiple on body': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();

      $('body').trigger('single', singleArg);

      expect(eventSpy).toHaveBeenCalledTimes(1);
      expect(eventSpy.calls.argsFor(0).slice(1)).toEqual([singleArg]);

      $('body').trigger('multiple', multipleArgs);

      expect(eventSpy).toHaveBeenCalledTimes(2);
      expect(eventSpy.calls.argsFor(1).slice(1)).toEqual(multipleArgs);
    });
  });
});
