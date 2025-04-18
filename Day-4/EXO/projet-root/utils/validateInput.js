function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  
  function isValidPassword(password) {
    return typeof password === 'string' && password.length >= 6;
  }
  
  module.exports = {
    isValidEmail,
    isValidPassword
  };
  