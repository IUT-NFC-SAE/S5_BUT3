const dotenv = require('dotenv');
const path = require('path');
const { defineConfig } = require('@vue/cli-service');

dotenv.config({ path: path.join(__dirname, '.env') });

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: process.env.VUE_APP_PORT,
    host: process.env.VUE_APP_HOSTNAME,
  },
});
