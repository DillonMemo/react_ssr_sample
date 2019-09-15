import { SayHelloResponse, SayHelloQueryArgs } from "../../../types/graph";

/**
 * @param {parent} - 1
 * @param {args} - 2
 * @param {context} - 3
 * @description 기본적으로 resolver는 위의 파라메터를 받아온다.
 */

const resolvers = {
  Query: {
    /**
     * @param {_} - Empty
     * @param {args} - this type is SayHelloQueryArgs
     */
    sayHello: (_, args: SayHelloQueryArgs): SayHelloResponse => {
      return {
        error: false,
        text: `Hello ${args.name}`
      };
    }
  }
};

export default resolvers;
