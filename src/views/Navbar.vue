<template>
  <div class="navbar">
    <router-link to="/">
      <img class="logo" src="/logo.png">
    </router-link>
    <router-link class="nav-link" to="/">דף הבית</router-link>
    <a class="nav-link" href="javascript:gp=open('https://mail.google.com/mail/u/0/?tf=cm&to=nigineybobev@gmail.com','g',`width=600,height=400,top=${screen.height/2-200},left=${screen.width/2-300}`);onfocus=onclick=()=>gp.focus()">צור קשר</a>
    <input id="search-input" placeholder="חיפוש..." v-model="query" @input="search">
  </div>
</template>

<script>
export default {
  data: () => ({
    query: '',
    previousRoute: null
  }),
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
.navbar {
  background: linear-gradient(to right, #87CEEB, #1E90FF);
  overflow: hidden;
  padding: 10px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  user-select: none;
  position: sticky;
  top: 0;
  z-index: 10;
}

.navbar .nav-link {
  float: right;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 20px;
  text-decoration: none;
  font-size: 18px;
  transition: 0.3s ease;
  border-radius: 5px;
  margin-right: 8px;
}

.navbar a:hover,
.navbar a.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.navbar .logo {
  float: left;
  padding: 0 20px;
  margin: 0;
  height: 50px;
}

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