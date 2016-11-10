import { querySelector as internalQuerySelector } from 'lighty';

import transformSelector from './transform-selector';


export default function querySelector(tree = document.body, selector) {
  return internalQuerySelector(
    typeof tree === 'string' ? transformSelector(tree) : tree,
    transformSelector(selector)
  );
}
