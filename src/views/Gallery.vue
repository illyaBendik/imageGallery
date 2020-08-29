<template>
  <div class="container">
    <h1 class="title">Image Gallery</h1>
    <div class="listImg">
      <img
        v-for="(image,i) in images"
        :key="i"
        class="img"
        :src="image.cropped_picture"
        alt="img"
        @click="showPopup(image.id)"
      />
      <Pagination />
    </div>
    <Popup @close="isPopup = false" v-if="isPopup" />
  </div>
</template>

<script>
import Popup from '@/components/Popup.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Popup,
    Pagination,
  },
  data() {
    return {
      isPopup: false,
    };
  },
  computed: {
    images() {
      return this.$store.getters.getCurrentPageImages();
    },
  },
  methods: {
    async showPopup(id) {
      await this.$store.dispatch('GET_IMAGE', id);
      this.isPopup = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.title{
  text-align: center;
  font-size: 56px;
  padding: 10px;
}
.img {
  border-radius: 5px;
  transition: 0.3s;
  cursor: pointer;
  flex-grow: 1;
  width: 100%;
  max-width: 300px;
  margin: 10px;
  &:hover {
    opacity: 0.7;
  }
}
.listImg {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
