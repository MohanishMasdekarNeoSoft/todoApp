<template>
  <div id="app">
    <NavBar/>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
export default {
  components: {
    NavBar
  },
  created(){
   
        let token = localStorage.getItem("token") || '';
        let user = localStorage.getItem("user") || '';
        if ((token!='' || user!='guest') && this.$route.path == '/') {
            // no need to go to login page, if user is already logged in - redirect
            this.$router.push('todo')
        }
  },
  mounted(){
     window.onpopstate = event => {
      let token = localStorage.getItem("token") || '';
      let user = localStorage.getItem("user") || '';
      if((token!='' || user!='guest') && this.$route.path == "/"){
        this.$router.push('todo')
      }
    };



  this.$router.beforeEach((to, from, next) => {
    console.log(to);
        let token = localStorage.getItem("token") || '';
        let user = localStorage.getItem("user") || '';
        
        if ((token!='' || user!='guest') && to.name == 'login') {
            // no need to go to login page, if user is already logged in - redirect
            this.$router.push('todo')
        }

        return next();
  });
  }
};
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
