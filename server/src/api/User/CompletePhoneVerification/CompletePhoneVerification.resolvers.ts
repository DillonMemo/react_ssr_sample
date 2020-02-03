import { Resolvers } from "../../../types/resolvers";
import {
  CompletePhoneVerificationMutationArgs,
  CompletePhoneVerificationResponse
} from "../../../types/graph";
import Verification from "../../../entities/Verification";
import User from "../../../entities/User";

/**
 * @since 2019.09.22
 * @author dillon Jang
 * @description - 핸드폰 번호가 기존에 검증된 번호인지를 찾고 검증된 번호 일 경우 해당 번호로 등록된 유저가 있는지를 찾는다.
 * @description - 검증된 번호도 없고 해당 번호의 유저도 없거나 검증된 번호는 있으나 유저가 없을 수 있는 경우를 파악하기 위함.
 */
const resolvers: Resolvers = {
  Mutation: {
    CompletePhoneVerification: async (
      _,
      args: CompletePhoneVerificationMutationArgs
    ): Promise<CompletePhoneVerificationResponse> => {
      const { phoneNumber, key } = args;
      try {
        const verification = await Verification.findOne({
          payload: phoneNumber,
          key
        });

        // verification 검증 여부
        if (!verification) {
          return {
            ok: false,
            error:
              "Verification token not valid\n검증 토큰이 유효하지 않습니다.",
            token: null
          };
        } else {
          verification.verified = true;
          verification.save();
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
      // User 찾기
      try {
        const user = await User.findOne({ phoneNumber });

        // user가 존재 여부
        if (user) {
          user.verifiedPhoneNumber = true;
          user.save();

          return {
            ok: true,
            error: null,
            token: "Coming Soon"
          };
        } else {
          // 번호는 Verification 했지만 유저가 존재 하지 않으니 프로필을 업데이트 하도록 유도
          return {
            ok: true,
            error: null,
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
