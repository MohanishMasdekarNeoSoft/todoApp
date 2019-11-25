<template>
  <div class="login_container">
    <b-container class="login_box">
      <b-row>
        <b-col sm="12" md="12" lg="12" xl="12" class="p-2 mb-3">
          <div style="display:table;margin:auto">
            <div style="display:table-cell;vertical-align:middle;padding:5px">Login</div>
            <i style="display:table-cell" class="fas fa-user fa-2x"></i>
          </div>
        </b-col>

        <b-col sm="12" md="12" lg="12" xl="12">
          
          <b-form-group id="input-group-1" label="Email:" label-for="email_id" :class="{ 'form-group--error': $v.emailID.$error }">
            
            <b-form-input
              id="email_id"
              v-model="$v.emailID.$model"
              :class="status($v.emailID)"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
            <div v-if="$v.emailID.$dirty">
              <div class="error" v-if="!$v.emailID.required">Email is required</div>
              <div class="error" v-if="!$v.emailID.email">Valid Email is required</div>
            </div>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="12" lg="12" xl="12">
          <b-form-group
            id="input-group-1"
            label="Password:"
            label-for="password"
            :class="{ 'form-group--error': $v.password.$error }"
          >
            <b-form-input
              id="password"
              v-model="$v.password.$model"
              :class="status($v.password)"
              type="password"
              required
              placeholder="Enter Password"
            ></b-form-input>
          <div v-if="$v.password.$dirty">  
            <div class="error" v-if="!$v.password.required">Password is required</div>
          </div>  
          </b-form-group>
        </b-col>

        <b-col sm="12" md="12" lg="12" xl="12" class="p-3 dispGrid text-center">
          <b-button variant="success" @click="navigateToTodo()"> <i class="fas fa-sign-in-alt"></i> Login</b-button>
            OR Login as
          <b-button variant="secondary" @click="navigateToTodoAsGuest()"><i class="fas fa-user-circle"></i> Guest</b-button>  
        </b-col> 
        <b-col sm="12" md="12" lg="12" xl="12" class="p-3 text-center">
          Dont have an Account <router-link to="/registration">Register</router-link> 
        </b-col>
      </b-row>
    </b-container>
    
  </div>
</template>

<script>
import axios from 'axios';
import {
  required,
  sameAs,
  minLength,
  maxLength,
  email
} from "vuelidate/lib/validators";

export default {
  name: "Login",
  components: {},
  data() {
    return {
        emailID: "",
        password: "",
        submitStatus: null
    };
  },
  validations: {
    emailID: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  created(){
   

//     this.$router.beforeEach((to, from, next) => {
//       let token = localStorage.getItem("token") || '';
//       let user = localStorage.getItem("user") || '';
//       if((token!='' || user!='guest') && to.name == 'login'){
//         this.$router.push('todo')
//       }
//       return next();
//     // const isLogged = store.getters.getUser.isLogged;
//     // if (isLogged && to.name == 'login') {
//     //     // no need to go to login page, if user is already logged in - redirect
//     //     return router.push({ name: 'dashboard' });
//     // }

//     // return next();
// });

    // this.$router.beforeEach((to, from, next) => {
    //   console.log(from);
    //   // if (!isAuthenticated) next('/login')
    //   // else next()
    // })
     
  },
  methods: {
    status(validation) {
    	return {
      	error: validation.$error,
        dirty: validation.$dirty
      }
    },
    navigateToTodo() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        const login = {
          emailID: this.emailID,
          password: this.password
        }
         axios.post('http://180.149.241.208:3022/userLogin', login)
            .then(function (response) {  
              if(response.data.success == true){
                  _this.$toasted.show('Logged In Successfully',{
                    duration:2000
                  });
                  _this.$router.push({name: 'Todo', params: {_id: response.data.data._id, token: response.data.token}});
                  localStorage.setItem("user", "regular");
                  localStorage.setItem("token", response.data.token);
                  _this.$store.dispatch("assignToken",response.data.token);
                  localStorage.setItem("id", response.data.data._id);
              }
              else{
                  _this.$toasted.show(response.data.message,{
                    duration:2000
                  });
              }
                               
            })
            .catch(function (error) {
                console.log(error);
                 _this.$toasted.show(error.response.data.message,{
                    duration:2000
                  });
            })
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }
        var _this = this;
        
    },
    navigateToTodoAsGuest(){
      localStorage.setItem("user", "guest");
      this.$store.dispatch("assignUser","guest");
      if(!(localStorage.getItem('tasks')!='' && localStorage.getItem('tasks')!=null && localStorage.getItem('tasks')!=undefined)){
      localStorage.setItem("tasks", []);
     }
      this.$router.push('todo');

    }
  }
};
</script>

<style scoped>
.login_box {
  margin-top: 2%;
  max-width: 40%;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.33);
}

.login_box > .row > div:first-child {
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.22);
}



.dirty {
  border-color: #5A5;
  background: #EFE;
}

.dirty:focus {
  outline-color: #8E8;
}

.error {
  border-color: red;
  background: #FDD;
  font-size:12px;
}

.error:focus {
  outline-color: #F99;
}

@media screen and (min-width: 320px) and (max-width:1000px) {
  .login_box {
    max-width: 90%;
  }
  
}

@media screen and (min-width: 320px) and (max-width:450px) {
  
  .dispGrid{
    display: grid;
  }
}
</style>
