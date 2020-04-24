const dotenv = require("dotenv");

module.exports = (env) => {
  dotenv.config();
  console.log("dotenv :", process.env.NODE_ENV, env);
  return require(`./webpack.${env}.js`);
};
