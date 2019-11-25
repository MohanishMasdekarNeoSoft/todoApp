<template>
    <!-- <b-row class="todoList-card">
        <b-col  sm="3" class="p-2 mb-3 w-100">
          {{task.taskname}}
        </b-col>
        <b-col   class="p-2 mb-3 w-100">
          {{task.startDate}}
        </b-col>
        <b-col  class="p-2 mb-3 w-100">
          {{task.priority}}
        </b-col>
        <b-col  class="p-2 mb-3 w-100">
          {{task.endDate}}
        </b-col>
        <b-col  class="p-2 mb-3 w-100" v-b-tooltip.hover :title="task.comments">
         <p> {{task.comments}} </p>
        </b-col>
        <b-col  class="p-2 mb-3">
          <a href="javascript:void(0)" @click="onEditClick(task)">Edit</a>
        </b-col>
        <b-col  class="p-2 mb-3">
          <a href="javascript:void(0)" @click="showMsgBoxOne(task)">Delete</a>
        </b-col>
    </b-row>     -->
    <tr>
              <td><p  v-b-tooltip.hover :title="task.taskname">{{ task.taskname | truncateString(10)}}</p></td>
              <td>{{ task.priority }}</td>
              <td>{{ task.startDate | formatDate}}</td>
              <td>{{ task.endDate  | formatDate}}</td>
              <td><p  v-b-tooltip.hover :title="task.comments">{{ task.comments | truncateString(10)}}</p></td>
              <td>
                <a @click="onEditClick(task)" style="cursor:pointer"><i class="fas fa-pencil-alt"></i></a>
              </td>
              <td>
                <a @click="showMsgBoxOne(task)" style="cursor:pointer"><i class="fas fa-trash"></i></a>
              </td>
            </tr>

   
</template>

<script>


export default {
    name:'TaskList',
    props:['index','task'],
    filters:{
      formatDate(val){
        let newDate = val.split('-');
        return newDate[2]+'-'+newDate[1]+'-'+newDate[0]
      },
      
     truncateString(str, num) {
      // If the length of str is less than or equal to num
      // just return str--don't truncate it.
      if (str.length <= num) {
        return str
      }
      // Return str truncated with '...' concatenated to the end of str.
      return str.slice(0, num) + '...'
    }
  
    },
    methods:{
        onEditClick(task){
            this.$emit('on-edit',{'task':task,'index':this.index});
        },
        onDeleteClick(task){
            this.$emit('on-delete',{'task':task,'index':this.index});
        },
        showMsgBoxOne(task) {
        this.boxTwo = ''
        this.$bvModal.msgBoxConfirm('Are you sure you want to delete the task?', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            
            if(value == true){
              this.onDeleteClick(task)
            }
          })
          .catch(err => {
            // An error occurred
          })
      }
    }

}
</script>

<style scoped>
    .todoList-card{
        padding:10px;
        margin-bottom:10px;
    }

    td p{
      white-space: nowrap;
      width: 100%;                   /* IE6 needs any width */
      overflow: hidden;              /* "overflow" value must be different from  visible"*/ 
      -o-text-overflow: ellipsis;    /* Opera < 11*/
      text-overflow:    ellipsis;    
    }
</style>