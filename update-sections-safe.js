const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

// Find all section tags and update their classes safely without touching <main>
const sectionRegex = /<section([^>]*)className="([^"]*)"([^>]*)>/g;
content = content.replace(sectionRegex, (match, before, classes, after) => {
  // Remove conflicting padding and min-heights
  let classList = classes.split(' ').filter(c => !c.match(/^(py-|pt-|pb-|min-h-|h-|md:py-|md:pt-|md:pb-)/));
  
  // Add h-[100dvh] and snap classes.
  // We use shrink-0 so flex containers don't squash them.
  classList.push('h-[100dvh]', 'w-full', 'snap-start', 'snap-always', 'shrink-0');
  
  // Center content vertically. If it's not already flex/grid, make it flex-col justify-center.
  if (!classList.includes('flex') && !classList.includes('grid')) {
     classList.push('flex', 'flex-col', 'justify-center');
  }

  // Handle overflow carefully to prevent content spill without cutting off intended overlays
  if (!classList.includes('overflow-visible') && !classList.includes('overflow-hidden')) {
     classList.push('overflow-hidden');
  }
  
  return `<section${before}className="${classList.join(' ')}"${after}>`;
});

// We need to add `snap-y snap-mandatory` to html or body to make snapping work.
// But we won't add it to main so we don't break GSAP scroll tracking.

fs.writeFileSync('app/page.tsx', content);
console.log('Updated sections in page.tsx safely without breaking GSAP');
