const fs = require('fs');

let content = fs.readFileSync('app/page.tsx', 'utf8');

// 1. Remove rigid snapping and height limits on all sections
// Find all <section> tags and their className
content = content.replace(/<section([^>]*?)className="([^"]*?)"/g, (match, beforeClass, classStr) => {
  let newClasses = classStr;
  
  // Replace h-[100dvh] with responsive min-h
  newClasses = newClasses.replace(/h-\[100dvh\]/g, 'min-h-[100dvh] py-16 md:py-24');
  
  // Remove snapping classes
  newClasses = newClasses.replace(/snap-start/g, '').replace(/snap-always/g, '').replace(/shrink-0/g, '');
  
  // Remove overflow-hidden from section to prevent clipping on mobile
  newClasses = newClasses.replace(/overflow-hidden/g, '');
  
  // Clean up multiple spaces
  newClasses = newClasses.replace(/\s+/g, ' ').trim();
  
  return `<section${beforeClass}className="${newClasses}"`;
});

// 2. Add grid-cols-1 to any grid that defines lg:grid-cols but lacks mobile grid definition
// Wait, we'll just safely replace it
content = content.replace(/grid\s+gap-(\d+)\s+lg:grid-cols-\[/g, 'grid grid-cols-1 gap-$1 lg:grid-cols-[');

// Also handle social-proof which has: grid gap-6 lg:grid-cols-[0.95fr_1.05fr]
content = content.replace(/grid\s+gap-6\s+lg:grid-cols-\[/g, 'grid grid-cols-1 gap-6 lg:grid-cols-[');

// 3. Optimize blurs: change blur-3xl to blur-2xl to help with rendering lag
content = content.replace(/blur-3xl/g, 'blur-2xl');
// Change bg opacity for glows from 10% to 5% to balance the blur reduction
content = content.replace(/bg-white\/10 blur-2xl/g, 'bg-white/5 blur-2xl');
content = content.replace(/bg-accent-green\/10 blur-2xl/g, 'bg-accent-green/5 blur-2xl');

fs.writeFileSync('app/page.tsx', content);
console.log('✅ page.tsx has been updated for responsiveness and performance.');
