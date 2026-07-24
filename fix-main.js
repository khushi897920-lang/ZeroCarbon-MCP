const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

if (content.includes('snap-mandatory')) {
  content = content.replace(/<main[^>]*>/, '<main className="relative overflow-x-hidden">');
  fs.writeFileSync('app/page.tsx', content);
  console.log('Fixed main tag');
} else {
  console.log('Main tag is fine');
}
