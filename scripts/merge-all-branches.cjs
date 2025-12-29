const { execSync } = require('child_process');

function run(command) {
    try {
        console.log(`Running: ${command}`);
        return execSync(command, { encoding: 'utf8', stdio: 'inherit' });
    } catch (error) {
        console.error(`Error executing command: ${command}`);
        // console.error(error.message); 
        // Don't throw, just return null so we can continue
        return null;
    }
}

function processBranches() {
    // Get all branches except main and the current one (handled carefully)
    let branches = execSync('git branch --format="%(refname:short)"', { encoding: 'utf8' })
        .split('\n')
        .map(b => b.trim())
        .filter(b => b && b !== 'main');

    console.log('Branches to process:', branches);

    for (const branch of branches) {
        console.log(`\nProcessing branch: ${branch}`);

        // Checkout branch
        run(`git checkout ${branch}`);

        // Push (force to ensure remote is up to date)
        run(`git push origin ${branch} --force`);

        // Create PR
        // We accept failure here in case PR already exists
        const title = `Merge ${branch}`;
        const body = `Automated PR for branch ${branch}`;
        run(`gh pr create --title "${title}" --body "${body}" --head ${branch} --base main`);

        // Merge PR
        run(`gh pr merge ${branch} --merge --auto --delete-branch`);

        // If gh pr merge worked, the remote branch is gone. 
        // We typically switch to main to delete the local branch safely.
        run(`git checkout main`);
        run(`git pull origin main`);
        run(`git branch -D ${branch}`);
    }
}

processBranches();
