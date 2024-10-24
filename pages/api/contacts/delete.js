// pages/api/contacts/delete.js
import database from '../../../db/database.js';
import { verifyToken } from '../../../utils/jwt.js';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const user = verifyToken(token);
    const db = await database();

    // Soft delete the contact
    await db.run('UPDATE contacts SET deleted = 1 WHERE id = ? AND user_id = ?', [req.query.id, user.id]);

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
}
