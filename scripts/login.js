document
  .getElementById("login-form")
  ?.addEventListener("submit", function (event) {
    validateForm(event, "login");
  });

document
  .getElementById("forgot-password-form")
  ?.addEventListener("submit", function (event) {
    validateForm(event, "forgot-password");
  });

document
  .getElementById("sign-up-form")
  ?.addEventListener("submit", function (event) {
    validateForm(event, "sign-up");
  });

function validateForm(event, formType) {
  let isValid = true;

  document
    .querySelectorAll(".error-message")
    .forEach((error) => (error.textContent = ""));

  const emailField = document.getElementById("email");
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!emailField.value) {
    document.getElementById("email-error").textContent =
      "Your email is required.";
    isValid = false;
  } else if (!emailPattern.test(emailField.value)) {
    document.getElementById("email-error").textContent =
      "Please enter a valid Email (e.g., example@example.com).";
    isValid = false;
  }

  if (formType === "login") {
    const passwordField = document.getElementById("password");
    if (!passwordField.value) {
      document.getElementById("password-error").textContent =
        "Password is required.";
      isValid = false;
    }
  }

  if (formType === "sign-up") {
    const firstNameField = document.getElementById("first-name");
    if (!firstNameField.value) {
      document.getElementById("first-name-error").textContent =
        "Please enter you first name";
      isValid = false;
    }

    const lastNameField = document.getElementById("last-name");
    if (!lastNameField.value) {
      document.getElementById("last-name-error").textContent =
        "Please enter your last name";
      isValid = false;
    }

    const phoneField = document.getElementById("phone");
    const phonePattern = /^[0-9]{10}$/;
    if (!phoneField.value) {
      document.getElementById("phone-error").textContent =
        "You Contact number is required.";
      isValid = false;
    } else if (!phonePattern.test(phoneField.value)) {
      document.getElementById("phone-error").textContent =
        "Please enter a valid 10-digit contact number.";
      isValid = false;
    }

    const dobField = document.getElementById("dob");
    const today = new Date().toISOString().split("T")[0];
    if (!dobField.value) {
      document.getElementById("dob-error").textContent =
        "Please enter your date of birth.";
      isValid = false;
    } else if (dobField.value > today) {
      document.getElementById("dob-error").textContent =
        "Please enter past date";
      isValid = false;
    }
  }

  if (!isValid) {
    event.preventDefault();
  }
}
