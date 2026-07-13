// Regenerates web/src/lib/abi.ts from the Foundry build artifact.
const fs = require('fs');
const art = JSON.parse(fs.readFileSync('contracts/out/HandshakeRegistry.sol/HandshakeRegistry.json', 'utf8'));
fs.writeFileSync('web/src/lib/abi.ts',
  '// Generated from contracts/out/HandshakeRegistry.sol/HandshakeRegistry.json\n' +
  '// Regenerate after any contract change: node scripts/gen-abi.cjs\n' +
  'export const handshakeAbi = ' + JSON.stringify(art.abi, null, 2) + ' as const;\n');
console.log('web/src/lib/abi.ts regenerated');
