// Utility functions

/**
 * Get current timestamp.
 */
export const now = () => Date.now();

/**
 * Check if is Date object.
 */
export const isDate = (d) => d instanceof Date;

/**
 * Convert to ISO string.
 */
export const toISOString = (d) => d.toISOString();

/**
 * Get day of week.
 */
export const getDay = (d) => d.getDay();

/**
 * Get month.
 */
export const getMonth = (d) => d.getMonth();

/**
 * Get full year.
 */
export const getYear = (d) => d.getFullYear();

/**
 * Add days to date.
 */
export const addDays = (d, n) => new Date(d.setDate(d.getDate() + n));

/**
 * Subtract days.
 */

/**
 * Check leap year.
 */
