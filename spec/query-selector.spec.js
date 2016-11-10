/* eslint no-unused-expressions: 0 */

import $ from 'jquery';

import querySelector from '../src/query-selector';

import { fixture, clear, matchers } from './helpers';


describe('querySelector', () => {
  beforeEach(() => {
    window.jasmine.addMatchers(matchers);
  });

  afterEach(clear);

  describe('HTMLElement instance given as a tree', () => {
    it('select all children elements which matched by selector', () => {
      const treeClass = 'tree';
      const nodeClass = 'node';

      fixture(`
        <div class="${treeClass}">
          <div class="${nodeClass}"></div>
        </div>
      `);

      const tree = document.querySelector(`.${treeClass}`);

      const expectedClass = 'is-matched';

      querySelector(tree, `.${nodeClass}`).forEach((node) => {
        node.className = `${node.className} ${expectedClass}`;
      });

      expect(`.${nodeClass}`).toHaveCSSClass(expectedClass);
    });

    it('select tree element if matched by selector', () => {
      const treeClass = 'tree';

      fixture(`<div class="${treeClass}"></div>`);

      const expectedClass = 'is-matched';

      const tree = document.querySelector(`.${treeClass}`);

      querySelector(tree, `.${treeClass}`).forEach((node) => {
        node.className = `${node.className} ${expectedClass}`;
      });

      expect(`.${treeClass}`).toHaveCSSClass(expectedClass);
    });
  });

  describe('NodeList instance given as a tree', () => {
    it('select all children elements which matched by selector', () => {
      const treeClass = 'tree';
      const nodeClass = 'node';

      fixture(`
        <div class="${treeClass}">
          <div class="${nodeClass}"></div>
        </div>
        <div class="${treeClass}">
          <div class="${nodeClass}"></div>
        </div>
        <div class="${treeClass}">
          <div class="${nodeClass}"></div>
        </div>
      `);

      const trees = document.querySelectorAll(`.${treeClass}`);

      const expectedClass = 'is-matched';

      querySelector(trees, `.${nodeClass}`).forEach((node) => {
        node.className = `${node.className} ${expectedClass}`;
      });

      expect(`.${nodeClass}`).toHaveCSSClass(expectedClass);
    });

    it('select each tree element if matched by selector', () => {
      const treeClass = 'tree';

      fixture(`
        <div class="${treeClass}"></div>
        <div class="${treeClass}"></div>
        <div class="${treeClass}"></div>
      `);

      const expectedClass = 'is-matched';

      const trees = document.querySelectorAll(`.${treeClass}`);

      querySelector(trees, `.${treeClass}`).forEach((node) => {
        node.className = `${node.className} ${expectedClass}`;
      });

      expect(`.${treeClass}`).toHaveCSSClass(expectedClass);
    });
  });

  describe('array of HTMLElement instances given as a tree', () => {
    it('select all children elements which matched by selector', () => {
      const treeClass = 'tree';
      const nodeClass = 'node';

      fixture(`
        <div class="${treeClass}">
          <div class="${nodeClass}"></div>
        </div>
        <div class="${treeClass}">
          <div class="${nodeClass}"></div>
        </div>
        <div class="${treeClass}">
          <div class="${nodeClass}"></div>
        </div>
      `);

      const trees = [].slice.call(document.querySelectorAll(`.${treeClass}`));

      const expectedClass = 'is-matched';

      querySelector(trees, `.${nodeClass}`).forEach((node) => {
        node.className = `${node.className} ${expectedClass}`;
      });

      expect(`.${nodeClass}`).toHaveCSSClass(expectedClass);
    });

    it('select each tree element if matched by selector', () => {
      const treeClass = 'tree';

      fixture(`
        <div class="${treeClass}"></div>
        <div class="${treeClass}"></div>
        <div class="${treeClass}"></div>
      `);

      const expectedClass = 'is-matched';

      const trees = [].slice.call(document.querySelectorAll(`.${treeClass}`));

      querySelector(trees, `.${treeClass}`).forEach((node) => {
        node.className = `${node.className} ${expectedClass}`;
      });

      expect(`.${treeClass}`).toHaveCSSClass(expectedClass);
    });
  });

  describe('jQuery object given as a tree', () => {
    it('select all children elements which matched by selector', () => {
      const treeClass = 'tree';
      const nodeClass = 'node';

      fixture(`
        <div class="${treeClass}">
          <div class="${nodeClass}"></div>
        </div>
        <div class="${treeClass}">
          <div class="${nodeClass}"></div>
        </div>
        <div class="${treeClass}">
          <div class="${nodeClass}"></div>
        </div>
      `);

      const trees = $(`.${treeClass}`);

      const expectedClass = 'is-matched';

      querySelector(trees, `.${nodeClass}`).forEach((node) => {
        node.className = `${node.className} ${expectedClass}`;
      });

      expect(`.${nodeClass}`).toHaveCSSClass(expectedClass);
    });

    it('select each tree element if matched by selector', () => {
      const treeClass = 'tree';

      fixture(`
        <div class="${treeClass}"></div>
        <div class="${treeClass}"></div>
        <div class="${treeClass}"></div>
      `);

      const expectedClass = 'is-matched';

      const trees = $(`.${treeClass}`);

      querySelector(trees, `.${treeClass}`).forEach((node) => {
        node.className = `${node.className} ${expectedClass}`;
      });

      expect(`.${treeClass}`).toHaveCSSClass(expectedClass);
    });
  });

  describe('selector given as a tree', () => {
    it('select all children elements which matched by selector', () => {
      const treeClass = 'tree';
      const nodeClass = 'node';

      fixture(`
        <div class="${treeClass}">
          <div class="${nodeClass}"></div>
        </div>
        <div class="${treeClass}">
          <div class="${nodeClass}"></div>
        </div>
        <div class="${treeClass}">
          <div class="${nodeClass}"></div>
        </div>
      `);

      const expectedClass = 'is-matched';

      querySelector(`.${treeClass}`, `.${nodeClass}`).forEach((node) => {
        node.className = `${node.className} ${expectedClass}`;
      });

      expect(`.${nodeClass}`).toHaveCSSClass(expectedClass);
    });

    it('select each tree element if matched by selector', () => {
      const treeClass = 'tree';

      fixture(`
        <div class="${treeClass}"></div>
        <div class="${treeClass}"></div>
        <div class="${treeClass}"></div>
      `);

      const expectedClass = 'is-matched';

      querySelector(`.${treeClass}`, `.${treeClass}`).forEach((node) => {
        node.className = `${node.className} ${expectedClass}`;
      });

      expect(`.${treeClass}`).toHaveCSSClass(expectedClass);
    });

    describe('when selector contains blocks shortcuts', () => {
      it('select all children elements which matched by selector', () => {
        const treeBlock = 'tree';
        const nodeClass = 'node';

        fixture(`
          <div data-block="${treeBlock}">
            <div class="${nodeClass}"></div>
          </div>
          <div data-block="${treeBlock}">
            <div class="${nodeClass}"></div>
          </div>
          <div data-block="${treeBlock}">
            <div class="${nodeClass}"></div>
          </div>
        `);

        const expectedClass = 'is-matched';

        querySelector(`@@${treeBlock}`, `.${nodeClass}`).forEach((node) => {
          node.className = expectedClass;
        });

        expect(`.${nodeClass}`).toHaveCSSClass(expectedClass);
      });

      it('select each tree element if matched by selector', () => {
        const treeBlock = 'tree-block';

        fixture(`
          <div data-block="@@${treeBlock}"></div>
          <div data-block="@@${treeBlock}"></div>
          <div data-block="@@${treeBlock}"></div>
        `);

        const expectedClass = 'is-matched';

        querySelector(`@@${treeBlock}`, `@@${treeBlock}`).forEach((node) => {
          node.className = expectedClass;
        });

        expect(`[data-block~="${treeBlock}"]`).toHaveCSSClass(expectedClass);
      });
    });

    describe('when selector contains roles shortcuts', () => {
      it('select all children elements which matched by selector', () => {
        const treeRole = 'tree';
        const nodeClass = 'node';

        fixture(`
          <div data-role="${treeRole}">
            <div class="${nodeClass}"></div>
          </div>
          <div data-role="${treeRole}">
            <div class="${nodeClass}"></div>
          </div>
          <div data-role="${treeRole}">
            <div class="${nodeClass}"></div>
          </div>
        `);

        const expectedClass = 'is-matched';

        querySelector(`@${treeRole}`, `.${nodeClass}`).forEach((node) => {
          node.className = expectedClass;
        });

        expect(`.${nodeClass}`).toHaveCSSClass(expectedClass);
      });

      it('select each tree element if matched by selector', () => {
        const treeRole = 'tree-block';

        fixture(`
          <div data-role="@${treeRole}"></div>
          <div data-role="@${treeRole}"></div>
          <div data-role="@${treeRole}"></div>
        `);

        const expectedClass = 'is-matched';

        querySelector(`@${treeRole}`, `@${treeRole}`).forEach((node) => {
          node.className = expectedClass;
        });

        expect(`[data-role~="${treeRole}"]`).toHaveCSSClass(expectedClass);
      });
    });
  });

  describe('blocks and roles shortcuts in selector', () => {
    it('supports blocks shortcuts in selector', () => {
      const treeClass = 'tree';
      const nodeBlock = 'node';

      fixture(`
        <div class="${treeClass}">
          <div data-block="${nodeBlock}"></div>
        </div>
        <div class="${treeClass}">
          <div data-block="${nodeBlock}"></div>
        </div>
        <div class="${treeClass}">
          <div data-block="${nodeBlock}"></div>
        </div>
      `);

      const expectedClass = 'is-matched';

      querySelector(`.${treeClass}`, `@@${nodeBlock}`).forEach((node) => {
        node.className = expectedClass;
      });

      expect(`[data-block="${nodeBlock}"]`).toHaveCSSClass(expectedClass);
    });

    it('supports roles shortcuts in selector', () => {
      const treeClass = 'tree';
      const nodeRole = 'node';

      fixture(`
        <div class="${treeClass}">
          <div data-role="${nodeRole}"></div>
        </div>
        <div class="${treeClass}">
          <div data-role="${nodeRole}"></div>
        </div>
        <div class="${treeClass}">
          <div data-role="${nodeRole}"></div>
        </div>
      `);

      const expectedClass = 'is-matched';

      querySelector(`.${treeClass}`, `@${nodeRole}`).forEach((node) => {
        node.className = expectedClass;
      });

      expect(`[data-role="${nodeRole}"]`).toHaveCSSClass(expectedClass);
    });
  });
});
