module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // ... tes autres plugins s'il y en a
      'react-native-reanimated/plugin', 
    ],
  };
};