module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
          alias: {
            assets: './src/assets',
            components: './src/components',
            constants: './src/constants',
            hooks: './src/hooks',
            navigation: './src/navigation',
            screens: './src/screens',
            store: './src/store',
            models: './src/models',
            utils: './src/utils',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
