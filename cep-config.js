const name = 'CEP Tools Demo'
const bundleId = 'com.ceptools.demo'
const version = '1.0.0'

module.exports = {
  bundler: {
    src: 'src',
    build: 'build',
    dest: 'bundle',
    devPort: 5000,
    manifest: {
      name: name,
      bundleId: bundleId,
      cefParams: [
        '--allow-file-access-from-files',
        '--allow-file-access',
        '--enable-nodejs',
        '--mixed-context'
      ],
      cepVersion: '6.0',
      version: version,
      apps: [
        {
          id: 'AEFT',
          from: '1.0',
          to: '99.9',
          port: '4001'
        }
      ]
    }
  },
  packager: {
    name: name,
    bundleId: bundleId,
    version: version,
    src: './bundle',
    zxp: {
      // cert: '',
      certPassword: 'boom',
      dest: `${__dirname}/dist/${version}.zxp`
    },
    macOs: {
      dest: `${__dirname}/dist/${version}.pkg`,
      // keychain: '',
      // keychainPassword: '',
      identifier: '',
      resources: `${__dirname}/node_modules/cep-bundler/resources/macos`
    },
    windows: {
      dest: `${__dirname}/dist/${version}.exe`,
      resources: `${__dirname}/node_modules/cep-bundler/resources/windows`
    },
    paths: {
      // cwd: __dirname + '/work'
    }
  }
}
