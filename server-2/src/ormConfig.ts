import { ConnectionOptions } from 'typeorm';

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  database: 'uber',
  synchronize: true,
  logging: true, // 콘솔창에 DB 쿼리 표시
  entities: ['entities/**/*.*'], // 모델 파일이 들어갈 폴더 경로
  host: process.env.DB_ENDPOINT,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

export default connectionOptions;
