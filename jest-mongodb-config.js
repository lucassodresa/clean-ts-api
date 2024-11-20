module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      db: 'jest'
    },
    binary: {
      version: '4.0.3',
      skipMD5: true
    },
    autoStart: false
  }
}
