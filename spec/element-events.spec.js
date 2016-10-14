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

  describe('element events', () => {
    it('adds support for `<event> on <selector>` pattern', () => {
      fixture(`
        <div class="element-events-1-to-1">
          <div class="inside"></div>
        </div>
      `);

      const eventSpy = jasmine.createSpy('event');

      application.component('.element-events-1-to-1', {
        'click on .inside': eventSpy,
        'custom-event on .inside': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();

      $('.element-events-1-to-1 .inside').trigger('click');

      expect(eventSpy).toHaveBeenCalledTimes(1);

      $('.element-events-1-to-1 .inside').trigger('custom-event');

      expect(eventSpy).toHaveBeenCalledTimes(2);
    });

    it('adds support for `<event>[ <event> ...] on <selector>` pattern', () => {
      fixture(`
        <div class="element-events-m-to-1">
          <div class="inside"></div>
        </div>
      `);

      const eventSpy = jasmine.createSpy('event');

      application.component('.element-events-m-to-1', {
        'click custom-event on .inside': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();

      $('.element-events-m-to-1 .inside').trigger('click');

      expect(eventSpy).toHaveBeenCalledTimes(1);

      $('.element-events-m-to-1 .inside').trigger('custom-event');

      expect(eventSpy).toHaveBeenCalledTimes(2);
    });

    it('adds support for `<event> on <selector>[, <selector> ...]` pattern', () => {
      fixture(`
        <div class="element-events-1-to-m">
          <div class="first"></div>
          <div class="second"></div>
        </div>
      `);

      const eventSpy = jasmine.createSpy('event');

      application.component('.element-events-1-to-m', {
        'click on .first, .second': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();

      $('.element-events-1-to-m .first').trigger('click');

      expect(eventSpy).toHaveBeenCalledTimes(1);

      $('.element-events-1-to-m .second').trigger('click');

      expect(eventSpy).toHaveBeenCalledTimes(2);
    });

    it('adds support for `<event>[ <event> ...] on <selector>[, <selector> ...]` pattern', () => {
      fixture(`
        <div class="element-events-m-to-m">
          <div class="first"></div>
          <div class="second"></div>
        </div>
      `);

      const eventSpy = jasmine.createSpy('event');

      application.component('.element-events-m-to-m', {
        'click custom-event on .first, .second': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();

      $('.element-events-m-to-m .first').trigger('click');

      expect(eventSpy).toHaveBeenCalledTimes(1);

      $('.element-events-m-to-m .first').trigger('custom-event');

      expect(eventSpy).toHaveBeenCalledTimes(2);

      $('.element-events-m-to-m .second').trigger('click');

      expect(eventSpy).toHaveBeenCalledTimes(3);

      $('.element-events-m-to-m .second').trigger('custom-event');

      expect(eventSpy).toHaveBeenCalledTimes(4);
    });

    it('calls handler on a component instance', () => {
      fixture(`
        <div class="element-events-context">
          <div class="inside"></div>
        </div>
      `);

      const eventSpy = jasmine.createSpy('event');

      let component;

      application.component('.element-events-context', {
        init() {
          component = this;
        },

        'click on .inside': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();
      expect(component).toBeTruthy();

      $('.element-events-context .inside').trigger('click');

      expect(eventSpy).toHaveBeenCalledTimes(1);
      expect(eventSpy).toHaveBeenCalledOn(component);
    });

    it('passes an event to a handler', () => {
      fixture(`
        <div class="element-events-event">
          <div class="inside"></div>
        </div>
      `);

      const eventSpy = jasmine.createSpy('event');

      application.component('.element-events-event', {
        'click on .inside': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();

      $('.element-events-event .inside').trigger('click');

      expect(eventSpy).toHaveBeenCalledTimes(1);
      expect(eventSpy.calls.argsFor(0)[0]).toBeInstanceOf($.Event);
    });

    it('passes an event data to a handler', () => {
      fixture(`
        <div class="element-events-event-data">
          <div class="inside"></div>
        </div>
      `);

      const singleArg = { single: 'argument' };
      const multipleArgs = [{ multiple: 'arguments' }, 2];

      const eventSpy = jasmine.createSpy('event');

      application.component('.element-events-event-data', {
        'single on .inside': eventSpy,
        'multiple on .inside': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();

      $('.element-events-event-data .inside').trigger('single', singleArg);

      expect(eventSpy).toHaveBeenCalledTimes(1);
      expect(eventSpy.calls.argsFor(0).slice(1)).toEqual([singleArg]);

      $('.element-events-event-data .inside').trigger('multiple', multipleArgs);

      expect(eventSpy).toHaveBeenCalledTimes(2);
      expect(eventSpy.calls.argsFor(1).slice(1)).toEqual(multipleArgs);
    });
  });
});
