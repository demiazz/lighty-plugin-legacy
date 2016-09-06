/* eslint no-param-reassign: 0 */

import { plugin } from 'lighty';

import './roles';

import addBlockAlias from './block-alias';
import addFindAlias from './find-alias';
import addRoleAlias from './role-alias';
import addBlockEvents from './block-events';
import addLoadEvents from './load-events';
import addBodyEvents from './body-events';
import addWindowEvents from './window-events';
import addElementEvents from './element-events';


function pluginInitializer() {
  return function transform(component, node) {
    addBlockAlias(component, node);
    addFindAlias(component);
    addRoleAlias(component);
    addBlockEvents(component);
    addLoadEvents(component);
    addBodyEvents(component);
    addWindowEvents(component);
    addElementEvents(component);
  };
}


export default plugin('legacy', pluginInitializer);
