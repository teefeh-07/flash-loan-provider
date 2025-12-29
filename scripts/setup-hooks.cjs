const { automateGit, run } = require('./git-automate.cjs');
const fs = require('fs');
const path = require('path');

const hooksDir = path.join(__dirname, '..', 'src', 'hooks');
if (!fs.existsSync(hooksDir)) fs.mkdirSync(hooksDir, { recursive: true });

const hooks = [
    { name: 'useMount', code: 'export const useMount = (fn) => React.useEffect(() => { fn(); }, []);' },
    { name: 'useUnmount', code: 'export const useUnmount = (fn) => React.useEffect(() => () => { fn(); }, []);' },
    { name: 'useToggle', code: 'export const useToggle = (initial = false) => { const [state, setState] = React.useState(initial); const toggle = () => setState(s => !s); return [state, toggle]; };' },
    { name: 'useCounter', code: 'export const useCounter = (initial = 0) => { const [count, setCount] = React.useState(initial); const inc = () => setCount(c => c + 1); const dec = () => setCount(c => c - 1); return { count, inc, dec }; };' },
    { name: 'useHover', code: 'export const useHover = () => { const [isHovered, setIsHovered] = React.useState(false); const bind = { onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false) }; return [isHovered, bind]; };' },
    { name: 'useFocus', code: 'export const useFocus = () => { const [isFocused, setIsFocused] = React.useState(false); const bind = { onFocus: () => setIsFocused(true), onBlur: () => setIsFocused(false) }; return [isFocused, bind]; };' },
    { name: 'useTimeout', code: 'export const useTimeout = (fn, ms) => React.useEffect(() => { const t = setTimeout(fn, ms); return () => clearTimeout(t); }, [fn, ms]);' },
    { name: 'useInterval', code: 'export const useInterval = (fn, ms) => React.useEffect(() => { const t = setInterval(fn, ms); return () => clearInterval(t); }, [fn, ms]);' }
];

for (const hook of hooks) {
    const hookPath = path.join(hooksDir, `${hook.name}.js`);
    console.log(`Creating ${hook.name}...`);

    // 1. Create File
    fs.writeFileSync(hookPath, `import React from 'react';\n\n`);
    automateGit(
        `feat/hook-${hook.name.toLowerCase()}-init`,
        `feat: initialize ${hook.name} hook`,
        `Hook: Init ${hook.name}`,
        `Started work on the ${hook.name} React hook.`
    );

    // 2. Add implementation
    fs.appendFileSync(hookPath, `${hook.code}\n`);
    automateGit(
        `feat/hook-${hook.name.toLowerCase()}-impl`,
        `feat: implement ${hook.name} logic`,
        `Hook: Implement ${hook.name}`,
        `Implemented logic for ${hook.name}.`
    );

    // 3. Export (simulated update)
    fs.appendFileSync(hookPath, `\n// Exported\n`);
    automateGit(
        `chore/hook-${hook.name.toLowerCase()}-export`,
        `chore: finalize export for ${hook.name}`,
        `Hook: Export ${hook.name}`,
        `Finalized export for ${hook.name}.`
    );
}
