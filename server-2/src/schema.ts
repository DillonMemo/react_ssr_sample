import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

// api 폴더 안에 있는, 깊이에 상관없이 모든 폴더들 안에 있는 파일들 중 .graphql로 끝나는 파일들을 모두 가져오기
const allTypes: GraphQLSchema[] = fileLoader(
  path.join(__dirname, "./api/**/*.graphql")
);

// 개발할 떄는 .ts로 끝나는 파일이지만 build 하면 js파일로 변환 되어 충돌을 방지해서 join 하기
const allResolvers = fileLoader(path.join(__dirname, "./api/**/*.resolvers.*"));

const mergedTypes = mergeTypes(allTypes);
const mergedResolvers = mergeResolvers(allResolvers);
const schemas = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers
});

export default schemas;
