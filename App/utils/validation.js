import {upperFirst} from 'lodash';

function checkField(field, data) {
  if (data === '') {
    if (field == 'phoneNumber') field = 'Phone Number';
    if (field == 'firstName') field = 'Firstname';
    if (field == 'lastName') field = 'Lastname';
    if (field == 'email') field = 'Email';

    return `${field} cannot be empty`;
  }
  if (field === 'email') {
    if (!isValidEmailFormat(data)) {
      return 'Enter valid email address';
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
  if (data === '') {
    return 'Password cannot be empty';
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
  var re = /^.{8,50}$/;
  return re.test(data);
}
function isValidEmailFormat(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// function isValidPasswordFormat(password) {
//   var re = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%?=*&]).{8,20})/;
//   return re.test(password);
// }

// function isValidFullname(name) {
//   if (name.length == 0) return 'fullname cannot be empty';
//   if (name.length <= 1) return `${name} length should be greater than 1`;
//   return true;
// }
function isValidPhoneNumber(number) {
  if (number.length != 10) {
    return 'Phone number should be of 10 digit';
  }
  if (!/^[89]\d{9}$/.test(number)) {
    return 'Phone Number must start with 8 or 9';
  }
  return true;
}

let formatText = (text, field) => {
  let finalText = '';
  return new Promise((resolve, reject) => {
    if (field === 'firstName' || field === 'lastName') {
      finalText = upperFirst(text);
      resolve(finalText);
    } else if (field === 'email') {
      finalText = text.toLowerCase();
      resolve(finalText);
    } else if (field === 'phoneNumber') {
      finalText = text
        .replace(/[^\dA-Z]/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim();
      resolve(finalText);
    }
    resolve(text);
  });
};

export {
  formatText,
  calculatePasswordScore,
  // isValidFullname,
  checkField,
  isValidPhoneNumber,
  isValidEmailFormat,
  validPassword,
};
