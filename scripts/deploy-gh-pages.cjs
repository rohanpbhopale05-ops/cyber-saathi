const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

console.log('Building project...');
execSync('npm.cmd run build', { cwd: rootDir, stdio: 'inherit' });

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist!');
  process.exit(1);
}

// Ensure .nojekyll exists in dist
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

console.log('Deploying dist to origin gh-pages...');
try {
  // Get remote origin URL from root git repo
  const remoteUrl = execSync('git config --get remote.origin.url', { cwd: rootDir, encoding: 'utf8' }).trim();
  
  // Clean up any existing .git inside dist first
  try {
    fs.rmSync(path.join(distDir, '.git'), { recursive: true, force: true });
  } catch {}

  // Initialize temporary git repo inside dist
  execSync('git init', { cwd: distDir, stdio: 'inherit' });
  execSync(`git remote add origin ${remoteUrl}`, { cwd: distDir, stdio: 'inherit' });
  execSync('git checkout -B gh-pages', { cwd: distDir, stdio: 'inherit' });
  execSync('git add -A', { cwd: distDir, stdio: 'inherit' });
  execSync('git commit -m "Deploy latest build to GitHub Pages [skip ci]"', { cwd: distDir, stdio: 'inherit' });
  execSync('git push origin gh-pages --force', { cwd: distDir, stdio: 'inherit' });

  // Clean up .git inside dist
  fs.rmSync(path.join(distDir, '.git'), { recursive: true, force: true });
  console.log('✅ Successfully deployed latest build to gh-pages branch!');
} catch (error) {
  console.error('Deploy error:', error.message);
  try {
    fs.rmSync(path.join(distDir, '.git'), { recursive: true, force: true });
  } catch {}
  process.exit(1);
}
