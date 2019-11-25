<template>
  <div class="registration_container">
     <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
      </div>
    <b-container class="registration_box">
      <b-row>
        <b-col sm="12" md="12" lg="12" xl="12" class="p-2 mb-3">
          <div style="display:table;margin:auto">
            <div style="display:table-cell;vertical-align:middle;padding:5px">Registration</div>
            <i style="display:table-cell" class="fas fa-users fa-2x"></i>
          </div>
        </b-col>
        <b-col sm="12" md="12" lg="12" xl="12">
          <b-form-group id="input-group-1" label="Name:" label-for="name" :class="{ 'form-group--error': $v.name.$error }">
            <b-form-input
              id="name"
              v-model.trim="$v.name.$model" 
              :class="status($v.name)"
              type="text"
              required
              placeholder="Enter name"
            ></b-form-input>
            <div v-if="$v.name.$dirty">
              <div class="error" v-if="!$v.name.required">Name is required</div>
              <!-- <div class="error" v-if="!$v.name.alphaNum">Name should contain only alphabets</div> -->
            </div>  
          </b-form-group>
        </b-col>
        <b-col sm="12" md="12" lg="12" xl="12">
          <b-form-group
            id="input-group-1"
            label="Date Of Birth:"
            label-for="dob"
            :class="{ 'form-group--error': $v.dob.$error }"
          >
            <b-form-input
              id="dob"
              v-model.trim="$v.dob.$model" 
              :max="new Date().toISOString().slice(0,10)"
              :class="status($v.dob)"
              type="date"
              required
              placeholder="Enter Date of birth"
            ></b-form-input>
            <div v-if="$v.dob.$dirty">
              <div class="error" v-if="!$v.dob.required">DOB is required</div>
              <div class="error" v-if="!((checkDateOfBirth() < 150) && (checkDateOfBirth() >= 0)) && dob!=''">Please enter a valid date of birth</div>
            </div>  
          </b-form-group>
        </b-col>
        
        
        <b-col sm="12" md="12" lg="12" xl="12">
          <b-form-group id="input-group-1" label="Email:" label-for="email_id" :class="{ 'form-group--error': $v.emailID.$error }">
            <b-form-input
              id="email_id"
              :class="status($v.emailID)"
              v-model.trim="$v.emailID.$model" 
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
            <div v-if="$v.emailID.$dirty">
              <div class="error" v-if="!$v.emailID.required">Email is required</div>
              <!-- <div class="error" v-if="!$v.emailID.email">valid Email is required</div> -->
              <div class="error" v-if="!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(emailID) && emailID!=''">Valid Email ID is required</div>
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
              :class="status($v.password)"
              v-model.trim="$v.password.$model" 
              type="password"
              required
              placeholder="Enter Password"
            ></b-form-input>
            <div v-if="$v.password.$dirty">
              <div class="error" v-if="!$v.password.required">Password is required.</div>
              <div class="error" v-if="!$v.password.minLength">Password must have at least {{ $v.password.$params.minLength.min }} letters.</div>
              <div class="error" v-if="!checkForPassword() && password!=''">Password must have atleast one special character, one digit and one small and big alphabet</div>
            </div>  
          </b-form-group>
        </b-col>
        <b-col sm="12" md="12" lg="12" xl="12">
          <b-form-group
            id="input-group-1"
            label="Confirm Password:"
            label-for="confirm_password"
            :class="{ 'form-group--error': $v.confirmPassword.$error }"
          >
            <b-form-input
              id="confirm_password"
              :class="status($v.confirmPassword)"
              v-model.trim="$v.confirmPassword.$model" 
              type="password"
              required
              placeholder="Confirm Password"
            ></b-form-input>
            <div v-if="$v.confirmPassword.$dirty">
              <div class="error" v-if="!$v.confirmPassword.sameAsPassword">Passwords must be identical.</div>
            </div>  
          </b-form-group>
        </b-col>
        
       
        <b-col sm="12" md="12" lg="12" xl="12" class="p-3 text-center">
          <b-button variant="success" @click="navigateToLogin()"
            ><i class="fas fa-user-check"></i> Register</b-button
          >
          <div class="mt-3">
              Already Registered? <router-link to="/"> Go to Login </router-link>
          </div>    
        </b-col>
      </b-row>
    </b-container>
     <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide>
      Hello, world! This is a toast message.
    </b-toast>
  </div>
</template>

<script>
import axios from "axios";
import {
  required,
  sameAs,
  minLength,
  maxLength,
  alphaNum,
  email
} from "vuelidate/lib/validators";
export default {
  name: "Registration",
  components: {},
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: "",
      menu2: false,
      name: "",
      dob: "",
      error: "",
      emailID: "",
      password:"",
      confirmPassword:"",
    };
  },
  validations: {
    name: {
      required
      // minLength: minLength(6),
      // maxLength: maxLength(8)
    },
    dob: {
      required
    },
    emailID: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8),
    },
    confirmPassword: {
      sameAsPassword: sameAs("password")
    }
  },
  methods: {
    checkDateOfBirth(){    
      let birth = new Date(this.dob);
      let now = new Date();
      let beforeBirth = ((() => {birth.setDate(now.getDate());birth.setMonth(now.getMonth()); return birth.getTime()})() < birth.getTime()) ? 0 : 1;
      return now.getFullYear() - birth.getFullYear() - beforeBirth; 
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    status(validation) {
    	return {
      	error: validation.$error,
        dirty: validation.$dirty
      }
    },
    checkForPassword(){
      return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).test(this.password)
    },
    navigateToLogin() {
      this.$v.$touch();
      let resp = this.checkDateOfBirth();
      if (this.$v.$invalid && (isNaN(resp) || resp==false)) {
          return;
      }
      else{
        let form = {
          name: this.name,
          dob: this.dob,
          emailID: this.emailID,
          password: this.password,
          confirmPassword: this.confirmPassword
        };
        let _this = this;
        
            axios.post('http://180.149.241.208:3022/userRegistration', form)
            .then(function (response) {
                if(response.data.success == true){
                  _this.$toasted.show('Registered Successfully',{
                    duration:2000
                  });
                    _this.$router.push("/");
                }
            })
            .catch(function (error) {
                console.log(error);
            })
      }
         
       
    
    }
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  }
};
</script>

<style scoped>
.registration_box {
  margin-top: 2%;
  max-width: 40%;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.33);
}

.registration_box > .row > div:first-child {
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.22);
}

.v-text-field {
  padding-top: unset !important;
  margin-top: unset !important;
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
  .registration_box {
    max-width: 90%;
  }
}

</style>
