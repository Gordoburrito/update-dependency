require('dotenv').config();

// Constants for GitHub and dependency configuration
const config = {
  github: {
    token: process.env.GITHUB_TOKEN,
    mainBranch: 'main',
  },
  dependency: {
    name: 'node-fetch-native',
    version: '1.6.4',
  },
  filePath: 'package.json',
  repositories: [
    { owner: 'roostergrin', repo: 'proppersmiles' },
    // Add more repositories as needed.
  ],
};

module.exports = config; 