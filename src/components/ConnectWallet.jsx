import React from 'react';
import { userSession, authenticate } from '../utils/stacksUserSession';

const ConnectWallet = () => {
  if (userSession.isUserSignedIn()) {
    return (
      <button onClick={() => userSession.signUserOut('/')}>
        Disconnect Wallet
      </button>
    );
  }

  return (
    <button onClick={authenticate}>
      Connect Wallet
    </button>
  );
};

export default ConnectWallet;
