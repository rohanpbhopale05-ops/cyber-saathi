const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_DIR = path.resolve(__dirname, '..');
const DEBOUNCE_DELAY_MS = 4000; // Wait 4 seconds after last save before pushing
let timeoutId = null;
let isPushing = false;

console.log('====================================================');
console.log('  CYBER SAATHI - AUTO GITHUB SYNC ACTIVE            ');
console.log('  Watching project files for changes...             ');
console.log('====================================================');
console.log(`Repository: https://github.com/rohanpbhopale05-ops/cyber-saathi`);
console.log('Press Ctrl+C to stop.\n');

function syncWithGitHub(changedFile) {
  if (isPushing) return;

  try {
    // Check if there are actual git changes
    const status = execSync('git status --porcelain', { cwd: PROJECT_DIR, encoding: 'utf-8' }).trim();
    if (!status) {
      return;
    }

    isPushing = true;
    const now = new Date().toLocaleString();
    console.log(`\n[${now}] 📝 Changes detected (${changedFile || 'files modified'}). Syncing to GitHub...`);

    // Stage changes
    execSync('git add .', { cwd: PROJECT_DIR, stdio: 'inherit' });

    // Commit changes
    const commitMsg = `auto: sync changes [${now}]`;
    execSync(`git commit -m "${commitMsg}"`, { cwd: PROJECT_DIR, stdio: 'inherit' });

    // Push to GitHub
    console.log(`[${now}] 🚀 Pushing to origin main...`);
    execSync('git push origin main', { cwd: PROJECT_DIR, stdio: 'inherit' });

    console.log(`[${now}] ✅ Successfully pushed to GitHub!\n`);
  } catch (error) {
    console.error(`\n[Auto-Push Error]: ${error.message}\n`);
  } finally {
    isPushing = false;
  }
}

function handleFileChange(eventType, filename) {
  if (!filename) return;

  // Ignore node_modules, .git, dist, logs, and temporary files
  const normalized = filename.replace(/\\/g, '/');
  if (
    normalized.startsWith('.git') ||
    normalized.startsWith('node_modules') ||
    normalized.startsWith('dist') ||
    normalized.endsWith('.tmp') ||
    normalized.endsWith('.log')
  ) {
    return;
  }

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    syncWithGitHub(filename);
  }, DEBOUNCE_DELAY_MS);
}

// Watch project directory recursively
try {
  fs.watch(PROJECT_DIR, { recursive: true }, (eventType, filename) => {
    handleFileChange(eventType, filename);
  });
} catch (err) {
  console.error('Failed to start watcher:', err);
}
