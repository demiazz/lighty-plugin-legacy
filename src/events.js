import $ from 'jquery';

import { startsWith, endsWith, includes } from './utils';


function addBlockEventListener(component, property) {
  const events = property.substr(3);
  const listener = component[property];

  component.block.on(events, function handleBlockEvent(e, ...data) {
    if (e.currentTarget !== e.target) {
      return;
    }

    listener.call(component, e, ...data);
  });
}

let loaded;

$(window).on('load', (e) => {
  loaded = e;
});

function addLoadEventListener(component, property) {
  const listener = component[property];

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
  const events = property.split(' on ')[0];
  const listener = component[property];

  $('body').on(events, function handleBodyEvent(...args) {
    listener.call(component, ...args);
  });
}

function addWindowEventListener(component, property) {
  const events = property.split(' on ')[0];
  const listener = component[property];

  $(window).on(events, function handleWindowEvent(...args) {
    listener.call(component, ...args);
  });
}

function addElementEventListener(component, property) {
  const [events, selectors] = property.split(' on ');

  if (!(events && selectors)) {
    return;
  }

  const listener = component[property];

  component.block.on(events, selectors, function handleEvent(...args) {
    const [event] = args;

    event.el = $(this);

    listener.call(component, ...args);
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


export default function transform(component) {
  Object.keys(component).forEach((property) => {
    const addEventListener = getEventListener(property);

    if (!addEventListener) {
      return;
    }

    addEventListener(component, property);

    delete component[property];
  });
}
