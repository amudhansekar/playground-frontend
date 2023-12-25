function toCamel(str: string): string {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
}

function toSnakeCase(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

function isObject(obj: object): boolean {
  return (
    obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function'
  );
}

/**
 * Converts all of an object's keys to camelCase
 * @param obj a js object
 * @returns the same obj but with camelCase keys
 */
function keysToCamelCase(obj: object): object {
  if (isObject(obj)) {
    const n: object = {};

    Object.keys(obj).forEach((k) => {
      (n as any)[toCamel(k)] = keysToCamelCase((obj as any)[k]);
    });

    return n;
  } else if (Array.isArray(obj)) {
    return obj.map((i) => {
      return toCamel(i);
    });
  }

  return obj;
}

/**
 * Converts all of an object's keys to snake_case
 * @param obj a js object
 * @returns the same obj but with snake_case keys
 */
function keysToSnakeCase(obj: object): object {
  if (isObject(obj)) {
    const n: object = {};

    Object.keys(obj).forEach((k) => {
      (n as any)[toSnakeCase(k)] = keysToSnakeCase((obj as any)[k]);
    });

    return n;
  } else if (Array.isArray(obj)) {
    return obj.map((i) => {
      return toSnakeCase(i);
    });
  }
  return obj;
}

export { keysToCamelCase, keysToSnakeCase };
