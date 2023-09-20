module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo",
      [
        "@babel/preset-env",
        {
          "targets": {
            "node": "current"
          }
        }
      ]
    ],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
      require.resolve("expo-router/babel"),
      [
        'module:react-native-dotenv', {
          moduleName: '@env',
          path: '.env',
        },
      ],
    ],
  };
};
