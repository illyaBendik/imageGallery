import Vue from 'vue';
import Vuex from 'vuex';
import ImagesModule from '@/store/modules/ImagesModule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ImagesModule,
  },
});
