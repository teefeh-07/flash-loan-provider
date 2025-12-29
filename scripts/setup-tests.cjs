const { automateGit, run } = require('./git-automate.cjs');
const fs = require('fs');
const path = require('path');

const testDir = path.join(__dirname, '..', 'tests');
if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

const testFiles = [
    {
        path: 'tests/math.test.js',
        content: `import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide } from '../src/utils/math';

describe('Math Utils', () => {
    it('should add two numbers', () => {
        expect(add(1, 2)).toBe(3);
    });

    it('should subtract two numbers', () => {
        expect(subtract(5, 2)).toBe(3);
    });

    it('should multiply two numbers', () => {
        expect(multiply(2, 3)).toBe(6);
    });

    it('should divide two numbers', () => {
        expect(divide(6, 2)).toBe(3);
    });
});
`,
        branch: 'test/math-utils',
        msg: 'test: add unit tests for math utils',
        title: 'Tests: Math Utils',
        body: 'Added Vitest unit tests for the math utility functions.'
    },
    {
        path: 'tests/string.test.js',
        content: `import { describe, it, expect } from 'vitest';
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
`,
        branch: 'test/string-utils',
        msg: 'test: add unit tests for string utils',
        title: 'Tests: String Utils',
        body: 'Added Vitest unit tests for the string utility functions.'
    },
    {
        path: 'tests/date.test.js',
        content: `import { describe, it, expect } from 'vitest';
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
`,
        branch: 'test/date-utils',
        msg: 'test: add unit tests for date utils',
        title: 'Tests: Date Utils',
        body: 'Added Vitest unit tests for the date utility functions.'
    }
];

// Execute
for (const file of testFiles) {
    console.log(`Creating ${file.path}...`);
    const fullPath = path.join(__dirname, '..', ...file.path.split('/'));
    fs.writeFileSync(fullPath, file.content);
    automateGit(file.branch, file.msg, file.title, file.body);
}
