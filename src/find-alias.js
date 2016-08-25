/* eslint no-param-reassign: 0 */

export default function addFindAlias(component) {
  component.$ = function find(selector) {
    return this.block.find(selector);
  };
}
