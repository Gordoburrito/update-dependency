const config = require('../config');

class DependencyManager {
  hasDependency(packageJson) {
    return (
      (packageJson.dependencies && packageJson.dependencies[config.dependency.name]) ||
      (packageJson.devDependencies && packageJson.devDependencies[config.dependency.name])
    );
  }

  addDependency(packageJson) {
    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.dependencies[config.dependency.name] = config.dependency.version;
    return JSON.stringify(packageJson, null, 2) + '\n';
  }
}

module.exports = new DependencyManager(); 