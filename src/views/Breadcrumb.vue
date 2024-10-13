<template>
  <nav class="breadcrumb">
    <router-link to="/">דף הבית</router-link>
    <span v-if="!nigenName"> / {{ currentComposer.displayName }}</span>
    <span v-else>
      / <router-link :to="`/composer/${composerKey}`">{{ currentComposer.displayName }}</router-link>
      / {{ nigenName }}
    </span>
  </nav>
</template>

<script>
import composers from '../data.json';

export default {
  props: ['composerKey', 'nigenName'],
  computed: {
    currentComposer() {
      return composers[this.composerKey] || null;
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
