// Utility functions
export const keys = (obj) => Object.keys(obj);
/**
 * Get object keys.
 */
export const values = (obj) => Object.values(obj);
/**
 * Get object values.
 */
export const entries = (obj) => Object.entries(obj);
export const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
