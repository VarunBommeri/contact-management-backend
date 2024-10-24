// pages/api/contacts/add.js
import database from '../../../db/database.js';
import { validateUserInput } from '../../../utils/validation.js';
import { contactSchema } from '../../../utils/contactValidation.js';
import { verifyToken } from '../../../utils/jwt.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const user = verifyToken(token);

    // Validate input
    const validatedData = validateUserInput(req.body, contactSchema);
    const { name, email, phone, address, timezone } = validatedData;

    const db = await database();

    // Insert contact into the database
    const result = await db.run(
      'INSERT INTO contacts (user_id, name, email, phone, address, timezone) VALUES (?, ?, ?, ?, ?, ?)',
      [user.id, name, email, phone, address, timezone]
    );

    res.status(201).json({ message: 'Contact added successfully', contactId: result.lastID });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
}
