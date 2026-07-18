const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

// Update main tag to have snap scrolling
content = content.replace(
  /<main className="relative overflow-x-hidden">/, 
  '<main className="relative h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory">'
);

// Find all section tags and update their classes
const sectionRegex = /<section([^>]*)className="([^"]*)"([^>]*)>/g;
content = content.replace(sectionRegex, (match, before, classes, after) => {
  let classList = classes.split(' ').filter(c => !c.match(/^(py-|pt-|pb-|min-h-|md:py-|md:pt-|md:pb-)/));
  
  if (!classList.includes('h-screen') && !classList.includes('h-[100dvh]')) {
    classList.push('h-[100dvh]', 'w-full', 'snap-start', 'snap-always', 'flex', 'flex-col', 'justify-center', 'overflow-hidden');
  }
  
  return `<section${before}className="${classList.join(' ')}"${after}>`;
});

fs.writeFileSync('app/page.tsx', content);
console.log('Updated page.tsx sections');
