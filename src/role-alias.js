/* eslint no-param-reassign: 0 */

import $ from 'jquery';


export default function addRoleAlias(component) {
  const nodes = component.querySelector('[data-role]');

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes.item(i);
    const roles = node.attributes['data-role'].value.split(' ');

    for (let j = 0; j < roles.length; j++) {
      const role = roles[i];

      if (!component[role]) {
        component[role] = $();
      }

      if (component[role].jquery) {
        component[role].push(node);
      }
    }
  }
}
