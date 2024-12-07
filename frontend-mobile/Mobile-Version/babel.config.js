module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        envName: "APP_ENV",
        moduleName: "@env",
        path: ".env",
      },
    ],
    [
      "@babel/plugin-transform-private-methods",
      {
        loose: true, // Ensure 'loose' mode is set to true
      },
    ],
    [
      "@babel/plugin-transform-private-property-in-object",
      {
        loose: true, // Set 'loose' mode here as well
      },
    ],
    [
      "@babel/plugin-transform-class-properties",
      {
        loose: true, // Set 'loose' mode for class properties too
      },
    ],
    "react-native-reanimated/plugin", // This should remain as it is
  ],
};
