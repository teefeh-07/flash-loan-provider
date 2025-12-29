// Utility functions
export const uniq = (arr) => [...new Set(arr)];
<<<<<<< HEAD
=======
/**
 * Removes duplicates from array.
 */
export const first = (arr) => arr[0];
>>>>>>> feat/array-first
/**
 * Get first element.
 */
export const last = (arr) => arr[arr.length - 1];
/**
 * Get last element.
 */
export const flatten = (arr) => arr.flat();
/**
 * Flattens array.
 */
export const compact = (arr) => arr.filter(Boolean);
/**
 * Removes falsey values.
 */
export const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
