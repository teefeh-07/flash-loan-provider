const { automateGit, run } = require('./git-automate.cjs');
const fs = require('fs');
const path = require('path');

const readmeFile = path.join(__dirname, '..', 'README.md');

const sections = [
    { title: 'Project Overview', content: '# Flash Loan Provider\n\nA professional flash loan provider built on the Stacks blockchain using Clarity 4.0.\n' },
    { title: 'Goal', content: '## Project Goal\n\nTo provide a secure and efficient way for users to execute flash loans on the Stacks ecosystem.\n' },
    { title: 'Tech Stack', content: '## Tech Stack\n\n- **Smart Contracts**: Clarity 4.0\n- **Frontend**: React + Vite\n- **Blockchain Link**: @stacks/connect, @stacks/transactions\n- **Event Hooks**: @hirosystems/chainhooks-client\n- **Wallet Support**: WalletConnect\n' },
    { title: 'Features', content: '## Key Features\n\n- Zero-collateral loans (Flash Loans)\n- SIP-010 Token Support\n- Dynamic Fee Management\n- Real-time event monitoring\n- Multi-wallet support (Xverse, Hiro, etc.)\n' },
    { title: 'Architecture', content: '## Architecture\n\nThe project consists of a core flash loan contract and a frontend interface that interacts with it via Hiro/Xverse wallets.\n' },
    { title: 'Prerequisites', content: '## Prerequisites\n\n- Clarinet CLI\n- Node.js >= 18\n- npm or yarn\n' },
    { title: 'Installation', content: '## Installation\n\n```bash\nnpm install\n```\n' },
    { title: 'Running Contracts', content: '## Running Contracts\n\n```bash\nclarinet console\n```\n' },
    { title: 'Running Frontend', content: '## Running Frontend\n\n```bash\nnpm run dev\n```\n' },
    { title: 'License', content: '## License\n\nMIT License. See LICENSE for more details.\n' }
];

// Clear README first
fs.writeFileSync(readmeFile, '');
automateGit('docs/reset-readme', 'docs: reset README for structured updates', 'Docs: Reset README', 'Resetting README to build it section by section.');

for (const section of sections) {
    fs.appendFileSync(readmeFile, section.content);
    automateGit(
        `docs/readme-${section.title.toLowerCase().replace(/ /g, '-')}`,
        `docs: add ${section.title} section to README`,
        `Docs: README ${section.title}`,
        `This PR adds the ${section.title} section to the README.`
    );
}
