/**
 * @description express, graphql-yoga 서버 생성
 * @import ./app.ts - GraphQLServer안에 express가 사용 되어 있음.
 */
// import dotenv from "dotenv";
// dotenv.config(); // 임포트한 connectionOptions에서 .env의 변수를 사용 하기 떄문에 바로 실행 시킴.

import { Options } from "graphql-yoga";
import app from "./app";
// import { createConnection } from "typeorm";
// import connectionOptions from "./ormConfig";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT
};

const handleAppStart = () => console.log(`Listening on port ${PORT}`);

app.start(appOptions, handleAppStart);
// createConnection(connectionOptions)
//   .then(() => {
//     console.log("connectionOptions", connectionOptions);
//     app.start(appOptions, handleAppStart);
//   })
//   .catch(error => console.log(error));
