import $ from 'jquery';

/*
 * Copy from jquery.role by Sasha Koss https://github.com/kossnocorp/role
 */
function rewriteSelector(context, name, position) {
  const original = context[name];

  if (!original) {
    return;
  }

  context[name] = function replaceAliases(...args) {
    args[position] = args[position].replace(
      /@@([\w\u00c0-\uFFFF\-]+)/g, '[data-block~="$1"]');
    args[position] = args[position].replace(
      /@([\w\u00c0-\uFFFF\-]+)/g, '[data-role~="$1"]');

    return original.apply(context, args);
  };

  $.extend(context[name], original);
}

rewriteSelector($, 'find', 0);
rewriteSelector($, 'multiFilter', 0);
rewriteSelector($.find, 'matchesSelector', 1);
rewriteSelector($.find, 'matches', 0);
