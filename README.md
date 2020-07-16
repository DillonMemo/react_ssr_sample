<div align=center>

![GitHub](https://img.shields.io/github/license/dillonmemo/react_ssr_sample) ![GitHub repo size](https://img.shields.io/github/repo-size/dillonmemo/react_ssr_sample) [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FDillonMemo%2Freact_ssr_sample)](https://hits.seeyoufarm.com)

</div>

> Update at 2020. 7. 16
>
> 1. [⚠️ TSLint is deprecated.](https://github.com/palantir/tslint)
> 2. Use EsLint instead of TSLint.
> 3. Prettier, ESLint, dotenv reconfigure

# React + Typescript + SSR + Code Splitting

code splitting with @loadable/components

createdon : 2020. 04. 24
modifiyon : 2020. 07. 16

## 작업일 기준 Version

- react-dom@16.13.1
- react@16.13.1
- typescript@3.8.3
- @emotion/cache@10.0.29
- @emotion/core@10.0.28
- create-emotion-server@10.0.27
- @types/react-dom@16.9.6
- @types/react@16.9.34
- webpack-dev-server@3.10.3
- babel-loader@8.1.0
- html-webpack-plugin@4.2.0
- webpack-cli@3.3.11
- ts-loader@7.0.1
- eslint@7.4.0
- eslint-config-prettier@6.11.0
- eslint-plugin-prettier@3.1.4
- eslint-plugin-react@7.20.3
- @typescript-eslint/parser@3.6.1
- @typescript-eslint/eslint-plugin@3.6.1
- webpack@4.43.0
- express@4.17.1
- webpack-node-externals@1.7.2
- @types/webpack-node-externals@1.7.1
- @types/webpack-hot-middleware@2.25.2
- @types/webpack-dev-middleware@3.7.0
- webpack-dev-middleware@3.7.2
- @types/express@4.17.6
- webpack-hot-middleware@2.25.0
- @types/webpack-env@1.15.2
- @babel/core@7.9.0
- @babel/plugin-transform-runtime@7.9.0
- @loadable/component@5.12.0
- @types/loadable\_\_component@5.10.0
- @loadable/webpack-plugin@5.12.0
- @loadable/babel-plugin@5.12.0
- @loadable/server@5.12.0
- @types/loadable\_\_server@5.12.0

## Setting Guide

위 가이드는 React + Typescript + SSR + Code Splitting으로 환경 구성 하는 방법 입니다.

#### 폴더 구조

```bash
root
  ├─.github
  │  └─workflows
  ├─dist
  ├─src
  │  ├─components
  │  ├─pages
  │  ├─App.tsx
  │  ├─index.tsx
  │  └─server.tsx
  └─...config files
```

#### 설정

```bash
npm install react react-dom typescript @emotion/core
npm install @types/react @types/react-dom --save-dev

npm install webpack webpack-cli webpack-dev-server html-webpack-plugin --save-dev

npm install react-router-dom react-helmet
npm install @types/react-router-dom @types/react-helmet --save-dev

# eslint
npm i -D dotenv-webpack eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser

# babel
npm install babel-loader ts-loader @babel/core @babel/plugin-transform-runtime @babel/preset-env @babel/preset-react @babel/preset-typescript --save-dev

npm install express
npm install cors webpack-dev-middleware webpack-hot-middleware webpack-node-externals @types/cors @types/express @types/webpack-dev-middleware @types/webpack-hot-middleware @types/webpack-env --save-dev

# code splitting (with loadable/components)
npm install @loadable/component @loadable/server
npm install @types/loadable__component @loadable/webpack-plugin @loadable/babel-plugin @types/loadable__server @emotion/cache create-emotion-server --save-dev
```
