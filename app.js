import { auth } from "./firebase.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
  size: "normal"
});

document.getElementById("send-code-btn").addEventListener("click", async () => {
  const phoneNumber = document.getElementById("phone").value;
  const appVerifier = window.recaptchaVerifier;

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;

    document.getElementById("phone-screen").style.display = "none";
    document.getElementById("otp-screen").style.display = "block";
  } catch (error) {
    alert("Failed to send code");
  }
});

document.getElementById("verify-code-btn").addEventListener("click", async () => {
  const code = document.getElementById("otp").value;

  try {
    await window.confirmationResult.confirm(code);
    window.location.href = "main-page.html";
  } catch (error) {
    alert("Invalid code");
  }
});
