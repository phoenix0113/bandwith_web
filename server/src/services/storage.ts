import { S3 } from 'aws-sdk';
import { createReadStream, unlink } from 'fs';
import Queue from 'promise-queue';

interface StorageOptions {
  bucket: string;
  key: string;
  secret: string;
  endpoint?: string;
}

export class StorageHandler {
  private static instance: StorageHandler;
  private readonly s3: S3;
  private readonly options: StorageOptions;
  private readonly queue: Queue;

  constructor(options: StorageOptions) {
    this.options = options;
    this.queue = new Queue(3);
    this.s3 = new S3({
      accessKeyId: options.key,
      secretAccessKey: options.secret,
      params: { Bucket: options.bucket },
      ...(options.endpoint
        ? {
            endpoint: options.endpoint,
            s3ForcePathStyle: true, // needed with minio?
            signatureVersion: 'v4',
          }
        : {}),
    });
  }

  async init() {
    const data = await this.s3
      .createBucket({ Bucket: this.options.bucket })
      .promise()
      .catch((err) => {
        if (err && err.statusCode == 409) {
          console.log('Bucket has been created already');
        }
      });
    if (data) {
      console.log('Bucket Created Successfully', data.Location);
    }
  }

  static async init(options: StorageOptions): Promise<void> {
    StorageHandler.instance = new StorageHandler(options);
    await StorageHandler.instance.init();
  }
  static get(): StorageHandler {
    return StorageHandler.instance;
  }

  async upload(
    p: string,
    key: string,
    contentType: string,
    callback?: () => void
  ): Promise<void> {
    await this.queue
      .add(() => {
        return this.uploadInternal(p, key, contentType, callback);
      })
      .then(() => console.log('upload success', key))
      .catch((e) => console.log('upload error', key, e));
  }
  async uploadInternal(
    p: string,
    key: string,
    contentType: string,
    callback?: () => void
  ): Promise<void> {
    await this.s3
      .upload({
        Body: createReadStream(p),
        Bucket: this.options.bucket,
        Key: key,
        ContentType: contentType,
      })
      .promise();
    await StorageHandler.unlinkPromise(p);
    if (callback) {
      callback();
    }
  }

  static unlinkPromise(filePath): Promise<void> {
    return new Promise((resolve) => {
      unlink(filePath, () => {
        resolve();
      });
    });
  }

  async signedUrl(key: string): Promise<string> {
    return this.s3.getSignedUrlPromise('getObject', {
      Bucket: this.options.bucket,
      Key: key,
    });
  }
}
