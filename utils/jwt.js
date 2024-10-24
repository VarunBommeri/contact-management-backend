import jwt from 'jsonwebtoken';

// Generate JWT token
export function generateToken(user) {
  const payload = { id: user.id, email: user.email };
  const secret = process.env.JWT_SECRET;  // Make sure to define JWT_SECRET in your .env file
  const options = { expiresIn: '1h' };    // Token expiration time

  return jwt.sign(payload, secret, options);
}

// Verify JWT token
export function verifyToken(token) {
  const secret = process.env.JWT_SECRET;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid Token');
  }
}
