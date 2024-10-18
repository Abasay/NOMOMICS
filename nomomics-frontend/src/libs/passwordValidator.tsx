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

