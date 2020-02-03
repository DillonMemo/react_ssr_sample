import Twilio from "twilio";

const twilioClient = Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

// 어떠한 메시지든 전송하는 함수
export const sendSMS = (to: string, body: string) => {
  return twilioClient.messages.create({
    body,
    to,
    from: process.env.TWILIO_PHONE
  });
};

// Verification(검증) 텍스트 메시지를 전송하는 함수
export const sendVerificationSMS = (to: string, key: string) =>
  sendSMS(to, `Your verification key is : ${key}`);
