const { automateGit, run } = require('./git-automate.cjs');
const fs = require('fs');
const path = require('path');

const contractPath = path.join(__dirname, '..', 'contracts', 'flash-loan.clar');

function fixContract() {
    let content = fs.readFileSync(contractPath, 'utf8');

    // Replace old as-contract with new as-contract? pattern
    if (content.includes('(as-contract tx-sender)')) {
        console.log('Fixing as-contract usage...');
        content = content.replace(/\(as-contract tx-sender\)/g, '(unwrap-panic (as-contract? tx-sender))');

        fs.writeFileSync(contractPath, content);

        automateGit(
            'fix/contract-clarity-4-compliance',
            'fix: replace as-contract with as-contract? for Clarity 4',
            'Fix: Clarity 4 Compliance',
            'Updated contract to use as-contract? instead of deprecated as-contract.'
        );
    } else {
        console.log('No deprecated as-contract usage found.');
    }
}

fixContract();
