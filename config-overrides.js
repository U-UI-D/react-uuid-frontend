const {override, addWebpackAlias} = require('customize-cra');
const {resolve} = require('path');
module.exports = {
  webpack: override(
    addWebpackAlias({
      '@': resolve(__dirname, 'src'),
      '@store': resolve(__dirname, 'src/store'),
      '@service': resolve(__dirname, 'src/service'),
      '@components': resolve(__dirname, 'src/components'),
    })
  )
}
