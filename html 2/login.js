// ============================================================
// MediPath — login page logic (login.html)
//
// Simple welcome login (demo project): koi fixed email ya
// password nahi hai — jo naam, email/number aur password
// likho ge, usi se login ho jayega. Naam sirf home page ke
// greeting banner mein dikhane ke liye save hota hai.
// (Asal project mein asal credential check server par hota.)
// ============================================================

// Already logged in? Skip straight to the site.
try {
  if (localStorage.getItem("medipath_user")) {
    window.location.replace("index.html");
  }
} catch {
  /* storage blocked — stay on the login page */
}

const form = document.getElementById("loginForm");
const errorBox = document.getElementById("loginError");

// Show / hide password toggle (the eye button inside the password field)
const pwInput = document.getElementById("loginPassword");
const toggleBtn = document.getElementById("togglePassword");
toggleBtn.addEventListener("click", () => {
  const show = pwInput.type === "password";
  pwInput.type = show ? "text" : "password";
  toggleBtn.textContent = show ? "🙈" : "👁️";
  toggleBtn.setAttribute(
    "aria-label",
    show ? "Hide password" : "Show password",
  );
  toggleBtn.setAttribute("title", show ? "Hide password" : "Show password");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  errorBox.classList.remove("show");

  const name = document.getElementById("loginName").value.trim();
  const identifier = document.getElementById("loginId").value.trim();
  const password = document.getElementById("loginPassword").value;
  const visitAs = document.getElementById("loginRole").value;

  if (!name || !identifier || !password) {
    errorBox.textContent =
      "Please fill in your name, email/number and password.";
    errorBox.classList.add("show");
    return;
  }

  try {
    localStorage.setItem(
      "medipath_user",
      JSON.stringify({
        name: name,
        contact: identifier,
        visitAs: visitAs,
        loggedInAt: new Date().toISOString(),
      }),
    );
  } catch {
    errorBox.textContent =
      "Browser storage is blocked, so the login could not be saved.";
    errorBox.classList.add("show");
    return;
  }

  window.location.href = "index.html";
});
