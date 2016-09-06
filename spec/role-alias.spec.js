import application from 'lighty';

import { fixture, clear } from './fixtures';

import plugin from '../src/index';


describe('lighty-plugin-legacy', () => {
  beforeAll(() => {
    application.use(plugin).run();
  });

  afterEach(clear);

  describe('role aliases', () => {
    it('adds `.<role>` property for each `[data-role=<role>]` element', done => {
      fixture(`
        <div data-role="single"></div>
        <div data-role="multi"></div>
        <div data-role="customRole"></div>
        <div data-role="yet-another-role"></div>
        <div class="role">
          <div data-role="single"></div>
          <div data-role="multi other"></div>
          <div data-role="multi"></div>
          <div data-role="customRole"></div>
          <div data-role="yet-another-role"></div>
          <div>
            <div data-role="single"></div>
            <div data-role="multi other"></div>
            <div data-role="multi"></div>
            <div data-role="customRole"></div>
            <div data-role="yet-another-role"></div>
          </div>
        </div>
      `);

      application.component('.role', {
        init() {
          expect(this.single.length).toEqual(2);
          expect(this.single.toArray())
            .toEqual(this.$('@single').toArray());

          expect(this.multi.length).toEqual(4);
          expect(this.multi.toArray())
            .toEqual(this.$('@multi').toArray());

          expect(this.customRole.length).toEqual(2);
          expect(this.customRole.toArray())
            .toEqual(this.$('@customRole').toArray());

          expect(this['yet-another-role'].length).toEqual(2);
          expect(this['yet-another-role'].toArray())
            .toEqual(this.$('@yet-another-role').toArray());

          done();
        },
      });

      application.vitalize();
    });

    it("doesn't override existing properties", done => {
      fixture(`
        <div class="role-no-bind">
          <div data-role="exists" />
        </div>
      `);

      application.component('.role-no-bind', {
        exists: 'string',

        init() {
          expect(this.exists).toEqual('string');

          done();
        },
      });

      application.vitalize();
    });
  });
});
