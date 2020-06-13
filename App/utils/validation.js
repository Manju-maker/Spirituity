function checkField(field, data) {
  if (data === '') {
    console.log('insise dataaa', data);
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
  }

  if (field === 'phoneNumber') {
    return isValidPhoneNumber(data);
  }
  return true;
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

function isValidPasswordFormat(password) {
  var re = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%?=*&]).{8,20})/;
  return re.test(password);
}

function isValidFullname(name) {
  if (name.length == 0) return 'fullname cannot be empty';
  if (name.length <= 1) return `${name} length should be greater than 1`;
  return true;
}
function isValidPhoneNumber(number) {
  if (/^[0-9]*$/.test(number)) {
    if (number.length != 10) return 'Phone number should be of 10 digit';
    return true;
  }
  return 'Please enter valid Phone number';
}

export {
  isValidFullname,
  checkField,
  isValidPhoneNumber,
  isValidEmailFormat,
  validPassword,
};
