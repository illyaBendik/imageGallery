<template>
  <div class="pagination">
    <button :disabled="currentPage - 1 <= 0" @click="setCurrentPage(currentPage - 1)">
      &laquo;
    </button>
    <button @click="setCurrentPage(currentPage - 1)" v-if="currentPage - 1 > 0">
      {{ currentPage - 1 }}
    </button>
    <button @click="setCurrentPage(currentPage)" v-if="currentPage < maxPage">
      {{ currentPage }}
    </button>

    <button @click="setCurrentPage(currentPage + 1)" v-if="currentPage + 1 < maxPage">
      {{ currentPage + 1 }}
    </button>
    <button :disabled="currentPage + 1 >= maxPage" @click="setCurrentPage(currentPage + 1)">
      &raquo;
    </button>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('GET_IMAGES');
  },
  computed: {
    maxPage() {
      return this.$store.getters.getPageCount;
    },
    currentPage() {
      return this.$store.getters.getCurrentPage;
    },
  },
  methods: {
    setCurrentPage(page) {
      if (this.checkCache(page)) {
        this.$store.commit('SET_CURRENT_PAGE', { page });
      } else {
        this.$store.dispatch('GET_IMAGES', page);
      }
    },
    checkCache(page) {
      return this.$store.getters.getCurrentPageImages(page).length > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: inline-flex;
  width: 100%;
  justify-content: center;
}

.pagination button {
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  line-height: 1.25;
  color: #007bff;
  background-color: #fff;
  border: 1px solid #dee2e6;
}
</style>
