const { spawnSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const root = path.resolve(__dirname, '..')

function build(folder, args = []) {
  const result = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build', ...args], {
    cwd: path.join(root, folder), stdio: 'inherit', shell: process.platform === 'win32',
    env: { ...process.env, REACT_APP_INTERFACE: '', PUBLIC_URL: '.' }
  })
  if (result.status !== 0) process.exit(result.status || 1)
}

build('app', ['--', '--configuration', 'production'])
build('trading/swap')
const sharedBuild = path.join(root, 'trading/swap/build')
const hosting = path.join(root, 'app/dist/website')
fs.cpSync(sharedBuild, path.join(hosting, 'trade'), { recursive: true })
console.log('Firebase bundle ready: /, /trade/')
