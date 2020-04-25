function isWebTarget(caller) {
  // console.log("isWebTarget :", caller);
  return Boolean(caller && caller.target === "web");
}

function isWebpack(caller) {
  // console.log("isWebpack :", caller);
  return Boolean(caller && caller.name === "babel-loader");
}

module.exports = (api) => {
  const web = api.caller(isWebTarget);
  const webpack = api.caller(isWebpack);

  return {
    presets: [
      "@babel/preset-react",
      [
        "@babel/preset-env",
        {
          useBuiltIns: web ? "entry" : undefined,
          targets: web ? undefined : { node: "current" },
          modules: webpack ? false : "commonjs",
        },
      ],
      "@babel/preset-typescript",
    ],
    plugins: [/*디버깅 최적화*/ "@babel/plugin-transform-runtime", "@loadable/babel-plugin"],
  };
};
