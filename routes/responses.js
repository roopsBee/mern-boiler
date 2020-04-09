// severity: error/info/success/warning - indicates type of flash message shown
const responses = {};

responses.invalidCredentials = {
  message: "Your Password or Email is Incorrect",
  severity: "error",
};

responses.loginSuccess = {
  message: "Login successful",
  severity: "success",
};

responses.loggedOut = {
  message: "You have been logged out",
  severity: "success",
};

responses.registerEmailExists = {
  message: "Email already exists",
  severity: "error",
};

responses.userCreated = (name) => {
  return { message: `User "${name}" Created`, severity: "success" };
};

responses.serverError = { message: "server error", severity: "error" };

responses.notLoggedIn = {
  message: "You are not logged in",
  severity: "error",
};

responses.alreadyLoggedIn = {
  message: "You are already logged in",
  severity: "error",
};

// Lists

responses.fetchedLists = {
  message: "Lists Fetched",
  severity: "success",
};

responses.createList = {
  message: "New List Created",
  severity: "success",
};

responses.nameExists = {
  message: "That name already exists",
  severity: "error",
};

responses.notOwnerOfList = {
  message: "That is not your list",
  severity: "error",
};

responses.listNotFound = {
  message: "List not found",
  severity: "error",
};

responses.listDeleted = {
  message: "List has been deleted",
  severity: "success",
};

// items

responses.itemDeleted = {
  message: "Item has been deleted",
  severity: "success",
};

responses.invalidRequest = {
  message: "Invalid request",
  severity: "error",
};

//validation
responses.validationError = {
  message: "Data did not pass validation",
  severity: "error",
};

module.exports = responses;
