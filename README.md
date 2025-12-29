# Flash Loan Provider

A professional flash loan provider built on the Stacks blockchain using Clarity 4.0.
## Project Goal

To provide a secure and efficient way for users to execute flash loans on the Stacks ecosystem.
## Tech Stack

- **Smart Contracts**: Clarity 4.0
- **Frontend**: React + Vite
- **Blockchain Link**: @stacks/connect, @stacks/transactions
- **Event Hooks**: @hirosystems/chainhooks-client
- **Wallet Support**: WalletConnect
## Key Features

- Zero-collateral loans (Flash Loans)
- SIP-010 Token Support
- Dynamic Fee Management
- Real-time event monitoring
- Multi-wallet support (Xverse, Hiro, etc.)
## Architecture

The project consists of a core flash loan contract and a frontend interface that interacts with it via Hiro/Xverse wallets.
## Prerequisites

- Clarinet CLI
- Node.js >= 18
- npm or yarn
## Installation

```bash
npm install
```
## Running Contracts

```bash
clarinet console
```
