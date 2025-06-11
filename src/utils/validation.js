export const checkValidEmail = (email) => {
  let isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  if (!isEmailValid) {
    return "Email id is not valid";
  }

  return null;
};

export const checkValidPassword = (password) => {
  let isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isPasswordValid) {
    return "Password is not valid";
  }

  return null;
};
