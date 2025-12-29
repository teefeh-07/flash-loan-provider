const { automateGit, run } = require('./git-automate.cjs');
const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// 4. Array Utilities
const arrayUtilsPath = path.join(__dirname, '..', 'src', 'utils', 'array.js');
ensureDir(arrayUtilsPath);

const arrayFunctions = [
    { name: 'uniq', code: 'export const uniq = (arr) => [...new Set(arr)];', doc: 'Removes duplicates from array.' },
    { name: 'first', code: 'export const first = (arr) => arr[0];', doc: 'Get first element.' },
    { name: 'last', code: 'export const last = (arr) => arr[arr.length - 1];', doc: 'Get last element.' },
    { name: 'flatten', code: 'export const flatten = (arr) => arr.flat();', doc: 'Flattens array.' },
    { name: 'compact', code: 'export const compact = (arr) => arr.filter(Boolean);', doc: 'Removes falsey values.' },
    { name: 'chunk', code: 'export const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));', doc: 'Chunks array into smaller arrays.' }
];

// 5. Object Utilities
const objectUtilsPath = path.join(__dirname, '..', 'src', 'utils', 'object.js');
ensureDir(objectUtilsPath);

const objectFunctions = [
    { name: 'keys', code: 'export const keys = (obj) => Object.keys(obj);', doc: 'Get object keys.' },
    { name: 'values', code: 'export const values = (obj) => Object.values(obj);', doc: 'Get object values.' },
    { name: 'entries', code: 'export const entries = (obj) => Object.entries(obj);', doc: 'Get object entries.' },
    { name: 'has', code: 'export const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);', doc: 'Check if object has key.' },
    { name: 'pick', code: 'export const pick = (obj, keys) => keys.reduce((acc, key) => { if (key in obj) acc[key] = obj[key]; return acc; }, {});', doc: 'Pick keys from object.' },
    { name: 'omit', code: 'export const omit = (obj, keys) => { const next = { ...obj }; keys.forEach(key => delete next[key]); return next; };', doc: 'Omit keys from object.' }
];

function processFunctions(filePath, fns, category) {
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '// Utility functions\n');

    for (const fn of fns) {
        console.log(`Adding ${fn.name} to ${path.basename(filePath)}...`);

        // 1. Implementation
        fs.appendFileSync(filePath, `${fn.code}\n`);
        try {
            automateGit(
                `feat/${category}-${fn.name}`,
                `feat: implement ${fn.name} in ${category}`,
                `Feat: ${category} ${fn.name}`,
                `Implemented the ${fn.name} utility function.`
            );
        } catch (e) { console.error(e.message); }

        // 2. Documentation
        fs.appendFileSync(filePath, `/**\n * ${fn.doc}\n */\n`);
        try {
            automateGit(
                `docs/${category}-${fn.name}`,
                `docs: add doc comment for ${fn.name} in ${category}`,
                `Docs: ${category} ${fn.name}`,
                `Added documentation for the ${fn.name} utility function.`
            );
        } catch (e) { console.error(e.message); }
    }
}

processFunctions(arrayUtilsPath, arrayFunctions, 'array');
processFunctions(objectUtilsPath, objectFunctions, 'object');
