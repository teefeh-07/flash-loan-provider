const { automateGit, run } = require('./git-automate.cjs');
const fs = require('fs');
const path = require('path');

const contractSteps = [
    {
        path: 'contracts/sip-010-trait.clar',
        content: `(define-trait sip-010-trait
  (
    (transfer (uint principal principal (optional (buff 34))) (response bool uint))
    (get-name () (response (string-ascii 32) uint))
    (get-symbol () (response (string-ascii 10) uint))
    (get-decimals () (response uint uint))
    (get-balance (principal) (response uint uint))
    (get-total-supply () (response uint uint))
    (get-token-uri () (response (optional (string-utf8 256)) uint))
  )
)`,
        branch: 'feat/contract-sip-010-trait',
        msg: 'feat: add SIP-010 trait definition',
        title: 'Contract: SIP-010 Trait',
        body: 'Added the SIP-010 Fungible Token trait for compatibility.'
    },
    {
        path: 'contracts/flash-loan.clar',
        content: `;; Flash Loan Provider
;; Clarity 4 / Epoch 3.3

(define-constant ERR-UNAUTHORIZED (err u100))
(define-constant ERR-INSUFFICIENT-FUNDS (err u101))
(define-constant ERR-INVALID-LOAN (err u102))
`,
        branch: 'feat/contract-constants',
        msg: 'feat: add constants and error codes to flash-loan contract',
        title: 'Contract: Flash Loan Constants',
        body: 'Initial setup of flash-loan contract with error codes.'
    },
    {
        path: 'contracts/flash-loan.clar',
        append: true,
        content: `
(define-data-var fee-rate uint u5) ;; 0.05%
(define-data-var contract-owner principal tx-sender)
`,
        branch: 'feat/contract-data-vars',
        msg: 'feat: add data variables for fee rate and owner',
        title: 'Contract: Data Variables',
        body: 'Added data variables to manage state in the flash-loan contract.'
    }
];

for (const step of contractSteps) {
    console.log(`Updating ${step.path}...`);
    const fullPath = path.join(__dirname, '..', ...step.path.split('/'));
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    if (step.append && fs.existsSync(fullPath)) {
        fs.appendFileSync(fullPath, step.content);
    } else {
        fs.writeFileSync(fullPath, step.content);
    }

    automateGit(step.branch, step.msg, step.title, step.body);
}
