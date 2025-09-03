const fs = require('fs');
const { execSync } = require('child_process');

// Create public/styles directory if it doesn't exist
if (!fs.existsSync('public/styles')) {
  fs.mkdirSync('public/styles', { recursive: true });
}

// Run Tailwind CSS build
try {
  console.log('Building Tailwind CSS...');
  execSync('npx tailwindcss -i ./src/input.css -o ./public/styles/globals.css --minify', { stdio: 'inherit' });
  console.log('Successfully built Tailwind CSS!');
} catch (error) {
  console.error('Error building Tailwind CSS:', error);
  process.exit(1);
}
