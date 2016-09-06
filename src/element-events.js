/* eslint no-param-reassign: 0, no-continue: 0, prefer-rest-params: 0 */

export default function addElementEvents(component) {
  const properties = Object.keys(component);

  for (let i = 0; i < properties.length; i++) {
    const property = properties[i];

    const [eventsNames, elementsSelector] = property.split(' on ');

    if (!(eventsNames && elementsSelector)) {
      continue;
    }

    const eventsCallback = component[property];

    delete component[property];

    (function bindBlockEvents(events, selectors, callback) {
      component.block.on(events, selectors, function handleEvent() {
        callback.apply(component, arguments);
      });
    }(eventsNames, elementsSelector, eventsCallback));
  }
}
