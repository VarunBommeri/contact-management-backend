// pages/api/contacts/index.js
import database from '../../../db/database.js';
import { verifyToken } from '../../../utils/jwt.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const user = verifyToken(token);
    const db = await database();

    // Get contacts for the logged-in user
    const contacts = await db.all('SELECT * FROM contacts WHERE user_id = ? AND deleted = 0', [user.id]);

    res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
}
