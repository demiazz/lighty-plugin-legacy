import $ from 'jquery';

import { startsWith, endsWith, includes } from './utils';


function addBlockEventListener(component, descriptor) {
  const events = descriptor.substr(3);
  const listener = component[descriptor];

  component.block.on(events, function handleBlockEvent(e) {
    if (e.currentTarget !== e.target) {
      return;
    }

    listener.apply(component, arguments); // eslint-disable-line
  });
}

let loaded;

$(window).on('load', e => {
  loaded = e;
});

function addLoadEventListener(component, descriptor) {
  const listener = component[descriptor];

  if (!listener) {
    return;
  }

  if (loaded) {
    setTimeout(function handleLoadEvent() {
      listener.call(component, loaded);
    }, 1);
  } else {
    $(window).load(function handleLoadEvent(e) {
      listener.call(component, e);
    });
  }
}

function addBodyEventListener(component, descriptor) {
  const events = descriptor.split(' on ')[0];
  const listener = component[descriptor];

  $('body').on(events, function handleBodyEvent() {
    listener.apply(component, arguments); // eslint-disable-line
  });
}

function addWindowEventListener(component, descriptor) {
  const events = descriptor.split(' on ')[0];
  const listener = component[descriptor];

  $(window).on(events, function handleWindowEvent() {
    listener.apply(component, arguments); // eslint-disable-line
  });
}

function addElementEventListener(component, descriptor) {
  const [events, selectors] = descriptor.split(' on ');

  if (!(events && selectors)) {
    return;
  }

  const listener = component[descriptor];

  component.block.on(events, selectors, function handleEvent() {
    listener.apply(component, arguments); // eslint-disable-line
  });
}

function getEventListener(descriptor) {
  if (startsWith(descriptor, 'on ')) {
    return addBlockEventListener;
  }

  if (descriptor === 'load on window') {
    return addLoadEventListener;
  }

  if (endsWith(descriptor, ' on body')) {
    return addBodyEventListener;
  }

  if (endsWith(descriptor, ' on window')) {
    return addWindowEventListener;
  }

  if (includes(descriptor, ' on ')) {
    return addElementEventListener;
  }

  return null;
}


export default function addEventListeners(component) {
  const descriptors = Object.keys(component);

  for (let i = 0; i < descriptors.length; i++) {
    const descriptor = descriptors[i];
    const addEventListener = getEventListener(descriptor);

    if (addEventListener) {
      addEventListener(component, descriptor);

      delete component[descriptor];
    }
  }
}
