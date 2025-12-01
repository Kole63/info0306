const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Rediriger l'ancien plugin vers le nouveau
config.resolver.extraNodeModules = {
  'babel-plugin-react-native-dotenv': require.resolve('react-native-dotenv'),
};

module.exports = config;
