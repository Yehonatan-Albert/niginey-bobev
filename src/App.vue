<!-- src\App.vue -->
<template>
  <navbar></navbar>
  <div class="router-view-container">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './views/Navbar.vue';

export default {
  components: {
    Navbar
  }
}
</script>
