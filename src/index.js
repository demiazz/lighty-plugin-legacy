/* eslint no-param-reassign: 0 */

import $ from 'jquery';
import { plugin } from 'lighty';

import './roles';


function pluginInitializer() {
  return function transform(component, node) {
    component.block = $(node);

    component.$ = function find(selector) {
      return $(node).find(selector);
    };

    const elementsWithRole = component.$('[data-role]');

    for (let i = 0; i < elementsWithRole.length; i++) {
      const elementWithRole = elementsWithRole[i];
      const roles = elementWithRole.attributes['data-role'].value.split(' ');

      for (let j = 0; j < roles.length; j++) {
        const role = roles[j];

        if (!component[role]) {
          component[role] = $();
        }

        if (component[role].jquery) {
          component[role].push(elementWithRole);
        }
      }
    }
  };
}


export default plugin('legacy', pluginInitializer);
