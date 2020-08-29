import ImagesService from '@/services/ImagesService';

export default {
  state: {
    images: new Map(),
    detailInfoImage: new Map(),
    currentImageId: null,
    currentPage: 0,
    pageCount: 1,
  },
  getters: {
    getPageCount: (state) => state.pageCount,
    getCurrentPage: (state) => state.currentPage,
    getCurrentPageImages: (state) => (p = state.currentPage) => state.images.get(p) || [],
    getCurrentImage: (state) => (p = state.currentImageId) => state.detailInfoImage.get(p) || null,
  },
  mutations: {
    SET_IMAGES(state, payload) {
      state.images.set(payload.page, payload.pictures);
    },
    SET_CURRENT_PAGE(state, payload) {
      state.currentPage = payload.page;
    },
    SET_PAGE_COUNT(state, payload) {
      state.pageCount = payload.pageCount;
    },
    SET_IMAGE_DETAIL(state, payload) {
      state.detailInfoImage.set(payload.id, payload);
    },
    SET_CURRENT_IMAGE_ID(state, payload) {
      state.currentImageId = payload.id;
    },
  },
  actions: {
    async GET_IMAGES(context, paylod) {
      try {
        const res = await ImagesService.getImages(paylod);
        context.commit('SET_IMAGES', res.data);
        context.commit('SET_CURRENT_PAGE', res.data);
        context.commit('SET_PAGE_COUNT', res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async GET_IMAGE(context, paylod) {
      try {
        const res = await ImagesService.getImage(paylod);
        context.commit('SET_IMAGE_DETAIL', res.data);
        context.commit('SET_CURRENT_IMAGE_ID', res.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
