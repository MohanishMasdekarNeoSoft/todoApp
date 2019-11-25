<template>
    <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#"> Todo</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
            <!-- <b-nav-item  v-if="($store.state.token=='' || $store.state.token==null)" right>Log in <i class="fas fa-sign-out-alt"></i></b-nav-item> -->
            <b-nav-item  v-if="($store.state.token!='' && $store.state.token!=null)" @click="signOut()" right>Log Out <i class="fas fa-sign-out-alt"></i></b-nav-item>
            <!-- <b-nav-item  v-else @click="signIn()" right>Log In</b-nav-item> -->
        </b-navbar-nav>
      
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
    name: '',
    components:{

    },
    methods:{
        signOut(){
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("id");
            this.$store.state.token = '';
            this.$store.dispatch("assignToken",'');
            this.$store.dispatch("assignUser",'');
            this.$store.state.user = '';
            this.$router.push('/');  
        },
        signIn(){
            this.$router.push('/');
        }
    },
    created(){
        
    },
    data(){
        return{
        
        }
    }
}
</script>

<style scoped>

</style>