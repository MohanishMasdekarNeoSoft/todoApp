<template>
<div class="todo_container">
    <div class="ml-5 mt-5">
    <b-button v-b-modal.modal-1 class="text-center" @click="assignTaskObj()"><i class="fas fa-plus"></i> {{isEdit ? 'Update' : 'Add'}} a Task</b-button>

    <b-modal id="modal-1" :title="isEdit ? 'Update a Task' : 'Create a Task'" :no-close-on-backdrop="true" @ok="handleOk" @close="onCancelClick()" @cancel="onCancelClick()" >
      <b-container class="">
        <!-- <CreateTask :task="task" ref="createTask"/> -->
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
      </b-row>
      </b-container>
    </b-modal>
    </div>
    <b-container v-if="tasks.length!=0" class="mt-5" style="overflow-x:scroll">
          <table class="table">
          <thead>
            <tr>
              <!-- <th>#</th> -->
              <th>Title</th>
              <th>Priority</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Comments</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <TaskList v-for="(task,i) in pageOfItems" :key="i" :index="i" :task="task" @on-edit="editTask" @on-delete="deleteTask"/>
          </tbody>
        </table>
        
    </b-container>
    <b-container v-else class="mt-5 text-center">
      No Tasks Added, Please add a Task
    </b-container>  
    <jw-pagination :items="tasks" @changePage="onChangePage"  :pageSize="3"></jw-pagination>
    
  </div>   
</template>

