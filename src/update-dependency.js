const githubService = require('./services/github');
const dependencyManager = require('./services/dependencyManager');
const config = require('./config');
const chalk = require('chalk');

async function updateRepository(owner, repo) {
  console.log(chalk.yellow(`\nProcessing ${owner}/${repo}...`));

  try {
    // Get the current package.json content and its SHA
    const { content, sha } = await githubService.getPackageJson(owner, repo);
    const packageJson = JSON.parse(content);

    // Skip if dependency already exists
    if (dependencyManager.hasDependency(packageJson)) {
      console.log(chalk.yellow(`Skipping ${owner}/${repo}: "${config.dependency.name}" already exists.`));
      return;
    }

    // Add the dependency and update the file
    const updatedContent = dependencyManager.addDependency(packageJson);
    await githubService.updateFile(owner, repo, updatedContent, sha);

    console.log(chalk.green(`✅ Updated ${owner}/${repo} successfully.`));
  } catch (error) {
    console.error(chalk.red(`❌ Error updating ${owner}/${repo}: ${error.message}`));
  }
}

async function updateAllRepositories() {
  console.log(chalk.blue('\nUpdating all repositories...'));
  for (const { owner, repo } of config.repositories) {
    await updateRepository(owner, repo);
  }
  console.log(chalk.green('\n✨ Finished processing all repositories'));
}

async function listRepositories() {
  console.log(chalk.blue('\nListing all configured repositories:'));
  config.repositories.forEach(({ owner, repo }) => {
    console.log(chalk.white(`- ${owner}/${repo}`));
  });
  console.log(); // Empty line for better readability
}

module.exports = {
  updateRepository,
  updateAllRepositories,
  listRepositories
}; 