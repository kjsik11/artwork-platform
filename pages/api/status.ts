import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '@utils/connectMongo';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // GET METHOD
    if (req.method === 'GET') {
      const { client } = await connectMongo();
      if (!client.isConnected()) {
        return res.json({
          status: 'disconnected',
          error: 'Server not responding',
        });
      }

      return res.json({ status: 'ok', error: '' });
    }

    return res.status(404).json({ error: '404 not found' });
  } catch (err) {
    return res.status(500).json({ error: err.name, message: err.message });
  }
};

export default handler;
