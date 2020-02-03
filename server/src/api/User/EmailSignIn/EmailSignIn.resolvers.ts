import { Resolvers } from "src/types/resolvers";
import { EmailSignInResponse, EmailSignInMutationArgs } from "src/types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args;
      try {
        // 사용자 가저오기
        const user = await User.findOne({ email });
        console.log(user);

        if (!user) {
          return {
            ok: false,
            error: "No User found with that email",
            token: null
          };
        }

        // 입력 받은 패스워드 체크
        const checkPassword = await user.comparePassword(password);

        if (checkPassword) {
          return {
            ok: true,
            error: null,
            token: "Comming Soon"
          };
        } else {
          return {
            ok: false,
            error: "Wrong password\n" + user,
            token: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};
export default resolvers;
