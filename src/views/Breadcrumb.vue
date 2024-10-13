<template>
  <nav class="breadcrumb">
    <span v-for="(label, path) in links" class="breadcrumb-link">
      <router-link :to="path">{{ label }}</router-link>
    </span>
    <span>{{ active }}</span>
  </nav>
</template>

<script>
export default {
  props: ['links', 'active']
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

.breadcrumb-link::after {
  content: "/";
  margin: 0 5px;
}
</style>
