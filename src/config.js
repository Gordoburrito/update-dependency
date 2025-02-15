require('dotenv').config();

const repos = require('./nuxt_repos.json');
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
  repositories: repos,
};

module.exports = config; 