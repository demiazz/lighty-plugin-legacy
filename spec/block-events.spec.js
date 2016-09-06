import $ from 'jquery';
import application from 'lighty';

import { fixture, clear } from './fixtures';

import plugin from '../src/index';


describe('lighty-plugin-legacy', () => {
  beforeAll(() => {
    application.use(plugin).run();
  });

  afterEach(clear);

  describe('block events', () => {
    it('binds callback to block event', () => {
      fixture('<div class="block-events"></div>');

      const eventSpy = sinon.spy();

      application.component('.block-events', {
        'on click': eventSpy,
        'on custom-event': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);

      $('.block-events').trigger('click');

      expect(eventSpy.callCount).toEqual(1);

      $('.block-events').trigger('custom-event');

      expect(eventSpy.callCount).toEqual(2);
    });

    it('binds callback to multiple block events', () => {
      fixture('<div class="multiple-block-events"></div>');

      const eventSpy = sinon.spy();

      application.component('.multiple-block-events', {
        'on click custom-event': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);

      $('.multiple-block-events').trigger('click');

      expect(eventSpy.callCount).toEqual(1);

      $('.multiple-block-events').trigger('custom-event');

      expect(eventSpy.callCount).toEqual(2);
    });

    it('checks source for block events', () => {
      fixture(`
        <div class="only-block-events">
          <div data-role="inside"></div>
        </div>
      `);

      const eventSpy = sinon.spy();

      application.component('.only-block-events', {
        'on click': eventSpy,
      }).vitalize();

      $('@inside').trigger('click');

      expect(eventSpy.callCount).toEqual(0);
    });

    it('calls callback with component instance as context', () => {
      fixture('<div class="block-events-context"></div>');

      const eventSpy = sinon.spy();

      let component;

      application.component('.block-events-context', {
        init() {
          component = this;
        },

        'on click': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);
      expect(component).toBeTruthy();

      $('.block-events-context').trigger('click');

      expect(eventSpy.callCount).toEqual(1);
      expect(eventSpy.calledOn(component)).toBe(true);
    });

    it('calls callback with event object as first argument', () => {
      fixture('<div class="block-events-event"></div>');

      const eventSpy = sinon.spy();

      application.component('.block-events-event', {
        'on click': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);

      $('.block-events-event').trigger('click');

      expect(eventSpy.callCount).toEqual(1);
      expect(eventSpy.getCall(0).args[0] instanceof $.Event).toBe(true);
    });

    it('calls callback with event data', () => {
      fixture('<div class="block-events-event-data"></div>');

      const singleArg = { single: 'argument' };
      const multipleArgs = [{ multiple: 'arguments' }, 2];

      const eventSpy = sinon.spy();

      application.component('.block-events-event-data', {
        'on single': eventSpy,
        'on multiple': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);

      $('.block-events-event-data').trigger('single', singleArg);

      expect(eventSpy.callCount).toEqual(1);
      expect(eventSpy.getCall(0).args.slice(1)).toEqual([singleArg]);

      $('.block-events-event-data').trigger('multiple', multipleArgs);

      expect(eventSpy.callCount).toEqual(2);
      expect(eventSpy.getCall(1).args.slice(1)).toEqual(multipleArgs);
    });
  });
});
