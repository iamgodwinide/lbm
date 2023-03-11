import { S3 } from "aws-sdk";

import keys from '../../keys'

export const s3bucket = new S3({
    accessKeyId: keys.s3keys.accessKey,
    secretAccessKey: keys.s3keys.secretKey,
    Bucket: "lbmobilestorage1",
    signatureVersion: 'v4',
});