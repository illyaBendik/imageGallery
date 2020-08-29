import axios from '@/axios';

export default {
  /**
     * Send request for get token
     * @returns {Object}
     */
  async getToken() {
    const res = await axios.post('/auth', { apiKey: process.env.VUE_APP_API_KEY });
    return res;
  },
};
