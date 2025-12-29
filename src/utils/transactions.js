import { openContractCall } from '@stacks/connect';
import { StacksMocknet } from '@stacks/network';

export function requestFlashLoan(amount) {
    const network = new StacksMocknet();
    const options = {
        contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        contractName: 'flash-loan',
        functionName: 'flash-loan',
        functionArgs: [], 
        network,
        onFinish: (data) => {
            console.log('Transaction finished:', data);
        },
    };
    
    openContractCall(options);
}
