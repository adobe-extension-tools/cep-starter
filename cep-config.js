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
          id: 'PHXS',
          from: '1.0',
          to: '99.9',
          port: '4000'
        },
        {
          id: 'PHSP',
          from: '1.0',
          to: '99.9',
          port: '4001'
        },
        {
          id: 'IDSN',
          from: '1.0',
          to: '99.9',
          port: '4002'
        },
        {
          id: 'AICY',
          from: '1.0',
          to: '99.9',
          port: '4002'
        },
        {
          id: 'ILST',
          from: '1.0',
          to: '99.9',
          port: '4003'
        },
        {
          id: 'PPRO',
          from: '1.0',
          to: '99.9',
          port: '4004'
        },
        {
          id: 'PRLD',
          from: '1.0',
          to: '99.9',
          port: '4005'
        },
        {
          id: 'AEFT',
          from: '1.0',
          to: '99.9',
          port: '4006'
        },
        {
          id: 'FLPR',
          from: '1.0',
          to: '99.9',
          port: '4007'
        },
        {
          id: 'AUDT',
          from: '1.0',
          to: '99.9',
          port: '4008'
        },
        {
          id: 'DRWV',
          from: '1.0',
          to: '99.9',
          port: '4009'
        },
        {
          id: 'MUSE',
          from: '1.0',
          to: '99.9',
          port: '4010'
        },
        {
          id: 'KBRG',
          from: '1.0',
          to: '99.9',
          port: '4011'
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
      resources: `${__dirname}/node_modules/cep-packager/resources/macos`
    },
    windows: {
      dest: `${__dirname}/dist/${version}.exe`,
      resources: `${__dirname}/node_modules/cep-packager/resources/windows`
    },
    paths: {
      // cwd: __dirname + '/work'
    }
  }
}
