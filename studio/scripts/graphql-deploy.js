const { spawn } = require('child_process')

const child = spawn(
  'npx',
  ['sanity', 'graphql', 'deploy', '--force', '--no-playground'],
  { stdio: ['inherit', 'pipe', 'inherit'] }
)

child.stdout.on('data', (data) => {
  process.stdout.write(data)
  if (data.toString().includes('api.sanity.io')) {
    setTimeout(() => process.exit(0), 500)
  }
})

child.on('exit', (code) => process.exit(code || 0))
