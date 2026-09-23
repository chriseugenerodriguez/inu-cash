const path = require('path')
const { runTypeChain } = require('typechain')
const { sync: glob } = require('glob')
const cwd = path.resolve(__dirname, '..')
async function generate(outDir, patterns) {
  const files = [...new Set(patterns.flatMap(pattern => glob(pattern, { cwd, absolute: true, ignore: '**/*.dbg.json' })))]
  if (!files.length) throw new Error(`No contract artifacts found for ${outDir}`)
  const result = await runTypeChain({ cwd, target: 'ethers-v5', outDir, filesToProcess: files, allFiles: files })
  console.log(`${outDir}: generated ${result.filesGenerated} files from ${files.length} artifacts`)
}
async function main() {
  await generate('src/abis/types', ['src/abis/*.json'])
  await generate('src/types/v3', [
    'node_modules/@uniswap/v3-core/artifacts/contracts/**/*.json',
    'node_modules/@uniswap/v3-periphery/artifacts/contracts/**/*.json'
  ])
}
main().catch(error => { console.error(error); process.exit(1) })
