import $ from 'jquery';

import transformSelector from './transform-selector';


function rewriteSelector(context, name, position) {
  const original = context[name];

  if (!original) {
    return;
  }

  context[name] = function replaceAliases(...args) {
    args[position] = transformSelector(args[position]);

    return original.apply(context, args);
  };

  $.extend(context[name], original);
}

rewriteSelector($, 'find', 0);
rewriteSelector($, 'multiFilter', 0);
rewriteSelector($.find, 'matchesSelector', 1);
rewriteSelector($.find, 'matches', 0);


export default function transform(component) {
  const nodes = component.$('[data-role]');

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    const roles = node.attributes['data-role'].value.split(' ');

    for (let j = 0; j < roles.length; j += 1) {
      const role = roles[j];

      if (!component[role]) {
        component[role] = $();
      }

      if (component[role].jquery) {
        component[role].push(node);
      }
    }
  }
}
