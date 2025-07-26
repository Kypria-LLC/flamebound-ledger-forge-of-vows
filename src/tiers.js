import fs from 'fs';
import path from 'path';

// Load the current README template
const template = fs.readFileSync(path.resolve('README.template.md'), 'utf-8');

// Load your logbook (canon entries)
const logbook = JSON.parse(
  fs.readFileSync(path.resolve('logbook.json'), 'utf-8')
);

// Build a “Recent Canon” section
const recent = logbook.entries
  .slice(-5)
  .map(e => `- ${e.date} — ${e.entry}`)
  .join('\n');

const content = template.replace(
  /<!-- RECENT_CANON -->[\s\S]*<!-- RECENT_CANON_END -->/,
  `<!-- RECENT_CANON -->\n${recent}\n<!-- RECENT_CANON_END -->`
);

// Write back to README.md
fs.writeFileSync(path.resolve('README.md'), content);
console.log('✅ README.md regenerated with latest canon.');export const sponsorTiers = {
  bronze: {
    price: 5,
    roleId: process.env.BRONZE_ROLE_ID,
    artifactDir: './artifacts/bronze'
  },
  silver: {
    price: 15,
    roleId: process.env.SILVER_ROLE_ID,
    artifactDir: './artifacts/silver'
  },
  gold: {
    price: 50,
    roleId: process.env.GOLD_ROLE_ID,
    artifactDir: './artifacts/gold'
  },
  legendary: {
    price: 200,
    roleId: process.env.LEGENDARY_ROLE_ID,
    artifactDir: './artifacts/legendary'
  }
};
