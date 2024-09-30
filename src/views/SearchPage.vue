<template>
  <div v-if="results.length > 0">
    <title-setter title="חיפוש"></title-setter>
    <h1 class="title">תוצאות חיפוש עבור "{{ $route.query.q }}"</h1>
    <div class="cards-container">
      <router-link v-for="nigen in results" :key="nigen.id" :to="`/nigen/${nigen.id}`" class="card">
        <h3>{{ nigen.name }}</h3>
        <audio :src="`/niginim/${nigen.composerKey}/${nigen.src}`" controls></audio>
      </router-link>
    </div>
  </div>
  <div v-else>
    <not-found></not-found>
  </div>
</template>

<script>
import composers from '../data.json';
import NotFound from './NotFoundPage.vue';
import TitleSetter from './TitleSetter.vue';

export default {
  components: {
    NotFound,
    TitleSetter
  },
  data() {
    return {
      query: '',
      results: []
    };
  },
  created() {
    this.search();
  },
  watch: {
    '$route.query.q': 'search'
  },
  methods: {
    search() {
      const query = this.$route.query.q?.trim() || '';
      if (!query) {
        this.results = [];
        return;
      }

      const results = [];

      for (const composerKey in composers) {
        const composer = composers[composerKey];
        for (const nigen of composer.niginim) {
          const name = nigen.name;
          if (name.includes(query)) {
            results.push({ ...nigen, composerKey, match: this.getMatchScore(name, query) });
          }
        }
      }

      // מיון לפי קדימויות
      this.results = results.sort((a, b) => b.match - a.match);
    },
    getMatchScore(name, query) {
      if (name.startsWith(query)) {
        return 3; // שם הניגון מתחיל בקלט
      } else if (name.split(' ').some(word => word.startsWith(query))) {
        return 2; // אחת מהמילים מתחילה בקלט
      } else if (name.includes(query)) {
        return 1; // השם כולל את הקלט (באמצע מילה)
      }
      return 0;
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
