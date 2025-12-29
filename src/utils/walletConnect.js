import { SignClient } from '@walletconnect/sign-client';

export async function createSignClient() {
  const signClient = await SignClient.init({
    projectId: 'YOUR_PROJECT_ID', // TODO: User should replace this
    metadata: {
      name: 'Flash Loan Provider',
      description: 'Flash Loan Provider on Stacks',
      url: window.location.origin,
      icons: ['https://walletconnect.com/walletconnect-logo.png'],
    },
  });
  return signClient;
}
