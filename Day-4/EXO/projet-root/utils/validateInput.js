function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  
  function isValidPassword(password) {
    return password.length >= 6;
  }
  
  module.exports = { isValidEmail, isValidPassword };
  