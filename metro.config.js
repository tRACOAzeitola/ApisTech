const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const path = require('path');

/**
 * Metro configuration for React Native
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Exclude test directories and files from being processed by Metro
    blacklistRE: exclusionList([
      /\.git\/.*/,
      /\.vscode\/.*/,
      /\.idea\/.*/,
      /\android\/build\/.*/,
      /\ios\/build\/.*/,
      /node_modules\/.*\/__tests__\/.*/,
      /\.test\.js$/,
      /\.spec\.js$/,
    ]),
    useWatchman: true,
    // Speed up module resolution
    extraNodeModules: {
      'src': path.resolve(__dirname, 'src'),
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true,
      },
    }),
    // Use hermes transform for performance
    hermesParser: true,
  },
  maxWorkers: 4, // Limit the number of workers to reduce memory usage
  cacheVersion: '1.0', // Bump this when you make major changes to improve caching
  resetCache: false,
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
