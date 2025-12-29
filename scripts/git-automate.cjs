const { execSync } = require('child_process');

function run(command) {
    try {
        console.log(`Running: ${command}`);
        return execSync(command, { encoding: 'utf8', stdio: 'inherit' });
    } catch (error) {
        console.error(`Error executing command: ${command}`);
        console.error(error.message);
        // Don't exit, let the caller handle it if needed
        return null;
    }
}

function automateGit(branchName, commitMsg, prTitle, prBody) {
    const currentBranch = 'main';

    // 1. Create and checkout branch
    run(`git checkout -b ${branchName}`);

    // 2. Add and commit
    run('git add .');
    run(`git commit -m "${commitMsg}"`);

    // 3. Push
    console.log(`Pushing branch ${branchName}...`);
    run(`git push origin ${branchName} --force`);

    // 4. Create PR using gh CLI (Try, but don't fail)
    console.log(`Attempting to create PR for ${branchName}...`);
    const prResult = run(`gh pr create --title "${prTitle}" --body "${prBody}" --head ${branchName} --base main`);

    if (prResult !== null) {
        // 5. Merge PR
        console.log(`Merging PR for ${branchName}...`);
        run(`gh pr merge --merge --auto --delete-branch`);
    } else {
        console.log(`PR creation failed. Merging locally instead.`);
        run(`git checkout main`);
        run(`git merge ${branchName}`);
        run(`git push origin main`);
        run(`git branch -d ${branchName}`);
    }

    // 6. Back to main and pull
    run(`git checkout main`);
    run(`git pull origin main`);
}

module.exports = { automateGit, run };
