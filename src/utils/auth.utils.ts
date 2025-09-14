// Authentication utility functions

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Character variety checks
  if (/(?=.*[a-z])/.test(password)) score += 1;
  if (/(?=.*[A-Z])/.test(password)) score += 1;
  if (/(?=.*\d)/.test(password)) score += 1;
  if (/(?=.*[@$!%*?&])/.test(password)) score += 1;
  
  // Bonus for very long passwords
  if (password.length >= 16) score += 1;
  
  const strengthMap = {
    0: { label: 'Very Weak', color: 'hsl(var(--destructive))' },
    1: { label: 'Very Weak', color: 'hsl(var(--destructive))' },
    2: { label: 'Weak', color: 'hsl(25 95% 53%)' }, // Orange
    3: { label: 'Fair', color: 'hsl(45 93% 47%)' }, // Yellow
    4: { label: 'Good', color: 'hsl(142 71% 45%)' }, // Green
    5: { label: 'Strong', color: 'hsl(142 71% 45%)' },
    6: { label: 'Very Strong', color: 'hsl(142 71% 45%)' },
    7: { label: 'Excellent', color: 'hsl(142 71% 45%)' },
  };
  
  const result = strengthMap[Math.min(score, 7) as keyof typeof strengthMap];
  
  return {
    strength: Math.min(score, 7),
    label: result.label,
    color: result.color,
  };
};

export const formatAuthError = (error: unknown): string => {
  if (error instanceof Error) {
    // Map common backend error messages to user-friendly ones
    const errorMap: Record<string, string> = {
      'Invalid credentials': 'Invalid email or password',
      'User not found': 'No account found with this email',
      'Email already exists': 'An account with this email already exists',
      'Token expired': 'This link has expired. Please request a new one',
      'Invalid token': 'Invalid or expired link',
      'Rate limit exceeded': 'Too many attempts. Please try again later',
    };
    
    return errorMap[error.message] || error.message;
  }
  
  return 'An unexpected error occurred';
};

export const generateSecurePassword = (): string => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '@$!%*?&';
  
  const allChars = lowercase + uppercase + numbers + symbols;
  
  let password = '';
  
  // Ensure at least one character from each category
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  // Fill the rest randomly
  for (let i = password.length; i < 12; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => 0.5 - Math.random()).join('');
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};