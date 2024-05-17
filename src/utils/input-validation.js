//Set regExp for email validation
const regExpForEmail = /[-.\w]+@([\w-]+\.)+[\w-]+/;

//Set regExp for login validation
const regExpForLogin = /^[\w.@+-]+$/;

export const emailValidator = val => {
  const isMatched = val.match(regExpForEmail);
  const isValueValid = isMatched
    ? val.match(regExpForEmail)[0] === val && val.length <= 254
    : false;
  return isValueValid;
};

export const loginValidator = val => {
  const isMatched = val.match(regExpForLogin);
  const isValueValid = isMatched
    ? val.match(regExpForLogin)[0] === val && val.length <= 150
    : false;
  return isValueValid;
};

export const passwordValidator = val => {
  const isValueValid = val.length > 0 && val.length <= 128;
  return isValueValid;
};

export const subjectValidator = val => {
  const isValueValid = val.length > 0 && val.length <= 255;
  return isValueValid;
};

export const messageValidator = val => {
  const isValueValid = val.length > 0 && val.length <= 500;
  return isValueValid;
};
