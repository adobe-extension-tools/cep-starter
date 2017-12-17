if (!window.__adobe_cep__) {
  window.__adobe_cep__ = {
    evalScript: function (contents: string, cb: () => {}) {
      console.log('SHIM: evalScript called')
    },
    getHostEnvironment: function () {
      console.log('SHIM: getHostEnvironment called')
      return '{}'
    }
  }
}

if (!window.nodeRequire) {
  window.nodeRequire = function (pkg) {
    if (pkg === 'fs') {
      return {
        readFileSync: () => '',
        writeFileSync: () => ''
      }
    }
  }
}
