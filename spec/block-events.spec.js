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
      fixture(`
        <div class="block-events"></div>
      `);

      const params = [];

      application.component('.block-events', {
        'on my-event': function handleEvent(e, param) {
          params.push(param);
        },
      });

      application.vitalize();

      $('.block-events').trigger('my-event', 'my-param');

      expect(params).toEqual(['my-param']);
    });

    it('binds callback to multiple block events', () => {
      fixture(`
        <div class="multiple-block-events"></div>
      `);

      const params = [];

      application.component('.multiple-block-events', {
        'on first-event second-event': function handleEvent(e, param) {
          params.push(param);
        },
      });

      application.vitalize();

      $('.multiple-block-events').trigger('first-event', 'first-param');
      $('.multiple-block-events').trigger('second-event', 'second-param');

      expect(params).toEqual(['first-param', 'second-param']);
    });

    it('checks source for block events', () => {
      fixture(`
        <div class="only-block-events">
          <div data-role="inside"></div>
        </div>
      `);

      const params = [];

      application.component('.only-block-events', {
        'on my-event': function handleEvent(e, param) {
          params.push(param);
        },
      });

      application.vitalize();

      $('@inside').trigger('my-event', 'my-param');

      expect(params).toEqual([]);
    });

    it('calls callback with component instance as context', done => {
      fixture('<div class="block-events-context"></div>');

      const data = 'some-data';

      application.component('.block-events-context', {
        init() {
          this.data = data;
        },

        'on click': function handleEvent() {
          expect(this.data).toEqual(data);

          done();
        },
      });

      application.vitalize();

      $('.block-events-context').trigger('click');
    });

    it('calls callback with event object as first argument', () => {
      fixture('<div class="block-events-event"></div>');

      application.component('.block-events-event', {
        'on click': function handleEvent(e) {
          expect(e instanceof $.Event).toBe(true);
        },
      });

      application.vitalize();

      $('.block-events-event').trigger('click');
    });

    it('calls callback with event data', () => {
      fixture('<div class="block-events-event-data"></div>');

      const single = { single: 'argument' };
      const multiple = [{ multiple: 'arguments' }, 2];

      const singleEvent = sinon.spy();
      const multipleEvent = sinon.spy();

      application.component('.block-events-event-data', {
        'on single': function handleEvent(e, ...args) {
          singleEvent(...args);
        },

        'on multiple': function handleEvent(e, ...args) {
          multipleEvent(...args);
        },
      });

      application.vitalize();

      expect(singleEvent.callCount).toEqual(0);
      expect(multipleEvent.callCount).toEqual(0);

      $('.block-events-event-data').trigger('single', single);

      expect(singleEvent.calledWith(single)).toBe(true);

      $('.block-events-event-data').trigger('multiple', multiple);

      expect(multipleEvent.calledWith(...multiple)).toBe(true);
    });
  });
});
