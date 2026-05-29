const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'ECE 1 -CLAUDE DESIGN');
const destFile = path.join(__dirname, 'src', 'shared', 'ui', 'CircuitSystem.tsx');

const files = [
  'icons.jsx',
  'controls.jsx',
  'readouts.jsx',
  'circuit-system.jsx',
  'shared.jsx'
];

let finalCode = `"use client";\n\nimport React, { useState as uS, useEffect as uE, useRef, useMemo, useCallback } from "react";\n\n`;

const exportsList = new Set();

files.forEach(file => {
  const content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
  
  // Remove React destructuring
  let cleaned = content.replace(/const \{.*?\} = React;/g, '');
  
  // Find window exports
  const exportMatch = cleaned.match(/Object\.assign\(window,\s*\{([^}]+)\}\);?/);
  if (exportMatch) {
    const exportedItems = exportMatch[1].split(',').map(s => s.trim()).filter(s => s);
    exportedItems.forEach(item => exportsList.add(item));
    cleaned = cleaned.replace(exportMatch[0], '');
  }
  
  finalCode += `\n/* --- ${file} --- */\n` + cleaned + '\n';
});

finalCode += `\n/* --- EXPORTS --- */\n`;
finalCode += `export { ${Array.from(exportsList).join(', ')} };\n`;

fs.writeFileSync(destFile, finalCode);
console.log('Successfully generated CircuitSystem.tsx');
