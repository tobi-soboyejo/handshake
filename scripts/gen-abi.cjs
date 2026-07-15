// Regenerates web/src/lib/abi.ts and abi-board.ts from Foundry artifacts.
const fs = require('fs');
function gen(artifact, out, exportName) {
  const art = JSON.parse(fs.readFileSync(artifact, 'utf8'));
  fs.writeFileSync(out,
    `// Generated from ${artifact}\n// Regenerate: node scripts/gen-abi.cjs\n` +
    `export const ${exportName} = ` + JSON.stringify(art.abi, null, 2) + ' as const;\n');
  console.log(out, 'regenerated');
}
gen('contracts/out/HandshakeRegistry.sol/HandshakeRegistry.json', 'web/src/lib/abi.ts', 'handshakeAbi');
gen('contracts/out/HandshakeBoard.sol/HandshakeBoard.json', 'web/src/lib/abi-board.ts', 'boardAbi');
