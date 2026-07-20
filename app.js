import { auth } from "./firebase.js";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged
} from "firebase/auth";

const phoneScreen = document.getElementById("phone-screen");
const otpScreen = document.getElementById("otp-screen");
const sendCodeBtn = document.getElementById("send-code-btn");
const verifyCodeBtn = document.getElementById("verify-code-btn");

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "main-page.html";
  }
});

window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
  size: "normal",
  callback: () => {
    console.log("reCAPTCHA solved");
  }
});

sendCodeBtn.addEventListener("click", async () => {
  const phoneNumber = document.getElementById("phone").value;
  const appVerifier = window.recaptchaVerifier;

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;

    phoneScreen.classList.add("hidden");
    otpScreen.classList.remove("hidden");
  } catch (error) {
    console.error("Error sending OTP:", error);
    alert("Could not send OTP. Check number and try again.");
  }
});

verifyCodeBtn.addEventListener("click", async () => {
  const code = document.getElementById("otp").value;

  try {
    const result = await window.confirmationResult.confirm(code);
    console.log("User logged in:", result.user);
    window.location.href = "main-page.html";
  } catch (error) {
    console.error("Invalid OTP:", error);
    alert("Wrong OTP. Please try again.");
  }
});
