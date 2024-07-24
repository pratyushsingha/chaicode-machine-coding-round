import { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 4, onOtpSubmit }) => {
  const inputRef = useRef([]);
  const [otp, setOtp] = useState(new Array(length).fill(""));

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const finalOtp = newOtp.join("");
    if (finalOtp.length === length) {
      onOtpSubmit(finalOtp);
    }

    if (value && index < length - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRef.current[index - 1]
    ) {
      inputRef.current[index - 1].focus();
    }
  };

  return otp.map((value, index) => (
    <input
      key={index}
      ref={(input) => (inputRef.current[index] = input)}
      type="number"
      className="optInput w-10 h-10 rounded-lg text-lg my-2"
      value={value}
      onChange={(e) => handleChange(index, e)}
      onKeyDown={(e) => handleKeyDown(index, e)}
    />
  ));
};

export default OtpInput;
