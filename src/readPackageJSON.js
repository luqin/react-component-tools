/**
 * Extract package.json metadata
 *
 * @returns {{name: string, deps: Array}}
 */
function readPackageJSON() {
  let pkg = JSON.parse(require('fs').readFileSync('./package.json'));
  let o = {};
  if (pkg) {
    Object.assign(o, pkg.dependencies);
  }
  if (pkg.peerDependencies) {
    Object.assign(o, pkg.peerDependencies);
  }
  let dependencies = Object.keys(o);

  return {
    name: pkg.name,
    deps: dependencies
  };
}

export default readPackageJSON;
