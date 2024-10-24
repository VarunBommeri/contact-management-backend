// pages/api/contacts/update.js
import database from '../../../db/database.js';
import { verifyToken } from '../../../utils/jwt.js';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const user = verifyToken(token);
    const { name, email, phone, address, timezone } = req.body;

    const db = await database();

    // Update the contact in the database
    await db.run(
      'UPDATE contacts SET name = ?, email = ?, phone = ?, address = ?, timezone = ? WHERE id = ? AND user_id = ?',
      [name, email, phone, address, timezone, req.query.id, user.id]
    );

    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
}
