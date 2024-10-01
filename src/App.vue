<template>
  <div>
    <div class="navbar">
      <router-link to="/">
        <img class="logo" src="/logo.png">
      </router-link>
      <router-link class="nav-link" to="/">דף הבית</router-link>
      <a class="nav-link" href="javascript:gp=open('https://mail.google.com/mail/u/0/?tf=cm&to=nigineybobev@gmail.com','g',`width=600,height=400,top=${screen.height/2-200},left=${screen.width/2-300}`);onfocus=onclick=()=>gp.focus()">צור קשר</a>
      <input id="search-input" placeholder="חיפוש..." v-model="query" @input="search">
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      previousRoute: null
    };
  },
  watch: {
    '$route.path': 'routeChange'
  },
  methods: {
    search() {
      if (this.query.trim()) {
        if (this.$route.path != '/search') {
          this.previousRoute = this.$route;
        }
        this.$router.push({ path: '/search', query: { q: this.query.trim() } });
      } else if (this.previousRoute && this.$route.path == '/search') {
        this.$router.push(this.previousRoute.fullPath);
      }
    },
    routeChange() {
      if (this.$route.path != '/search') {
        this.query = '';
      }
    }
  }
};
</script>

<style scoped>
#search-input {
  border: none;
  border-radius: 5px;
  font-size: 16px;
  padding: 7px;
  margin: 9px;
  float: left;
  background-color: #c6eeff;
  color: #1882cb;
}
#search-input::-webkit-input-placeholder {
  font-style: italic;
  color: #1882cb;
}
#search-input:hover, #search-input:focus {
  outline: 1px solid #1882cb !important;
}
</style>