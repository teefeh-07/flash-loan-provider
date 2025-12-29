const { automateGit, run } = require('./git-automate.cjs');
const fs = require('fs');
const path = require('path');

const dependencies = [
    { pkg: '@stacks/connect', branch: 'feat/deps-stacks-connect', msg: 'feat: add @stacks/connect dependency' },
    { pkg: '@stacks/transactions', branch: 'feat/deps-stacks-transactions', msg: 'feat: add @stacks/transactions dependency' },
    { pkg: '@stacks/network', branch: 'feat/deps-stacks-network', msg: 'feat: add @stacks/network dependency' },
    { pkg: '@stacks/common', branch: 'feat/deps-stacks-common', msg: 'feat: add @stacks/common dependency' },
    { pkg: '@hirosystems/chainhooks-client', branch: 'feat/deps-chainhooks', msg: 'feat: add @hirosystems/chainhooks-client dependency' },
    { pkg: '@walletconnect/sign-client', branch: 'feat/deps-walletconnect', msg: 'feat: add @walletconnect/sign-client dependency' },
    { pkg: 'react', branch: 'feat/deps-react', msg: 'feat: add react dependency' },
    { pkg: 'react-dom', branch: 'feat/deps-react-dom', msg: 'feat: add react-dom dependency' },
    { pkg: 'vite', branch: 'feat/deps-vite', msg: 'feat: add vite dependency' },
    { pkg: '@vitejs/plugin-react', branch: 'feat/deps-vite-react-plugin', msg: 'feat: add @vitejs/plugin-react dependency' }
];

for (const dep of dependencies) {
    console.log(`Adding ${dep.pkg}...`);
    run(`npm install ${dep.pkg} --save`);
    automateGit(
        dep.branch,
        dep.msg,
        `Dependency: ${dep.pkg}`,
        `This PR adds ${dep.pkg} to the project dependencies.`
    );
}
