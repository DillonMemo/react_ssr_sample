const dotenv = require("dotenv");
dotenv.config();

module.exports = (env) => {
  console.log("dotenv :", process.env.NODE_ENV, env);
  return require(`./webpack.${env}.js`);
};
