<template>
  <div class="popup">
    <div class="left" @click="prev(image.id)"><i class="fas fa-chevron-left"></i></div>
    <span @click="$emit('close')" class="close">&times;</span>
    <img
      :src="image.cropped_picture"
      class="popup-content"
    />
    <div class="caption">
      <p class="caption_tags">{{image.tags}}</p>
      <p>Author:{{image.author}}</p>
      <p>Camera:{{image.camera}}</p>
    </div>
    <div class="right" @click="next(image.id)"><i class="fas fa-chevron-right"></i></div>
  </div>
</template>
<script>
export default {
  computed: {
    image() {
      return this.$store.getters.getCurrentImage();
    },
    images() {
      return this.$store.getters.getCurrentPageImages();
    },
  },
  methods: {
    next(id) {
      console.log(id, 'next');
      const indexCurrentImg = this.getIndexCurrentImg(id);
      const idNextImg = this.images[indexCurrentImg + 1].id;
      this.loadImg(idNextImg);
    },
    prev(id) {
      console.log(id, 'prev');
      const indexCurrentImg = this.getIndexCurrentImg(id);
      const idPrevImg = this.images[indexCurrentImg - 1].id;
      this.loadImg(idPrevImg);
    },
    getIndexCurrentImg(id) {
      const obj = this.images.find((image) => image.id === id);
      return this.images.indexOf(obj);
    },
    loadImg(id) {
      if (this.checkCache(id)) {
        this.$store.commit('SET_CURRENT_IMAGE_ID', { id });
      } else if (id) {
        this.$store.dispatch('GET_IMAGE', id);
      }
    },
    checkCache(id) {
      return Boolean(this.$store.getters.getCurrentImage(id));
    },
  },
};
</script>
<style lang="scss" scoped>
.left {
  transform: translateY(-40%);
  position: fixed;
  top: 40%;
  color: #fff;
  font-size: 50px;
  height: 100%;
  display: flex;
  align-items: center;
}
.right {
  transform: translateY(-40%);
  position: fixed;
  right: 0;
  top: 40%;
  color: #fff;
  font-size: 50px;
  height: 100%;
  display: flex;
  align-items: center;
}
.popup {
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.9);
  overflow: hidden;
}

.popup-content {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  height: 400px;
}

.caption {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  // text-align: center;
  color: #ccc;
  padding: 10px 0;
  height: 150px;
  &_tags{
    text-align: center;
    font-size: 20px;
  }
  p {
    margin: 10px 0px;
    font-size: 15px;
  }
}

.popup-content,
.caption {
  -webkit-animation-name: zoom;
  -webkit-animation-duration: 0.6s;
  animation-name: zoom;
  animation-duration: 0.6s;
}

@-webkit-keyframes zoom {
  from {
    -webkit-transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
  }
}

@keyframes zoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

@media only screen and (max-width: 700px) {
  .popup-content {
    // width: 100%;
  }
}
</style>
