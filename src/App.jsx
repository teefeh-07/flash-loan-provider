import React from 'react';
import ConnectWallet from './components/ConnectWallet';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Flash Loan Provider</h1>
        <ConnectWallet />
      </header>
      <main>
        <p>Welcome to the Flash Loan Provider on Stacks.</p>
      </main>
    </div>
  );
}

export default App;