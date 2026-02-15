export function validateEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)){
        return 'Invalid email address!'
    }
    
    return null;
}

export function validatePassword({ password, rePassword }) {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password too short";
    if (password !== rePassword) return "Passwords do not match";
    return null;
}


export function validateRegister({ username, email, password, rePassword }) {
    if (!username) return "Username required";
  
    const emailError = validateEmail(email);
    if (emailError) return emailError;
  
    const passError = validatePassword({password, rePassword});
    if (passError) return passError;
  
    return null;
  }
  
  