import { base64ToFileList } from '../lib/fileFormatter';

export const makeSourceToFileList = (fileEnv: 'LOCAL' | 'CLOUD', source: string, fileName: string) => {
  if (fileEnv === 'LOCAL') {
    return base64ToFileList([{ base64: source, fileName, fileType: 'image/jpeg' }]);
  }
};
