const path = require('path')
console.log('this happens')

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Extend it as you need.

  // For example, add typescript loader:

  storybookBaseConfig.resolve.extensions.push('.ts', '.tsx')
  storybookBaseConfig.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      include: path.resolve(__dirname, '../src'),
      loader: require.resolve('ts-loader')
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    },
    {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      loader: require.resolve('url-loader'),
      options: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]'
      }
    }
  )
  // Return the altered config
  return storybookBaseConfig
}
