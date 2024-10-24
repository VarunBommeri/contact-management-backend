// pages/api/auth/register.js
import database from '../../../db/database.js';
import { hashPassword } from '../../../utils/password.js';
import { generateToken } from '../../../utils/jwt.js';
import { registrationSchema, validateUserInput } from '../../../utils/validation.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Validate user input
    const validatedData = validateUserInput(req.body, registrationSchema);
    const { name, email, password } = validatedData;

    const db = await database();

    // Check if user already exists
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', email);
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password and store the user
    const hashedPassword = await hashPassword(password);
    const result = await db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    // Generate JWT token
    const token = generateToken({ id: result.lastID, email });
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
}
