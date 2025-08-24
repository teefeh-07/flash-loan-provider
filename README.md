# Flash Loan Provider Protocol

A decentralized flash loan protocol built on the Stacks blockchain using Clarity smart contracts.

## Overview

This protocol allows users to borrow STX tokens without collateral for the duration of a single transaction block. The borrowed amount must be repaid within the same transaction along with a small fee (0.05%). Flash loans enable arbitrage opportunities, liquidations, and other advanced DeFi strategies.

## Features

- **Uncollateralized Lending**: Borrow STX without providing collateral
- **Atomic Transactions**: Loans must be repaid within the same block
- **Liquidity Pool**: Community-driven liquidity provision with yield sharing
- **Low Fees**: Only 0.05% fee per flash loan
- **Reentrancy Protection**: Built-in security measures
- **Pausable**: Emergency pause functionality for security
- **Share-based Rewards**: Liquidity providers earn proportional fees

## Smart Contract Architecture

### Core Functions

#### For Borrowers
- `flash-loan(amount, recipient, callback-contract)`: Execute a flash loan
- `repay-flash-loan(amount)`: Repay the borrowed amount plus fee

#### For Liquidity Providers
- `add-liquidity(amount)`: Add STX to the liquidity pool
- `remove-liquidity(shares)`: Withdraw liquidity based on shares owned

#### Read-Only Functions
- `get-available-liquidity()`: Check available liquidity for borrowing
- `calculate-flash-loan-fee(amount)`: Calculate fee for a given loan amount
- `get-total-liquidity()`: Get total pool liquidity
- `get-provider-shares(provider)`: Get shares owned by a liquidity provider

### Security Features

1. **Reentrancy Guard**: Prevents recursive calls during loan execution
2. **Pausable Contract**: Owner can pause operations in emergencies
3. **Input Validation**: Comprehensive checks on all user inputs
4. **Access Control**: Owner-only functions for administration

## Usage Examples

### Adding Liquidity

```clarity
;; Add 1000 STX to the liquidity pool
(contract-call? .flash-loan-provider add-liquidity u1000000000) ;; 1000 STX in micro-STX
```

### Taking a Flash Loan

```clarity
;; Borrow 500 STX for arbitrage
(contract-call? .flash-loan-provider flash-loan u500000000 'SP1234... 'SP5678...)
```

### Removing Liquidity

```clarity
;; Remove liquidity using shares
(contract-call? .flash-loan-provider remove-liquidity u100000000)
```

## Fee Structure

- **Flash Loan Fee**: 0.05% (5 basis points)
- **Fee Distribution**: 100% to liquidity providers
- **Minimum Loan**: No minimum (but must be > 0)
- **Maximum Loan**: Limited by available pool liquidity

## Economic Model

### Liquidity Providers
- Earn fees proportional to their share of the pool
- Receive shares when adding liquidity
- Can withdraw anytime (subject to available liquidity)
- Fees compound automatically in the pool

### Flash Loan Users
- Pay minimal fees for uncollateralized loans
- Must repay within the same transaction
- Can use loans for arbitrage, liquidations, or other DeFi strategies

## Error Codes

| Code | Constant | Description |
|------|----------|-------------|
| u100 | ERR-OWNER-ONLY | Function restricted to contract owner |
| u101 | ERR-INSUFFICIENT-LIQUIDITY | Not enough liquidity in pool |
| u102 | ERR-LOAN-NOT-REPAID | Flash loan not repaid properly |
| u103 | ERR-INVALID-AMOUNT | Invalid loan amount |
| u104 | ERR-CALLBACK-FAILED | Callback function failed |
| u105 | ERR-REENTRANCY | Reentrancy attack detected |
| u106 | ERR-INSUFFICIENT-SHARES | Not enough shares to burn |
| u107 | ERR-CONTRACT-PAUSED | Contract is paused |
| u108 | ERR-SHARE-MISMATCH | Share calculation error |
| u109 | ERR-INSUFFICIENT-FEES | Not enough fees to withdraw |

## Deployment Guide

### Prerequisites
- Clarinet CLI installed
- Stacks wallet with STX for deployment
- Node.js and npm/yarn

### Steps

1. **Clone and Setup**
```bash
git clone https://github.com/fhayvy/flash-loan-provider.git
cd flash-loan-provider
clarinet check
```

2. **Test the Contract**
```bash
clarinet test
```

3. **Deploy to Testnet**
```bash
clarinet deploy --testnet
```

4. **Deploy to Mainnet**
```bash
clarinet deploy --mainnet
```

## Testing

The contract includes comprehensive tests for:
- Liquidity provision and withdrawal
- Flash loan execution
- Fee calculations
- Security measures
- Error handling

Run tests with:
```bash
clarinet test
```

## Integration Guide

### For DApps

```javascript
// Example integration with Stacks.js
import { makeContractCall, broadcastTransaction } from '@stacks/transactions';

const flashLoanTx = await makeContractCall({
  contractAddress: 'SP...',
  contractName: 'flash-loan-provider',
  functionName: 'flash-loan',
  functionArgs: [
    uintCV(1000000000), // 1000 STX
    principalCV('SP...'), // recipient
    principalCV('SP...') // callback contract
  ],
  senderKey: privateKey,
  network: new StacksTestnet()
});
```

### For Arbitrage Bots

1. Monitor price differences across DEXs
2. Calculate potential profit minus flash loan fee
3. Execute flash loan with arbitrage logic
4. Repay loan in same transaction

## Risks and Considerations

### For Users
- **Smart Contract Risk**: Code bugs could lead to loss of funds
- **Liquidity Risk**: Withdrawals depend on pool liquidity
- **Market Risk**: Value of STX can fluctuate

### For Developers
- **Callback Complexity**: Ensure proper loan repayment logic
- **Gas Costs**: Factor in transaction fees
- **Slippage**: Account for price movements during execution

## Governance and Upgrades

Currently, the contract is immutable once deployed. Future versions may include:
- Governance token for parameter changes
- Upgradeable proxy pattern
- Multi-signature controls

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Submit a pull request

## Security Audits

- [ ] Internal security review
- [ ] External security audit
- [ ] Bug bounty program