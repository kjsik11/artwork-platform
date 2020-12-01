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

    // POST METHOD
    if (req.method === 'POST') {
      const { result } = await db.collection('artwork').updateOne(
        { _id: new ObjectId(artwork._id) },
        {
          $inc: {
            viewCount: 1,
          },
        },
      );

      return res.json({ result, error: '' });
    }

    return res.status(404).json({ error: '404 not found' });
  } catch (err) {
    return res.status(500).json({ error: err.name, message: err.message });
  }
};

export default handler;
