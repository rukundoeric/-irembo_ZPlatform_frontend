/* eslint-disable camelcase */
import { axiosUplaod as axios } from '../api/_axios';
import { Constants } from '../helpers';

const { images_directory } = Constants;
export default function useFileUpload() {
  const upload = async (file, callback) => {
    if (!file) { return callback(null, { url: undefined }); }
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
      const { data } = await axios.post(images_directory, uploadData);
      return callback(null, data);
    } catch (error) {
      return callback(error);
    }
  };
  return upload;
}
