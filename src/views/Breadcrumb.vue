<template>
  <nav class="breadcrumb">
    <span v-for="(label, path) in links">
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

.breadcrumb span {
  color: #6c757d;
}

.breadcrumb a {
  text-decoration: none;
  color: #007BFF;
}

.breadcrumb a::after {
  content: "/";
  margin: 0 5px;
}
</style>
