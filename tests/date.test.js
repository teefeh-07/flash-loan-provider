import { describe, it, expect } from 'vitest';
import { isDate, getYear } from '../src/utils/date';

describe('Date Utils', () => {
    it('should check if date', () => {
        expect(isDate(new Date())).toBe(true);
    });

    it('should get year', () => {
        const year = new Date().getFullYear();
        expect(getYear(new Date())).toBe(year);
    });
});
