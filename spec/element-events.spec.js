import $ from 'jquery';
import application from 'lighty';

import { fixture, clear } from './fixtures';

import plugin from '../src/index';


describe('lighty-plugin-legacy', () => {
  beforeAll(() => {
    application.use(plugin).run();
  });

  afterEach(clear);

  describe('element events', () => {
    it('binds single callback to single element inside block', () => {
      fixture(`
        <div class="element-events-1-to-1">
          <div class="inside"></div>
        </div>
      `);

      const eventSpy = sinon.spy();

      application.component('.element-events-1-to-1', {
        'click on .inside': eventSpy,
        'custom-event on .inside': eventSpy,
      });

      application.vitalize();

      expect(eventSpy.callCount).toEqual(0);

      $('.element-events-1-to-1 .inside').trigger('click');

      expect(eventSpy.callCount).toEqual(1);

      $('.element-events-1-to-1 .inside').trigger('custom-event');

      expect(eventSpy.callCount).toEqual(2);
    });

    it('binds many events', () => {
      fixture(`
        <div class="element-events-m-to-1">
          <div class="inside"></div>
        </div>
      `);

      const eventSpy = sinon.spy();

      application.component('.element-events-m-to-1', {
        'click custom-event on .inside': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);

      $('.element-events-m-to-1 .inside').trigger('click');

      expect(eventSpy.callCount).toEqual(1);

      $('.element-events-m-to-1 .inside').trigger('custom-event');

      expect(eventSpy.callCount).toEqual(2);
    });

    it('binds callback to many elements inside block', () => {
      fixture(`
        <div class="element-events-1-to-m">
          <div class="first"></div>
          <div class="second"></div>
        </div>
      `);

      const eventSpy = sinon.spy();

      application.component('.element-events-1-to-m', {
        'click on .first, .second': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);

      $('.element-events-1-to-m .first').trigger('click');

      expect(eventSpy.callCount).toEqual(1);

      $('.element-events-1-to-m .second').trigger('click');

      expect(eventSpy.callCount).toEqual(2);
    });

    it('binds many callbacks to many elements inside block', () => {
      fixture(`
        <div class="element-events-m-to-m">
          <div class="first"></div>
          <div class="second"></div>
        </div>
      `);

      const eventSpy = sinon.spy();

      application.component('.element-events-m-to-m', {
        'click custom-event on .first, .second': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);

      $('.element-events-m-to-m .first').trigger('click');

      expect(eventSpy.callCount).toEqual(1);

      $('.element-events-m-to-m .first').trigger('custom-event');

      expect(eventSpy.callCount).toEqual(2);

      $('.element-events-m-to-m .second').trigger('click');

      expect(eventSpy.callCount).toEqual(3);

      $('.element-events-m-to-m .second').trigger('custom-event');

      expect(eventSpy.callCount).toEqual(4);
    });

    it('calls callback with component instance as context', () => {
      fixture(`
        <div class="element-events-context">
          <div class="inside"></div>
        </div>
      `);

      const eventSpy = sinon.spy();

      let component;

      application.component('.element-events-context', {
        init() {
          component = this;
        },

        'click on .inside': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);
      expect(component).toBeTruthy();

      $('.element-events-context .inside').trigger('click');

      expect(eventSpy.callCount).toEqual(1);
      expect(eventSpy.calledOn(component)).toBe(true);
    });

    it('calls callback with event object as first argument', () => {
      fixture(`
        <div class="element-events-event">
          <div class="inside"></div>
        </div>
      `);

      const eventSpy = sinon.spy();

      application.component('.element-events-event', {
        'click on .inside': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);

      $('.element-events-event .inside').trigger('click');

      expect(eventSpy.callCount).toEqual(1);
      expect(eventSpy.getCall(0).args[0] instanceof $.Event).toBe(true);
    });

    it('calls callback with event data', () => {
      fixture(`
        <div class="element-events-event-data">
          <div class="inside"></div>
        </div>
      `);

      const singleArg = { single: 'argument' };
      const multipleArgs = [{ multiple: 'arguments' }, 2];

      const eventSpy = sinon.spy();

      application.component('.element-events-event-data', {
        'single on .inside': eventSpy,
        'multiple on .inside': eventSpy,
      }).vitalize();

      expect(eventSpy.callCount).toEqual(0);

      $('.element-events-event-data .inside').trigger('single', singleArg);

      expect(eventSpy.callCount).toEqual(1);
      expect(eventSpy.getCall(0).args.slice(1)).toEqual([singleArg]);

      $('.element-events-event-data .inside').trigger('multiple', multipleArgs);

      expect(eventSpy.callCount).toEqual(2);
      expect(eventSpy.getCall(1).args.slice(1)).toEqual(multipleArgs);
    });
  });
});
