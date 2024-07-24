import Container from "../components/Container";
import "../index.css";
import OtpInput from "../components/OtpInput";
import { useState } from "react";

const OtpFormPage = () => {
  const [finalOtp, setFinalOtp] = useState("");
  const [isVerified, setIsVerified] = useState(null);

  const onOtpSubmit = (otp) => {
    setFinalOtp(otp);
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    if (finalOtp === "1234") {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
    setTimeout(() => {
      setIsVerified(null);
    }, 3000);
  };

  return (
    <Container bg="bg-blue-500" textColor="text-white">
      <section className="flex justify-center items-center ">
        <div className="bg-white rounded-2xl  p-10 flex justify-center flex-col items-center">
          <h2 className="h2">Mobile Phone Verification</h2>
          <p>
            Enter the 4-digit verification code that was sent to your phone
            number.
          </p>
          <form onSubmit={verifyOtp}>
            <div className="flex justify-center">
              <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
            </div>
            <br />
            <button
              className={`px-10 py-2 rounded-md text-white ${
                isVerified === null
                  ? "bg-[#112D4E]"
                  : isVerified
                  ? "bg-green-500"
                  : "bg-red-600"
              }`}
              type="submit"
              disabled={finalOtp === ""}
            >
              {isVerified === null
                ? "verify account"
                : isVerified
                ? "verification successful"
                : "verification failed"}
            </button>
          </form>
          <p className={`${isVerified ? "hidden" : "block"}`}>
            Didn't recieve code? <span className="text-[#112D4E]">Resend</span>
          </p>
        </div>
      </section>
    </Container>
  );
};

export default OtpFormPage;
