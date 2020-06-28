function checkField(field, data) {
  if (data === '') {
    if (field == 'phoneNumber') field = 'Phone number';
    if (field == 'firstName') field = 'First name';
    if (field == 'lastName') field = 'Last name';
    if (field == 'email') field = 'Email';
    if (field == 'password') field = 'Password';
    if (field === 'oldPassword') field = 'Old Password';
    if (field === 'newPassword') field = 'New Password';
    if (field === 'confirmPassword') field = 'Confirm Password';
    return `${field} is required`;
  }
  if (field === 'email') {
    if (!isValidEmailFormat(data)) {
      return 'Email is required';
    }
    return true;
  }

  if (field === 'phoneNumber') {
    return isValidPhoneNumber(data.replace(/\s/g, ''));
  }
  return true;
}

let passwordScore = score => {
  score.pop();
  score.unshift(0);
};

function calculatePasswordScore(text, isValid) {
  let score = [-1, -1, -1, -1];
  if (text.length > 0) {
    if (!isValid.includes('1 digit')) passwordScore(score);
    if (!isValid.includes('1 special character')) passwordScore(score);
    if (!isValid.includes('1 capital alphabet')) passwordScore(score);
    if (!isValid.includes('min 8 characters')) passwordScore(score);
  } else {
    score = [-1, -1, -1, -1];
  }
  return score;
}

function validPassword(field, data) {
  let finalMessage = '';
  if (data === '' && field === "password") {
    return 'Password is required';
  }
  if(data === '' && field === "newPassword"){
    return 'New Password is required'
  }
  if(data === '' && field === 'confirmPassword'){
    return 'Confirm Password is required'
  }
  if(data === '' && field === 'oldPassword'){
    return 'Old Password is required'
  }
  if (!digit(data)) {
    if (finalMessage.length !== 0) {
      finalMessage = finalMessage.concat(', ');
    }
    finalMessage = finalMessage.concat('1 digit');
  }
  if (!specChar(data)) {
    if (finalMessage.length !== 0) {
      finalMessage = finalMessage.concat(', ');
    }
    finalMessage = finalMessage.concat('1 special character');
  }
  if (!char(data)) {
    if (finalMessage.length !== 0) {
      finalMessage = finalMessage.concat(', ');
    }
    finalMessage = finalMessage.concat('1 capital alphabet');
  }
  if (!maxMin(data)) {
    if (finalMessage.length !== 0) {
      finalMessage = finalMessage.concat(', ');
    }
    finalMessage = finalMessage.concat('min 8 characters');
  }
  if (finalMessage.length > 0) {
    finalMessage = 'Should contain at least ' + finalMessage;
  }
  return finalMessage;
}

function digit(data) {
  var re = /\d/;
  return re.test(data);
}

function specChar(data) {
  var re = /[$&+_,:;=?@#|'<>{}.^*()%!\-]/;
  return re.test(data);
}
function char(data) {
  var re = /.*[A-Z].*/;
  return re.test(data);
}
function maxMin(data) {
  var re = /^.{8,30}$/;
  return re.test(data);
}
function isValidEmailFormat(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function isValidPhoneNumber(number) {
  if (number.length != 10) {
    return 'Phone number should be of 10 digit';
  }
  if (!/^[6789]\d{9}$/.test(number)) {
    return 'Phone number should start with 6, 7, 8 or 9';
  }
  return true;
}

let formatText = (text, field) => {
  let finalText = '';
  return new Promise((resolve, reject) => {
    if (field === 'email') {
      finalText = text.toLowerCase();
      resolve(finalText);
    } else if (field === 'phoneNumber') {
      finalText = text
        .replace(/[^\dA-Z]/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim();
      resolve(finalText.slice(0, 12));
    }
    resolve(text);
  });
};

export {
  formatText,
  calculatePasswordScore,
  checkField,
  isValidPhoneNumber,
  isValidEmailFormat,
  validPassword,
  digit,
};
