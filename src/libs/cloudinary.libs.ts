import { configs } from '@/config';
import cloduinary from 'cloudinary';

// Configues the cloudinary SDK
cloduinary.v2.config(configs.cloudinary);

class Cloudinary {
  static uploadSingle = async (filePath: string) => {
    const { secure_url } = await cloduinary.v2.uploader.upload(filePath);
    return { url: secure_url };
  };

  static deleteSingle = async (url: string) => {
    return cloduinary.v2.uploader.destroy(url);
  };

  static uploadMultiple = async (filePaths: string[]) => {
    const result = Promise.all(filePaths.map((path) => this.uploadSingle(path)));
    if (!result) throw new Error('cannot upload');
    return result;
  };

  static deleteMultiple = async (urls: string[]) => {
    return cloduinary.v2.api.delete_resources(urls);
  };
}

export default Cloudinary;
