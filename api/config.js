import { getPublicConfig } from '../lib/portfolio-assistant.js';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed. Use GET.' });
    return;
  }
  res.status(200).json(getPublicConfig());
}
