import { SayHelloQueryArgs, SayHelloResponse } from "src/types/graph";

const resolvers = {
  Query: {
    sayHello: (_, args: SayHelloQueryArgs): SayHelloResponse => ({
      error: false,
      text: `Hello ${args.name}`
    })
  }
};

export default resolvers;
