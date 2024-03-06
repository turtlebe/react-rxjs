import { randomUUID } from 'crypto';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { parseISO, addSeconds, hoursToSeconds } from 'date-fns';

function getExpiryDate(signedUrl: string) {
  const url = new URL(signedUrl);
  const amzDate = url.searchParams.get('X-Amz-Date');
  const amzExpireSeconds = url.searchParams.get('X-Amz-Expires');
  if (amzDate && amzExpireSeconds) {
    try {
      const startDate = parseISO(amzDate);
      const seconds = Number(amzExpireSeconds);
      return addSeconds(startDate, seconds);
    } catch (err) {
      console.warn(err);
    }
  }
  console.warn(
    `Couldn't parse/figure out date from Date [${amzDate}] with Seconds [${amzExpireSeconds}]`
  );
  return `${amzDate} + ${amzExpireSeconds} Seconds`;
}

async function generateSignedUrls() {
  const client = new S3Client({
    credentials: {
      accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
      secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
    },
  });

  const objectKey = `local-dev/${process.env.USER}/ui/uploads/${randomUUID()}`;
  const objectParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: objectKey,
  };

  const putCommand = new PutObjectCommand(objectParams);
  const getCommand = new GetObjectCommand(objectParams);

  const putUrl = await getSignedUrl(client, putCommand, { expiresIn: hoursToSeconds(72) });
  const getUrl = await getSignedUrl(client, getCommand, { expiresIn: hoursToSeconds(72) });

  return {
    put: {
      url: putUrl,
      expires: getExpiryDate(putUrl),
    },
    get: {
      url: getUrl,
      expires: getExpiryDate(getUrl),
    },
    objectKey,
  };
}

function configDotEnv() {
  const env = config();
  expand(env);
}

configDotEnv();
generateSignedUrls()
  .then((urls) => {
    console.log(`Your pre-signed URLs:\n\n${JSON.stringify(urls, null, 2)}`);
  })
  .catch((error) => console.error(error));
