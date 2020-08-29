import axios from '@/axios';

export default {
  /**
     * Send request for get images
     * @returns {Array}
     */

  async getImages(index = 1) {
    const res = await axios({
      method: 'get',
      url: `/images?page=${index}`,
    });
    return res;
  },

  /**
   * Send request for get by id image
   * @returns {Object}
   */

  async getImage(id) {
    const res = await axios({
      method: 'get',
      url: `/images/${id}`,
    });
    return res;
  },
};
