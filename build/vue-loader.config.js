module.exports = (isDev) => {
  return {
    preservewhitepace: true,
    extractCSS: !isDev,
    cssModules: {}
  }
}