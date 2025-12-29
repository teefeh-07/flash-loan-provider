import { ChainhooksClient } from '@hirosystems/chainhooks-client';

export const chainhooksClient = new ChainhooksClient({
    url: 'http://localhost:20456', // Default Clarinet Chainhooks URL
    apiKey: 'dev-api-key'
});

export async function registerFlashLoanEvents() {
    // Example: Register a predicate
    // Implementation details would depend on specific predicates
    console.log('Registering chainhook events...');
}
