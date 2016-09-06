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
      });
    });

    it('calls callback with event object as first argument', done => {
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
      });
    });
  });
});
