/*!
 * lighty-plugin-legacy v0.2.1
 * https://github.com/demiazz/lighty-plugin-legacy
 *
 * Copyright Alexey Plutalov
 * Released under the MIT license
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('lighty')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'lighty'], factory) :
  (factory((global.lightyPluginLegacy = global.lightyPluginLegacy || {}),global.jQuery,global.lighty));
}(this, (function (exports,$,lighty) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

/*
 * Regexps from jquery.role by Sasha Koss https://github.com/kossnocorp/role
 */
function transformSelector(selector) {
  return selector
    .replace(/@@([\w\u00c0-\uFFFF-]+)/g, '[data-block~="$1"]')
    .replace(/@([\w\u00c0-\uFFFF-]+)/g, '[data-role~="$1"]');
}

function rewriteSelector(context, name, position) {
  var original = context[name];

  if (!original) {
    return;
  }

  context[name] = function replaceAliases() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    args[position] = transformSelector(args[position]);

    return original.apply(context, args);
  };

  $.extend(context[name], original);
}

rewriteSelector($, 'find', 0);
rewriteSelector($, 'multiFilter', 0);
rewriteSelector($.find, 'matchesSelector', 1);
rewriteSelector($.find, 'matches', 0);


function transform$1(component) {
  var nodes = component.$('[data-role]');

  for (var i = 0; i < nodes.length; i += 1) {
    var node = nodes[i];
    var roles = node.attributes['data-role'].value.split(' ');

    for (var j = 0; j < roles.length; j += 1) {
      var role = roles[j];

      if (!component[role]) {
        component[role] = $();
      }

      if (component[role].jquery) {
        component[role].push(node);
      }
    }
  }
}

function startsWithNative(string, substring) {
  return string.startsWith(substring);
}

function startsWithPolyfill(string, substring) {
  return string.substr(0, substring.length) === substring;
}

var startsWith = String.prototype.startsWith
  ? startsWithNative
  : startsWithPolyfill;


function endsWithNative(string, substring) {
  return string.endsWith(substring);
}

function endsWithPolyfill(string, substring) {
  return string.substr(-substring.length) === substring;
}

var endsWith = String.prototype.endsWith
  ? endsWithNative
  : endsWithPolyfill;


function includesNative(string, substring) {
  return string.includes(substring);
}

function includesPolyfill(string, substring) {
  return string.indexOf(substring) !== -1;
}

var includes = String.prototype.includes
  ? includesNative
  : includesPolyfill;

function addBlockEventListener(component, property) {
  var events = property.substr(3);
  var listener = component[property];

  component.block.on(events, function handleBlockEvent(e) {
    var data = [], len = arguments.length - 1;
    while ( len-- > 0 ) data[ len ] = arguments[ len + 1 ];

    if (e.currentTarget !== e.target) {
      return;
    }

    listener.call.apply(listener, [ component, e ].concat( data ));
  });
}

var loaded;

$(window).on('load', function (e) {
  loaded = e;
});

function addLoadEventListener(component, property) {
  var listener = component[property];

  if (!listener) {
    return;
  }

  if (loaded) {
    setTimeout(function handleLoadEvent() {
      listener.call(component, loaded);
    }, 1);
  } else {
    $(window).on('load', function handleLoadEvent(e) {
      listener.call(component, e);
    });
  }
}

function addBodyEventListener(component, property) {
  var events = property.split(' on ')[0];
  var listener = component[property];

  $('body').on(events, function handleBodyEvent() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    listener.call.apply(listener, [ component ].concat( args ));
  });
}

function addWindowEventListener(component, property) {
  var events = property.split(' on ')[0];
  var listener = component[property];

  $(window).on(events, function handleWindowEvent() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    listener.call.apply(listener, [ component ].concat( args ));
  });
}

function addElementEventListener(component, property) {
  var ref = property.split(' on ');
  var events = ref[0];
  var selectors = ref[1];

  if (!(events && selectors)) {
    return;
  }

  var listener = component[property];

  component.block.on(events, selectors, function handleEvent() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var event = args[0];

    event.el = $(this);

    listener.call.apply(listener, [ component ].concat( args ));
  });
}

function getEventListener(property) {
  if (startsWith(property, 'on ')) {
    return addBlockEventListener;
  }

  if (property === 'load on window') {
    return addLoadEventListener;
  }

  if (endsWith(property, ' on body')) {
    return addBodyEventListener;
  }

  if (endsWith(property, ' on window')) {
    return addWindowEventListener;
  }

  if (includes(property, ' on ')) {
    return addElementEventListener;
  }

  return null;
}


function transform$2(component) {
  Object.keys(component).forEach(function (property) {
    var addEventListener = getEventListener(property);

    if (!addEventListener) {
      return;
    }

    addEventListener(component, property);

    delete component[property];
  });
}

function querySelector$1(tree, selector) {
  if ( tree === void 0 ) tree = document.body;

  return lighty.querySelector(
    typeof tree === 'string' ? transformSelector(tree) : tree,
    transformSelector(selector)
  );
}

function pluginInitializer() {
  return function transform(component, node) {
    component.block = $(node);

    component.$ = function findInBlock(selector) {
      return $(selector, component.block);
    };

    transform$1(component);
    transform$2(component);
  };
}


var index = lighty.plugin('legacy', pluginInitializer);

exports.querySelector = querySelector$1;
exports['default'] = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=lighty-plugin-legacy.umd.js.map
