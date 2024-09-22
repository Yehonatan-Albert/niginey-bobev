<template>
  <div>
    <title-setter title="דף הבית"></title-setter>
    <div class="cards-container">
      <router-link :to="`/composer/${key}`" class="card" v-for="(composer, key) in composers" :key="key">
        <h3>{{ composer.displayName }}</h3>
        <p>{{ composer.niginim.length }} ניגונים</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import composers from '../data.json';
import TitleSetter from '../views/TitleSetter.vue';

export default {
  data() {
    return {
      composers: composers
    }
  },
  components: {
    TitleSetter
  },
  created() {
    // סידור המלחינים לפי כמות הניגונים בסדר יורד
    this.composers = Object.fromEntries(
      Object.entries(composers).sort((a, b) => b[1].niginim.length - a[1].niginim.length)
    );
  }
};
</script>

<style scoped>
.card {
  text-decoration: none;
  color: #000;
}
</style>