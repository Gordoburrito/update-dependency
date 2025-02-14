const { Octokit } = require('@octokit/rest');
const config = require('../config');

class GitHubService {
  constructor() {
    this.octokit = new Octokit({ auth: config.github.token });
  }

  async getPackageJson(owner, repo) {
    const { data } = await this.octokit.repos.getContent({
      owner,
      repo,
      path: config.filePath,
      ref: config.github.mainBranch,
    });
    const content = Buffer.from(data.content, 'base64').toString('utf8');
    return { content, sha: data.sha };
  }

  async updateFile(owner, repo, content, sha) {
    return this.octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: config.filePath,
      message: `Add ${config.dependency.name} dependency`,
      content: Buffer.from(content).toString('base64'),
      sha,
      branch: config.github.mainBranch,
    });
  }
}

module.exports = new GitHubService(); 