/**
 * @description express, graphql-yoga 서버 생성
 * @import ./app.ts - GraphQLServer안에 express가 사용 되어 있음.
 */
import dotenv from 'dotenv';
dotenv.config(); // 임포트한 connectionOptions에서 .env의 변수를 사용 하기 떄문에 바로 실행 시킴.
// console.log(process.env);

import { Options } from 'graphql-yoga';
import { createConnection } from 'typeorm';
import connectionOptions from './ormConfig';
import app from './app';

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = '/playground';
const GRAPHQL_ENDPOINT: string = '/graphql';

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
};

const handleAppStart = () => console.log(`Listening on port ${PORT}`);

createConnection(connectionOptions)
  .then(() => {
    console.log('connectionOptions', connectionOptions);
    app.start(appOptions, handleAppStart);
  })
  .catch(error => console.log(error));
