const { execSync } = require('child_process');

function run(command) {
    try {
        console.log(`Running: ${command}`);
        return execSync(command, { encoding: 'utf8', stdio: 'inherit' });
    } catch (error) {
        console.error(`Error executing command: ${command}`);
        // Don't throw, just return null so we can continue
        return null;
    }
}

function processBranches() {
    // Get all branches except main
    let branches = execSync('git branch --format="%(refname:short)"', { encoding: 'utf8' })
        .split('\n')
        .map(b => b.trim())
        .filter(b => b && b !== 'main');

    console.log('Branches to process:', branches);

    for (const branch of branches) {
        console.log(`\nProcessing branch: ${branch}`);

        // 1. Checkout main to ensure we are on base
        run(`git checkout main`);

        // 2. Merge locally
        console.log(`Merging ${branch} into main locally...`);
        const mergeResult = run(`git merge ${branch}`);

        if (mergeResult !== null) {
            // Success, push main
            run(`git push origin main`);

            // Delete branch locally
            run(`git branch -d ${branch}`);

            // Try to delete remote branch if it exists (cleanup)
            try {
                run(`git push origin --delete ${branch}`);
            } catch (e) { }

        } else {
            console.error(`Failed to merge ${branch}. It might have conflicts.`);
            run(`git merge --abort`); // Cleanup potential mess
        }
    }
}

processBranches();
