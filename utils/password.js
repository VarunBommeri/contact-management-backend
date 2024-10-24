import bcrypt from 'bcrypt';

// Hash password
export async function hashPassword(password) {
  const saltRounds = 10;  // Salt rounds for bcrypt
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Compare password with the stored hash
export async function comparePassword(password, hash) {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}
