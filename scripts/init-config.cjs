const { automateGit, run } = require('./git-automate.cjs');
const fs = require('fs');
const path = require('path');

const CLARINET_TOML = path.join(__dirname, '..', 'Clarinet.toml');

function updateClarinetToml(key, value) {
    let content = fs.readFileSync(CLARINET_TOML, 'utf8');
    const regex = new RegExp(`${key} = .*`, 'g');
    content = content.replace(regex, `${key} = ${value}`);
    fs.writeFileSync(CLARINET_TOML, content);
}

// Step 1: Clarity Version
updateClarinetToml('clarity_version', '4');
automateGit(
    'feat/update-clarity-version',
    'feat: update clarity version to 4 in Clarinet.toml',
    'Feature: Update Clarity Version',
    'This PR updates the Clarity version to 4 to support the latest smart contract features.'
);

// Step 2: Epoch
updateClarinetToml('epoch', '"3.3"');
automateGit(
    'feat/update-epoch-version',
    'feat: update epoch to 3.3 in Clarinet.toml',
    'Feature: Update Epoch Version',
    'This PR updates the epoch to 3.3 as per project requirements.'
);
