import { describe, it, expect } from 'vitest';
import { capitalize, lowercase, uppercase } from '../src/utils/string';

describe('String Utils', () => {
    it('should capitalize string', () => {
        expect(capitalize('hello')).toBe('Hello');
    });

    it('should lowercase string', () => {
        expect(lowercase('HELLO')).toBe('hello');
    });

    it('should uppercase string', () => {
        expect(uppercase('hello')).toBe('HELLO');
    });
});
