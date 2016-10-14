function toBeTrue() {
  return {
    compare(actual) {
      const result = {
        pass: actual === true,
      };

      result.message = result.pass
        ? `Expected ${JSON.stringify(actual)} not to be true`
        : `Expected ${JSON.stringify(actual)} to be true`;

      return result;
    },
  };
}

function toBeInstanceOf() {
  return {
    compare(actual, klass) {
      const result = {
        pass: actual instanceof klass,
      };

      result.message = result.pass
        ? `Expected object not to be an instance of ${klass.name}`
        : `Expected object to be an instance of ${klass.name}`;

      return result;
    },
  };
}

function toHaveLength() {
  return {
    compare(actual, length) {
      if (actual.length == null) {
        return {
          pass: false,
          message: 'Expected object have not length property',
        };
      }

      const result = {
        pass: actual.length === length,
      };

      result.message = result.pass
        ? `Expected object not to have a length ${length}`
        : `Expected object to have a length ${length}`;

      return result;
    },
  };
}

function toHaveBeenCalledOn() {
  return {
    compare(actual, context) {
      const result = {
        pass: actual.calls.all().every(c => c.object === context),
      };

      result.message = result.pass
        ? 'Expected function not to be called on given context'
        : 'Expected function to be called on given context';

      return result;
    },
  };
}


export default {
  toBeTrue,
  toBeInstanceOf,
  toHaveLength,
  toHaveBeenCalledOn,
};
