const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
        safe: false,
      },
    ],
  ],
};
