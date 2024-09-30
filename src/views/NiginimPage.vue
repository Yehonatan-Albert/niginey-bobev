<template>
    <div v-if="nigen">
      <title-setter :title="nigen.name"></title-setter>
      <breadcrumb :composerKey="composerKey" :nigenId="$route.params.id"></breadcrumb> <!-- פירור לחם -->
      <h1 class="title">{{ nigen.name }}</h1>
      <p class="composer">מאת: {{ composers[composerKey].displayName }}</p>
      <audio :src="`/niginim/${composerKey}/${nigen.src}`" controls autoplay></audio>
      
    </div>
    <div v-else-if="!loading">
      <not-found></not-found>
    </div>
  </template>
  
  
  
  <script>
  import NotFound from './NotFoundPage.vue';
  import composers from '../data.json';
  import TitleSetter from './TitleSetter.vue';
  import Breadcrumb from './Breadcrumb.vue';
  
  export default {
    data() {
      return {
        nigen: null,
        composerKey: null,  
        loading: true,
        composers: composers
      };
    },
    components: {
      NotFound,
      TitleSetter,
      Breadcrumb
    },
    created() {
      this.loadNigen();
    },
    watch: {
      '$route.params.id': 'loadNigen'
    },
    methods: {
      loadNigen() {
        this.loading = true;
        const id = this.$route.params.id;
        this.composerKey = this.findComposerByNigenId(id); 
        if (this.composerKey) {
          this.nigen = composers[this.composerKey].niginim.find(n => n.id == id);
        }
        this.loading = false;
      },
      findComposerByNigenId(id) {
        for (const key in composers) {
          if (composers[key].niginim.some(n => n.id == id)) {
            return key;
          }
        }
        return null;
      }
    }
  };
  </script>
  
  
  <style scoped>
  .title {
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    color: #0D47A1;
    margin-bottom: 10px;
  }
  
  .composer {
    text-align: center;
    font-size: 20px;
    color: #004D40;
    margin-bottom: 20px;
  }
  
  audio {
    display: block;
    margin: 0 auto;
    border-radius: 5px;
  }
  </style>
  