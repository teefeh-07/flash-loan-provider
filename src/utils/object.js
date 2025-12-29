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
/**
 * Check if object has key.
 */
export const pick = (obj, keys) => keys.reduce((acc, key) => { if (key in obj) acc[key] = obj[key]; return acc; }, {});
/**
 * Pick keys from object.
 */
export const omit = (obj, keys) => { const next = { ...obj }; keys.forEach(key => delete next[key]); return next; };
