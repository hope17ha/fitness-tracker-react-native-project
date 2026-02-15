export function validateEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)){
        return 'Invalid email address!'
    }
    
    return null;
}

export function validateRegister({ username, email, password, rePassword }) {
    if (!username) return "Username required";
  
    const emailError = validateEmail(email);
    if (emailError) return emailError;
  
    if (password.length < 6) return "Password too short";
  
    if (password !== rePassword) return "Passwords do not match";
  
    return null;
  }
  
  