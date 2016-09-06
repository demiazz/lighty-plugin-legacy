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

      const eventSpy = sinon.spy();

      application.component('.body-events-single', {
        'click on body': eventSpy,
        'custom-event on body': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);

      $('body').trigger('click');

      expect(eventSpy.callCount).toEqual(1);

      $('body').trigger('custom-event');

      expect(eventSpy.callCount).toEqual(2);
    });

    it('binds callback to many body events', () => {
      fixture('<div class="body-events-multiple"></div>');

      const eventSpy = sinon.spy();

      application.component('.body-events-multiple', {
        'click custom-event on body': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);

      $('body').trigger('click');

      expect(eventSpy.callCount).toEqual(1);

      $('body').trigger('custom-event');

      expect(eventSpy.callCount).toEqual(2);
    });

    it('calls callback with component instance as context', () => {
      fixture('<div class="body-events-context"></div>');

      const eventSpy = sinon.spy();

      let component;

      application.component('.body-events-context', {
        init() {
          component = this;
        },

        'click on body': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);
      expect(component).toBeTruthy();

      $('body').trigger('click');

      expect(eventSpy.callCount).toEqual(1);
      expect(eventSpy.calledOn(component)).toBe(true);
    });

    it('calls callback with event object as first argument', () => {
      fixture('<div class="body-events-event"></div>');

      const eventSpy = sinon.spy();

      application.component('.body-events-event', {
        'click on body': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);

      $('body').trigger('click');

      expect(eventSpy.callCount).toEqual(1);
      expect(eventSpy.getCall(0).args[0] instanceof $.Event).toBe(true);
    });

    it('calls callback with event data', () => {
      fixture('<div class="block-events-event-data"></div>');

      const singleArg = { single: 'argument' };
      const multipleArgs = [{ multiple: 'arguments' }, 2];

      const eventSpy = sinon.spy();

      application.component('.block-events-event-data', {
        'single on body': eventSpy,
        'multiple on body': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);

      $('body').trigger('single', singleArg);

      expect(eventSpy.callCount).toEqual(1);
      expect(eventSpy.getCall(0).args.slice(1)).toEqual([singleArg]);

      $('body').trigger('multiple', multipleArgs);

      expect(eventSpy.callCount).toEqual(2);
      expect(eventSpy.getCall(1).args.slice(1)).toEqual(multipleArgs);
    });
  });
});
