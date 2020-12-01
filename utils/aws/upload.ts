import s3 from './s3';

const upload = async (bucket: string, fileName: string, body: Buffer) => {
  return new Promise((resolve, reject) => {
    s3.upload(
      {
        Bucket: bucket,
        Key: fileName,
        Body: body,
        ACL: 'public-read',
      },
      (err, data) => {
        if (err) reject(err);
        else resolve(data);
      },
    );
  });
};

export default upload;
