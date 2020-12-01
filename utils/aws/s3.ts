import { config, S3 } from 'aws-sdk';

const { AWS_KEY_ID, AWS_SECRET } = process.env;

if (!AWS_KEY_ID || !AWS_SECRET) console.error('No credentials');

// Set the region (other credentials are in process.env)
config.update({ region: 'ap-northeast-2' });

// Create S3 service object
const s3 = new S3({
  accessKeyId: AWS_KEY_ID,
  secretAccessKey: AWS_SECRET,
  apiVersion: '2006-03-01',
});

export default s3;
