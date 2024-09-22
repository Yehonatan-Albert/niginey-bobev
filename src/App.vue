<template>
  <div>
    <div class="navbar">
      <router-link to="/">
        <img class="logo" src="/logo.png">
      </router-link>
      <router-link class="nav-link" to="/">דף הבית</router-link>
      <a class="nav-link" href="javascript:gp=open('https://mail.google.com/mail/u/0/?tf=cm&to=nigineybobev@gmail.com','g','width=510,height=450,top=1000');onfocus=onclick=()=>gp.focus()">צור קשר</a>
    </div>
    <router-view></router-view>
  </div>
</template>