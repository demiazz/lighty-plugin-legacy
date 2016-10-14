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

  describe('block events', () => {
    it('adds support for `on <event>` pattern`', () => {
      fixture('<div class="block-events"></div>');

      const eventSpy = jasmine.createSpy('event');

      application.component('.block-events', {
        'on click': eventSpy,
        'on custom-event': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();

      $('.block-events').trigger('click');

      expect(eventSpy).toHaveBeenCalledTimes(1);

      $('.block-events').trigger('custom-event');

      expect(eventSpy).toHaveBeenCalledTimes(2);
    });

    it('adds support for `on <event>[ <event> ...]` pattern`', () => {
      fixture('<div class="multiple-block-events"></div>');

      const eventSpy = jasmine.createSpy('event');

      application.component('.multiple-block-events', {
        'on click custom-event': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();

      $('.multiple-block-events').trigger('click');

      expect(eventSpy).toHaveBeenCalledTimes(1);

      $('.multiple-block-events').trigger('custom-event');

      expect(eventSpy).toHaveBeenCalledTimes(2);
    });

    it("calls handler only when a block is event's target", () => {
      fixture(`
        <div class="only-block-events">
          <div data-role="inside"></div>
        </div>
      `);

      const eventSpy = jasmine.createSpy('event');

      application.component('.only-block-events', {
        'on click': eventSpy,
      }).vitalize();

      $('@inside').trigger('click');

      expect(eventSpy).not.toHaveBeenCalled();
    });

    it('calls handler on a component instance', () => {
      fixture('<div class="block-events-context"></div>');

      const eventSpy = jasmine.createSpy('event');

      let component;

      application.component('.block-events-context', {
        init() {
          component = this;
        },

        'on click': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();
      expect(component).toBeTruthy();

      $('.block-events-context').trigger('click');

      expect(eventSpy).toHaveBeenCalledTimes(1);
      expect(eventSpy).toHaveBeenCalledOn(component);
    });

    it('passes an event to a handler', () => {
      fixture('<div class="block-events-event"></div>');

      const eventSpy = jasmine.createSpy();

      application.component('.block-events-event', {
        'on click': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();

      $('.block-events-event').trigger('click');

      expect(eventSpy).toHaveBeenCalledTimes(1);
      expect(eventSpy.calls.argsFor(0)[0]).toBeInstanceOf($.Event);
    });

    it('passes an event data to a handler', () => {
      fixture('<div class="block-events-event-data"></div>');

      const singleArg = { single: 'argument' };
      const multipleArgs = [{ multiple: 'arguments' }, 2];

      const eventSpy = jasmine.createSpy('event');

      application.component('.block-events-event-data', {
        'on single': eventSpy,
        'on multiple': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();

      $('.block-events-event-data').trigger('single', singleArg);

      expect(eventSpy).toHaveBeenCalledTimes(1);
      expect(eventSpy.calls.argsFor(0).slice(1)).toEqual([singleArg]);

      $('.block-events-event-data').trigger('multiple', multipleArgs);

      expect(eventSpy).toHaveBeenCalledTimes(2);
      expect(eventSpy.calls.argsFor(1).slice(1)).toEqual(multipleArgs);
    });
  });
});
