<template>
  <nav class="breadcrumb">
    <router-link to="/">דף הבית</router-link>
    <span v-if="isComposerPage"> / {{ currentComposer.displayName }}</span>
    <span v-else-if="isNigenPage">
      / <router-link :to="`/composer/${composerKey}`">{{ currentComposer.displayName }}</router-link>
      / {{ currentNigen.name }}
    </span>
  </nav>
</template>

<script>
import composers from '../data.json';

export default {
  props: ['composerKey', 'nigenId'],
  computed: {
    currentComposer() {
      return composers[this.composerKey] || null;
    },
    currentNigen() {
      return this.currentComposer?.niginim.find(n => n.id == this.nigenId) || null;
    },
    isComposerPage() {
      return this.$route.path.includes('/composer');
    },
    isNigenPage() {
      return this.$route.path.includes('/nigen');
    }
  }
};
</script>

<style scoped>
.breadcrumb {
  margin: 20px;
  font-size: 16px;
}
.breadcrumb a {
  text-decoration: none;
  color: #007BFF;
}
.breadcrumb span {
  color: #6c757d;
}
</style>
