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
    it('adds support for `load on window` pattern', done => {
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

    it('calls handler on a component instance', done => {
      fixture('<div class="load-events-context"></div>');

      const eventSpy = sinon.spy();

      let component;

      application.component('.load-events-context', {
        init() {
          component = this;
        },

        'load on window': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);
      expect(component).toBeTruthy();

      setTimeout(() => {
        expect(eventSpy.callCount).toEqual(1);
        expect(eventSpy.calledOn(component)).toBe(true);

        done();
      }, 10);
    });

    it('passes an event to a handler', done => {
      fixture('<div class="load-events-event"></div>');

      const eventSpy = sinon.spy();

      application.component('.load-events-event', {
        'load on window': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);

      setTimeout(() => {
        expect(eventSpy.callCount).toEqual(1);
        expect(eventSpy.getCall(0).args[0] instanceof $.Event).toBe(true);

        done();
      }, 10);
    });
  });
});
