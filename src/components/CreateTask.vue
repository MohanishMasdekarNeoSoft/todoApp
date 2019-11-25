<template>
    <b-row>
        <b-col sm="12" md="12" lg="12" xl="12">
          <b-form-group
            id="input-group-1"
            label="Task Name"
            label-for="taskname"
            :class="{ 'form-group--error': $v.taskObj.taskname.$error }"
          >
            <b-form-input
              id="dob"
              v-model.trim="$v.taskObj.taskname.$model"
              type="text"
              required
              placeholder="Enter Task Name"
            ></b-form-input>
            <div v-if="$v.taskObj.taskname.$dirty">
                <div class="error" v-if="!$v.taskObj.taskname.required">Taskname is required</div>
            </div>    
          </b-form-group>
        </b-col>
        
        
        <b-col sm="12" md="12" lg="12" xl="12">
          <b-form-group id="input-group-1" label="Priority:" label-for="email_id" :class="{ 'form-group--error': $v.taskObj.priority.$error }">
            <b-form-select v-model="$v.taskObj.priority.$model" :options="options"></b-form-select>
            <div v-if="$v.taskObj.priority.$dirty">
                <div class="error" v-if="!$v.taskObj.priority.required">Priority is required</div>
            </div>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="12" lg="12" xl="12">
          <b-form-group
            id="input-group-1"
            label="Start Date:"
            label-for="startDate"
            :class="{ 'form-group--error': $v.taskObj.startDate.$error }"
          >
            <b-form-input
              id="startDate"
              :min="new Date().toISOString().slice(0,10)"
              v-model.trim="$v.taskObj.startDate.$model"
              type="date"
              required
              placeholder="Enter Start Date"
            ></b-form-input>
            <div v-if="$v.taskObj.startDate.$dirty">
                <div class="error" v-if="!$v.taskObj.startDate.required">Start Date is required</div>
            </div>    
          </b-form-group>
        </b-col>
        <b-col sm="12" md="12" lg="12" xl="12">
          <b-form-group
            id="input-group-1"
            label="End Date:"
            label-for="endDate"
            :class="{ 'form-group--error': $v.taskObj.endDate.$error }"
          >
            <b-form-input
              id="endDate"
              :min="new Date().toISOString().slice(0,10)"
              v-model.trim="$v.taskObj.endDate.$model"
              type="date"
              required
              placeholder="Enter End Date"
            ></b-form-input>
            <div v-if="$v.taskObj.endDate.$dirty">
                <div class="error" v-if="!$v.taskObj.endDate.required">End Date is required</div>
                
                    <div class="error" v-if="checkDate">End Date should be greater than Start Date</div>
                    
            </div>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="12" lg="12" xl="12">
          <b-form-group
            id="input-group-1"
            label="Comments:"
            :class="{ 'form-group--error': $v.taskObj.comments.$error }"
            label-for="comments"
          >
            <b-form-input
              id="comments"
              v-model.trim="$v.taskObj.comments.$model"
              type="text"
              required
              placeholder="Enter Comments"
            ></b-form-input>
            <div v-if="$v.taskObj.comments.$dirty">
                <div class="error" v-if="!$v.taskObj.comments.required">Comments are required</div>
            </div>    
          </b-form-group>
        </b-col>
        
       
        <!-- <b-col sm="12" md="12" lg="12" xl="12" class="p-3 text-center">
          <b-button variant="success" @click=""
            >Add</b-button
          >    
        </b-col> -->
      </b-row>
</template>

<script>
import {
  required,
  sameAs,
  minLength,
  maxLength,
  minValue,
  email
} from "vuelidate/lib/validators";
export default {
    name:'CreateTask',
    props:{
        task:{
            type:Object,
            required: true
        }
    },
    data(){
        return{
            options:[
             {value:'high',text:'High'},
             {value:'low',text:'Low'},
             {value:'medium',text:'Medium'}
           ],
            
        //    taskname : this.task.taskname,
        //    priority: this.task.priority,
        //    startDate: this.task.startDate,
        //    endDate: this.task.endDate,
        //    comments: this.task.comments
        }
    },
    validations(){
    return{
        taskObj:{
        taskname: {
            required,
        // minLength: minLength(6),
        // maxLength: maxLength(8)
        },
        priority:{
            required
        },
        startDate: {
            required
        },
        endDate: {
            required,
        },
        comments: {
            required
        }
    }
    }    

  },
  computed:{
      taskObj:function(){
          return this.task;
      },
      checkDate:function(){
          return new Date(this.task.endDate).getTime() < new Date(this.task.startDate).getTime();
      }
  }
}
</script>

<style scoped>
    .error{
        color:red;
        font-size:12px;
    }
</style>