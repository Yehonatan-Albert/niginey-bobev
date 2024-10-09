<template>
  <navbar></navbar>
  <router-view></router-view>
</template>

<script>
import Navbar from './views/Navbar.vue';

export default {
  components: {
    Navbar
  }
}
</script>
