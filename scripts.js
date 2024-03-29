import esbuild from 'esbuild'
import { Server } from '@damienmortini/server'

const esBuildOptions = {
  entryPoints: ['node_modules/@beagives/bea-website/index.js'],
  bundle: true,
  minify: true,
  format: 'esm',
  sourcemap: true,
  preserveSymlinks: true,
  target: 'safari13',
  outfile: 'build/index.js',
}

switch (process.argv[2]) {
  case 'start': {
    const server = new Server({
      watch: true,
      watchIgnore: ['**/*.js', '**/*.css'],
    })

    esbuild.build({
      ...esBuildOptions,
      watch: {
        onRebuild() {
          server.refresh()
        },
      },
    })
    break
  }
  case 'build':
    esbuild.build(esBuildOptions)
    break
}
