import S3 from 'aws-sdk/clients/s3.js';

const s3 = new S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  region: 'us-east-1',
});

export const uploadFile = ({ file, name }) => {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: name,
    Body: file,
  };

  return s3
    .upload(params, (err, data) => {
      if (err) {
        throw err;
      }
      return data;
    })
    .promise();
};