<script>
import CreateTask from './CreateTask'
import TaskList from './TaskList'
import Vue from 'vue'
import JwPagination from 'jw-vue-pagination'
import {
  required,
  sameAs,
  minLength,
  maxLength,
  email
} from "vuelidate/lib/validators";
Vue.component('jw-pagination', JwPagination);
import {mapState} from 'vuex'
export default {
   name:'Todo',
   components:{
       TaskList,
       CreateTask, 
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
  
   data(){
       return{
           task:{
               userID:"",
               taskname:"",
               priority:"Please select from dropdown",
               startDate:"",
               endDate:"",
               comments:""
           },
           sortedTaskArr:[],
           tasks:[],
           index:'',
           isEdit:false,
           userType : '',
           page:1,
           pageOfItems: [],
            options:[
              {value:'Please select from dropdown',text:'Please Select from dropdown'},
             {value:'high',text:'High'},
             {value:'low',text:'Low'},
             {value:'medium',text:'Medium'}
           ],
       }
   },
   created(){
       
       this.userType = localStorage.getItem('user');
        if(this.userType == 'regular'){
          if(localStorage.getItem("token")==undefined || localStorage.getItem("token")==null){
            this.$router.push('/');
          }
          this.task.userID = localStorage.getItem("id");
        }
        else if(this.userType == 'guest'){
          delete this.task.userID;
        }
        else{
          if(localStorage.getItem("token")==undefined || localStorage.getItem("token")==null){
            this.$router.push('/');
          }
        }
        
       this.getTask(this.userType);
   },
   mounted(){
      // this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
      //   this.isEdit = false;
      // })

      // console.log(this.$refs.createTask);
   },
   methods:{
      assignTaskObj(){
        this.$v.$reset();
        this.task = {
               userID:"",
               taskname:"",
               priority:"",
               startDate:"",
               endDate:"",
               comments:""
        }

        this.$bvModal.show('modal-1');
      },
      clickCallback (pageNum){
          console.log(pageNum)
      },
      handleOk(event){
        this.$v.$touch();
        if (this.$v.$invalid || (new Date(this.task.endDate).getTime() < new Date(this.task.startDate).getTime())) {
            event.preventDefault();
            return;
        }
        else{
          if(this.isEdit){
            this.editSelectedTask();
          }
          else{
            this.addTask()
          }
        }

      },
       addTask(){

                if(this.userType == 'regular'){
                this.task.userID = localStorage.getItem("id");
                  var _this = this;
                  const config = {
                      headers:{'Authorization': "Bearer " + localStorage.getItem("token")}
                  }
                  axios.post('http://180.149.241.208:3022/createTask', this.task, config)
                  .then(function (response) {  
                      console.log(response);
                      
                      _this.getTask(_this.userType);
                  })
                  .catch(function (error) {
                      console.log(error);
                  })
              }
              else{
                this.task.userID = Math.floor(Math.random()*10);
                this.tasks.push(this.task);
                localStorage.setItem("tasks",JSON.stringify(this.tasks));
                this.task = {};
              }
          
              
       },
       getTask(user){
            if(user == 'regular'){
              var _this = this;
              const config = {
                  headers:{'Authorization': "Bearer " + localStorage.getItem("token")}
              }
              axios.get('http://180.149.241.208:3022/getTask/'+this.task.userID, config)
              .then(function (response) {  
                  console.log(response.data);
                  _this.tasks = [...response.data.data];
                  _this.onCancelClick();
              })
              .catch(function (error) {
                  console.log(error);
              })
            }
            else{
              let tasks = localStorage.getItem("tasks");
              if(tasks!=''){
                this.tasks = JSON.parse(tasks);  
              }
              
            }  
       },
       editSelectedTask(){
         var _this = this;
         if(this.userType == 'regular'){
            const config = {
                headers:{'Authorization': "Bearer " + localStorage.getItem("token")}
            }
            axios.put('http://180.149.241.208:3022/updateTask?userID='+this.task.userID+'&_id='+this.task._id,this.task,config)
            .then(function (response) {  
                console.log(response.data);
                if(response.data.success == true){
                  _this.$toasted.show('Task Edited Successfully',{
                    duration:2000
                  });
                }
                _this.isEdit = false;
                _this.task = {}
                _this.tasks.splice(_this.index,1,response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
         }
         else{
           this.tasks.forEach(function(val,index){
             if(index == _this.index){
               _this.tasks[index] = _this.task;
             }
           })
           localStorage.setItem("tasks",JSON.stringify(this.tasks));
           this.getTask();
           this.isEdit = false;
           this.task = {}
         }
 
       },
       onChangePage(pageOfItems) {
            console.log(pageOfItems);
            // update page of items
            this.pageOfItems = pageOfItems;
        },
       deleteTask(taskObj){
         var _this = this;
         this.tasks.forEach(function(val,index){
             if(val._id == taskObj.task._id){
               console.log(index);
               _this.index = index;
             }
           })
         if(this.userType == 'regular'){
            const config = {
                headers:{'Authorization': "Bearer " + localStorage.getItem("token")}
            }
            axios.delete('http://180.149.241.208:3022/deleteTask?userID='+taskObj.task.userID+'&_id='+taskObj.task._id, config).then(function (response) {  
                console.log(response.data);
                if(response.data.success == true){
                  _this.$toasted.show('Task Deleted Successfully',{
                    duration:2000
                  });
                }
                _this.tasks.splice(_this.index,1);
            })
            .catch(function (error) {
                console.log(error);
            });
         }
         else{
           this.tasks.splice(taskObj.index,1);
           localStorage.setItem("tasks",JSON.stringify(this.tasks));
         }
         
       },
       editTask(taskObj){
         var _this = this;
          this.$bvModal.show('modal-1')
           this.isEdit = true;
           this.task = {...taskObj.task};
           if(this.userType == 'regular'){
             this.tasks.forEach(function(val,index){
             if(val._id == taskObj.task._id){
               console.log(index);
               _this.index = index;
             }
           })
           }
           else{
            this.tasks.forEach(function(val,index){
             if(val.userID == taskObj.task.userID){
               console.log(index);
               _this.index = index;
             }
            })
           }
           
           
       },
       onCancelClick(){
         
         this.isEdit = false;
         this.task = {};
       }
   },
   computed:{
     checkDate:function(){
          return new Date(this.task.endDate).getTime() < new Date(this.task.startDate).getTime();
      },
      taskObj:{
          get(){
            return this.task;
          },
          set(){
            this.task = this.taskObj;
          }
      }
   }
}
</script>

<style>
.todo_box {
  margin-top: 2%;
  max-width: 40%;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.33);

}

.todo_box > .row > div:first-child {
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.22);
}

.todoList-header{
    border-bottom : 1px solid rgba(0,0,0,0.33);
}

.pagination {
  padding-left:35% !important;
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
/* ul > li {
    padding: 10px !important;
    border: 1px solid rgba(0,0,0,0.22) !important;
} */
</style>  