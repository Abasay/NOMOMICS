const passwordLetterRegex = /^(?=.*[a-z])/;
const passwordCapitalLetterRegex = /^(?=.*[A-Z])/;
const passwordNumberRegex = /^(?=.*[0-9])/;
const passwordSpecialCharacterRegex = /^(?=.*[!@#$%^&*])/;

export const passwordValidator = (password: string) => {
  if (!passwordLetterRegex.test(password)) {
    return 0;
  }
  if (!passwordCapitalLetterRegex.test(password)) {
    return 20;
  }
  if (!passwordNumberRegex.test(password)) {
    return 40;
  }
  if (!passwordSpecialCharacterRegex.test(password)) {
    return 60;
  }
  if (password.length < 8) {
    return 80;
  }
  return 100;
};

export const passwordStrength = (password: string) => {
  const strength = passwordValidator(password);
  if (strength < 20) {
    return 'Password must contain at least one lowercase letter';
  }
  if (strength < 40) {
    return 'Password must contain at least one uppercase letter';
  }
  if (strength < 60) {
    return 'Password must contain at least one number';
  }
  if (strength < 80) {
    return 'Password must contain at least one special character';
  }
  return 'valid';
};
