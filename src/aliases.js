/* eslint no-param-reassign: 0 */

import $ from 'jquery';


export default function addAliases(component, node) {
  component.block = $(node);

  component.$ = function findInBlock(selector) {
    return $(selector, this.block);
  };

  const nodesWithRole = component.$('[data-role]');

  for (let i = 0; i < nodesWithRole.length; i++) {
    const nodeWithRole = nodesWithRole[i];
    const roles = nodeWithRole.attributes['data-role'].value.split(' ');

    for (let j = 0; j < roles.length; j++) {
      const role = roles[j];

      if (!component[role]) {
        component[role] = $();
      }

      if (component[role].jquery) {
        component[role].push(nodeWithRole);
      }
    }
  }
}
