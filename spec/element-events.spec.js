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

      const domEvent = sinon.spy();
      const customEvent = sinon.spy();

      application.component('.element-events-1-to-1', {
        'click on .inside': function domEventHandler() {
          domEvent();
        },

        'custom-event on .inside': function customEventHandler() {
          customEvent();
        },
      });

      application.vitalize();

      expect(domEvent.callCount).toEqual(0);
      expect(customEvent.callCount).toEqual(0);

      $('.element-events-1-to-1 .inside').trigger('click');
      $('.element-events-1-to-1 .inside').trigger('custom-event');

      expect(domEvent.callCount).toEqual(1);
      expect(customEvent.callCount).toEqual(1);
    });

    it('binds many events', () => {
      fixture(`
        <div class="element-events-m-to-1">
          <div class="inside"></div>
        </div>
      `);

      const event = sinon.spy();

      application.component('.element-events-m-to-1', {
        'click custom-event on .inside': function handleEvents() {
          event();
        },
      });

      application.vitalize();

      expect(event.callCount).toEqual(0);

      $('.element-events-m-to-1 .inside').trigger('click');

      expect(event.callCount).toEqual(1);

      $('.element-events-m-to-1 .inside').trigger('custom-event');

      expect(event.callCount).toEqual(2);
    });

    it('binds callback to many elements inside block', () => {
      fixture(`
        <div class="element-events-1-to-m">
          <div class="first"></div>
          <div class="second"></div>
        </div>
      `);

      const event = sinon.spy();

      application.component('.element-events-1-to-m', {
        'click on .first, .second': function handleEvents() {
          event();
        },
      });

      application.vitalize();

      expect(event.callCount).toEqual(0);

      $('.element-events-1-to-m .first').trigger('click');

      expect(event.callCount).toEqual(1);

      $('.element-events-1-to-m .second').trigger('click');

      expect(event.callCount).toEqual(2);
    });

    it('binds many callbacks to many elements inside block', () => {
      fixture(`
        <div class="element-events-m-to-m">
          <div class="first"></div>
          <div class="second"></div>
        </div>
      `);

      const event = sinon.spy();

      application.component('.element-events-m-to-m', {
        'click custom-event on .first, .second': function handleEvents() {
          event();
        },
      });

      application.vitalize();

      expect(event.callCount).toEqual(0);

      $('.element-events-m-to-m .first').trigger('click');

      expect(event.callCount).toEqual(1);

      $('.element-events-m-to-m .first').trigger('custom-event');

      expect(event.callCount).toEqual(2);

      $('.element-events-m-to-m .second').trigger('click');

      expect(event.callCount).toEqual(3);

      $('.element-events-m-to-m .second').trigger('custom-event');

      expect(event.callCount).toEqual(4);
    });

    it('calls callback with component instance as context', done => {
      fixture(`
        <div class="element-events-context">
          <div class="inside"></div>
        </div>
      `);

      const data = 'some-data';

      application.component('.element-events-context', {
        init() {
          this.data = data;
        },

        'click on .inside': function handleEvent() {
          expect(this.data).toEqual(data);

          done();
        },
      });

      application.vitalize();

      $('.element-events-context .inside').trigger('click');
    });

    it('calls callback with event object as first argument', () => {
      fixture(`
        <div class="element-events-event">
          <div class="inside"></div>
        </div>
      `);

      application.component('.element-events-event', {
        'click on .inside': function handleEvent(e) {
          expect(e instanceof $.Event).toBe(true);
        },
      });

      application.vitalize();

      $('.element-events-event .inside').trigger('click');
    });

    it('calls callback with event data', () => {
      fixture(`
        <div class="element-events-event-data">
          <div class="single"></div>
          <div class="multiple"></div>
        </div>
      `);

      const single = { single: 'argument' };
      const multiple = [{ multiple: 'arguments' }, 2];

      const singleEvent = sinon.spy();
      const multipleEvent = sinon.spy();

      application.component('.element-events-event-data', {
        'click on .single': function handleEvent(e, ...args) {
          singleEvent(...args);
        },

        'click on .multiple': function handleEvent(e, ...args) {
          multipleEvent(...args);
        },
      });

      application.vitalize();

      expect(singleEvent.callCount).toEqual(0);
      expect(multipleEvent.callCount).toEqual(0);

      $('.element-events-event-data .single').trigger('click', single);

      expect(singleEvent.calledWith(single)).toBe(true);

      $('.element-events-event-data .multiple').trigger('click', multiple);

      expect(multipleEvent.calledWith(...multiple)).toBe(true);
    });
  });
});
