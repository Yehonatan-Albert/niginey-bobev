<template>
  <div v-if="composer">
    <title-setter :title="composer.displayName"></title-setter>
    <breadcrumb :composerKey="composerKey"></breadcrumb> <!-- פירור לחם -->
    <h1 class="title">{{ composer.displayName }}</h1>
    <div class="cards-container">
      <router-link v-for="nigen in composer.niginim" :key="nigen.id" :to="`/nigen/${nigen.id}`" class="card">
        <h3>{{ nigen.name }}</h3>
        <audio :src="`/niginim/${composerKey}/${nigen.src}`" controls></audio>
      </router-link>
    </div>
  </div>
  <div v-else>
    <not-found></not-found>
  </div>
</template>

<script>
import NotFound from './NotFoundPage.vue';
import composers from '../data.json';
import TitleSetter from './TitleSetter.vue';
import Breadcrumb from './Breadcrumb.vue';

export default {
  data: () => ({
    composer: null
  }),
  components: {
    NotFound,
    TitleSetter,
    Breadcrumb
  },
  computed: {
    composerKey() {
      return decodeURIComponent(this.$route.params.name);
    }
  },
  created() {
    this.loadComposer();
  },
  watch: {
    '$route.params.name': 'loadComposer'
  },
  methods: {
    loadComposer() {
      this.composer = composers[this.composerKey];
    }
  }
};
</script>

<style scoped>
.title {
  text-align: center;
}

.card {
  text-decoration: none;
  color: black;
}

.card h3 {
  margin-top: 0;
}
</style>