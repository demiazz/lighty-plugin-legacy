/* eslint no-param-reassign: 0, no-continue: 0, prefer-rest-params: 0 */

export default function addBlockEvents(component) {
  const properties = Object.keys(component);

  for (let i = 0; i < properties.length; i++) {
    const property = properties[i];

    if (property.substr(0, 3) !== 'on ') {
      continue;
    }

    const eventsNames = property.substr(3);
    const eventsCallback = component[property];

    delete component[property];

    (function bindBlockEvents(events, callback) {
      component.block.on(events, function handleEvent(e) {
        if (e.currentTarget !== e.target) {
          return;
        }

        callback.apply(component, arguments);
      });
    }(eventsNames, eventsCallback));
  }
}
