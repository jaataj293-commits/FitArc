import { auth } from "./firebase.js";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const phoneSection = document.getElementById("phone-section");
const otpSection = document.getElementById("otp-section");
const sendOtpBtn = document.getElementById("send-otp-btn");
const verifyOtpBtn = document.getElementById("verify-otp-btn");
const backBtn = document.getElementById("back-btn");
const message = document.getElementById("message");

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

sendOtpBtn.addEventListener("click", async () => {
  const phoneNumber = document.getElementById("phone-number").value.trim();
  const appVerifier = window.recaptchaVerifier;

  if (!phoneNumber.startsWith("+")) {
    message.textContent = "Enter phone number with country code, for example +919660040966";
    return;
  }

  try {
    message.textContent = "Sending OTP...";
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;

    phoneSection.style.display = "none";
    otpSection.style.display = "block";
    message.textContent = "OTP sent successfully";
  } catch (error) {
    console.error("Error sending OTP:", error);
    message.textContent = "Could not send OTP. Check number, reCAPTCHA, and Firebase settings.";
  }
});

verifyOtpBtn.addEventListener("click", async () => {
  const code = document.getElementById("otp-code").value.trim();

  if (!code) {
    message.textContent = "Please enter OTP";
    return;
  }

  try {
    message.textContent = "Verifying OTP...";
    await window.confirmationResult.confirm(code);
    message.textContent = "Login successful";
    window.location.href = "main-page.html";
  } catch (error) {
    console.error("Error verifying OTP:", error);
    message.textContent = "Invalid OTP. Try again.";
  }
});

backBtn.addEventListener("click", () => {
  otpSection.style.display = "none";
  phoneSection.style.display = "block";
  message.textContent = "";
});
