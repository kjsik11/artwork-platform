import { NextApiResponse } from 'next';
import multer from 'multer';
import sharp from 'sharp';
import isNumeric from 'validator/lib/isNumeric';
import sha256 from 'sha256';
import { v4 as uuidv4 } from 'uuid';
import connectMongo from '@utils/connectMongo';
import runMiddleware from '@utils/runMiddleware';
import { uploadS3 } from '@utils/aws';
import { timeStamp } from '@utils/time';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: RequestWithFile, res: NextApiResponse) => {
  try {
    const { db } = await connectMongo();
    const { AWS_BUCKET_NAME } = process.env;

    if (!AWS_BUCKET_NAME) {
      throw new Error(`Can't find AWS_BUCKET_NAME`);
    }

    // GET METHOD
    if (req.method === 'GET') {
      const {
        query: { sort },
      } = req;

      const artworks = await db
        .collection('artwork')
        .find(JSON.parse(JSON.stringify({ sort })))
        .toArray();

      return res.json({ artworks, error: '' });
    }

    // POST METHOD
    if (req.method === 'POST') {
      await runMiddleware(req, res, upload.single('image'));

      if (!req.file) return res.status(400).json({ error: 'File empty' });

      const {
        title,
        name,
        material,
        description,
        year,
        width,
        height,
      } = req.body;

      if (!name || !title || !material)
        return res.status(400).json({ error: 'Missing some required fields' });
      if (year && (!isNumeric(year) || year.length !== 4))
        return res.status(400).json({
          error: 'Invalid year format (need 4 length numeric string)',
        });
      if ((width && !isNumeric(width)) || (height && !isNumeric(height)))
        return res.status(400).json({ error: 'Invalid numeric length' });

      const sharpImage = await sharp(req.file.buffer)
        .clone()
        .resize({
          fit: 'inside',
          width: 2000,
          height: 2000,
          withoutEnlargement: true,
        })
        .jpeg({ quality: 75, chromaSubsampling: '4:4:4' })
        .toBuffer();

      const sharpThumbImage = await sharp(req.file.buffer)
        .clone()
        .resize({
          fit: 'cover',
          width: 300,
          height: 300,
          withoutEnlargement: false,
        })
        .jpeg({ quality: 60, chromaSubsampling: '4:4:4' })
        .toBuffer();

      const fileName = `${sha256(uuidv4())}.jpg`;

      const uploadResult = (await uploadS3(
        AWS_BUCKET_NAME,
        `${process.env.NODE_ENV === 'production' ? 'pro/' : 'dev/'}${fileName}`,
        sharpImage,
      )) as { Location: string };

      const uploadThumbResult = (await uploadS3(
        AWS_BUCKET_NAME,
        `${
          process.env.NODE_ENV === 'production' ? 'pro/thumb/' : 'dev/thumb/'
        }${fileName}`,
        sharpThumbImage,
      )) as { Location: string };

      if (process.env.NODE_ENV === 'development') {
        console.log('upload result:', uploadResult);
        console.log('thumb upload result:', uploadThumbResult);
      }

      const { insertedId } = await db.collection('artwork').insertOne(
        JSON.parse(
          JSON.stringify({
            url: uploadResult.Location,
            thumbUrl: uploadThumbResult.Location,
            title,
            name,
            material,
            description: description ?? '',
            year: year && Number(year),
            width: width && Number(width),
            height: height && Number(height),
            viewCount: 0,
            lastUpdated: timeStamp(),
            created: timeStamp(),
          }),
        ),
      );

      return res.json({ artworkId: insertedId, error: '' });
    }

    return res.status(404).json({ error: '404 not found' });
  } catch (err) {
    return res.status(500).json({ error: err.name, message: err.message });
  }
};

export default handler;
