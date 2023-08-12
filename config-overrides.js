const webpack = require('webpack');

module.exports = function override(config) 
{
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    'crypto': require.resolve('crypto-browserify'),
    'stream': require.resolve('stream-browserify'),
    'assert': require.resolve('assert'),
    'http': require.resolve('stream-http'),
    // Add other required modules here
  });

  return config;
};
