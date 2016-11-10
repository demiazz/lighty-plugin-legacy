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

  describe('load events', () => {
    it('adds support for `load on window` pattern', (done) => {
      fixture('<div class="load-events"></div>');

      const eventSpy = jasmine.createSpy('event');

      application.component('.load-events', {
        'load on window': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();

      setTimeout(() => {
        expect(eventSpy).toHaveBeenCalledTimes(1);

        done();
      }, 10);
    });

    it('calls handler on a component instance', (done) => {
      fixture('<div class="load-events-context"></div>');

      const eventSpy = jasmine.createSpy('event');

      let component;

      application.component('.load-events-context', {
        init() {
          component = this;
        },

        'load on window': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();
      expect(component).toBeTruthy();

      setTimeout(() => {
        expect(eventSpy).toHaveBeenCalledTimes(1);
        expect(eventSpy).toHaveBeenCalledOn(component);

        done();
      }, 10);
    });

    it('passes an event to a handler', (done) => {
      fixture('<div class="load-events-event"></div>');

      const eventSpy = jasmine.createSpy('event');

      application.component('.load-events-event', {
        'load on window': eventSpy,
      }).vitalize();

      expect(eventSpy).not.toHaveBeenCalled();

      setTimeout(() => {
        expect(eventSpy).toHaveBeenCalledTimes(1);
        expect(eventSpy.calls.argsFor(0)[0]).toBeInstanceOf($.Event);

        done();
      }, 10);
    });
  });
});
