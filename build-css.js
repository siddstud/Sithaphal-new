// This script builds the Tailwind CSS file
const fs = require('fs');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

// Input and output paths
const inputFile = './src/input.css';
const outputFile = './public/styles/tailwind.css';

// Ensure the output directory exists
if (!fs.existsSync('./public/styles')) {
  fs.mkdirSync('./public/styles', { recursive: true });
}

// Process the CSS
postcss([
  tailwindcss(),
  autoprefixer()
])
.process(`
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
`, {
  from: inputFile,
  to: outputFile,
  map: { inline: false }
})
.then(result => {
  fs.writeFileSync(outputFile, result.css);
  if (result.map) {
    fs.writeFileSync(`${outputFile}.map`, result.map.toString());
  }
  console.log('Tailwind CSS built successfully!');
})
.catch(error => {
  console.error('Error building Tailwind CSS:', error);
  process.exit(1);
});
