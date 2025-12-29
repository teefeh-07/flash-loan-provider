// Utility functions

/**
 * Capitalizes first letter.
 */
export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Converts to lowercase.
 */
export const lowercase = (s) => s.toLowerCase();

/**
 * Converts to uppercase.
 */
export const uppercase = (s) => s.toUpperCase();

/**
 * Removes whitespace.
 */
export const trim = (s) => s.trim();

/**
 * Reverses string.
 */
export const reverse = (s) => s.split("").reverse().join("");

/**
 * Checks if value is string.
 */
export const isString = (v) => typeof v === "string";

/**
 * Checks if string is empty.
 */
export const isEmpty = (s) => s.length === 0;

/**
 * Checks string length.
 */
export const hasLength = (s, l) => s.length === l;

/**
 * Checks if string contains substring.
 */
