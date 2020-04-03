// severity: error/info/success/warning - alert/flash message type shown
const responses = {};

responses.invalidCredentials = {
  message: "Your Password or Email is Incorrect",
  severity: "error"
};

responses.loginSuccess = {
  message: "Login successful",
  severity: "success"
};

responses.loggedOut = {
  message: "You have been logged out",
  severity: "success"
};

responses.registerFormInputError = {
  message: "Input is invalid",
  severity: "error"
};

responses.registerEmailExists = {
  message: "Email already exists",
  severity: "error"
};

responses.userCreated = name => {
  return { message: `User "${name}" Created`, severity: "success" };
};

responses.serverError = { message: "server error", severity: "error" };

module.exports = responses;
