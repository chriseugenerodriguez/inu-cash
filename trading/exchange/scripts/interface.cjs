const { spawnSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const root = path.resolve(__dirname, '..')
const shared = path.resolve(root, '../swap')
const command = process.argv[2] || 'start'
if (!['start', 'build'].includes(command)) throw new Error('Expected start or build')
const result = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', command], {
  cwd: shared, stdio: 'inherit', shell: process.platform === 'win32',
  env: { ...process.env, REACT_APP_INTERFACE: 'exchange', PORT: process.env.PORT || '3002' }
})
if (result.status !== 0) process.exit(result.status || 1)
if (command === 'build') fs.cpSync(path.join(shared, 'build'), path.join(root, 'build'), { recursive: true })
