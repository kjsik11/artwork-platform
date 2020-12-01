import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo, { ObjectId } from '@utils/connectMongo';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { artworkId },
  } = req;

  try {
    const { db } = await connectMongo();

    const artwork = await db
      .collection('artwork')
      .findOne(new ObjectId(artworkId as string));

    if (!artwork) return res.status(404).json({ error: 'No such artwork' });

    // GET METHOD
    if (req.method === 'GET') {
      return res.json({ artwork, error: '' });
    }

    // DELETE METHOD
    if (req.method === 'DELETE') {
      const { result } = await db
        .collection('artwork')
        .deleteOne({ _id: new ObjectId(artwork._id) });

      return res.json({ result, error: '' });
    }

    return res.status(404).json({ error: '404 not found' });
  } catch (err) {
    return res.status(500).json({ error: err.name, message: err.message });
  }
};

export default handler;
