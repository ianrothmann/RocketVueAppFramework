<template>
    <div>
        <div class="loader-overlay" v-if="showLoader">
            <v-progress-circular
                    indeterminate
                    :size="50"
                    class="primary--text"
            /><br>
            <span class="grey--text--darken-3" v-html="loaderText" v-if="loaderText!=''"></span>
        </div>

        <rw-dialog :title="dialogContent.title" v-model="showDialog" :persistent="true">
            <div v-html="dialogContent.content"></div>
            <div slot="actions">
                <v-btn v-for="(btn,key) in dialogContent.buttons" :key="key" :class="[objProp(btn,'color','primary')+'--text']" flat @click.native.stop="dialogButtonClicked(key)" v-html="isObject(btn)?btn.label:btn"></v-btn>
            </div>
        </rw-dialog>


        <v-snackbar
                :timeout="snackbar.duration"
                :top="snackbar.vertical === 'top'"
                :bottom="snackbar.vertical === 'bottom'"
                :right="snackbar.horizontal === 'right'"
                :left="snackbar.horizontal === 'left'"
                v-model="showSnackbar"
                :multi-line="true"

        > <div v-html="snackbar.message"></div>
            <v-btn flat :class="[snackbar.messagetype+'--text']" @click.native="showSnackbar = false">OK</v-btn>
        </v-snackbar>

        <v-progress-linear :indeterminate="true" :active="showActivity&&!showLoader" class="activityScreenTop"></v-progress-linear>
    </div>
</template>
<style>

.activityScreenTop{
position : fixed;
  top:-1rem;
  left:0;
  width: 100vw;
  height: 100vh;
  z-index:1000;
}
.loader-overlay{
  background-color:rgba(0,0,0,0.2);
  position : fixed;
  top:0;
  left:0;
  width: 100vw;
  height: 100vh;
  overflow:hidden;
  z-index:1000;
  display : flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
}
</style>
<script>
import {AppFrameworkEventBus} from './framework';
import {typeHelpers} from './mixins/general';
  export default{
        mixins : [typeHelpers],
        computed : {
          showActivity(){
            return this.currentActivity.length>0;
          }
        },
        data(){
            return{
                currentActivity : [],
                snackbar: {
                    vertical: 'top',
                    horizontal: 'right',
                    duration: 4000,
                    message : '',
                    messagetype : 'error'
                },
                showSnackbar : false,
                showDialog : false,
                dialogContent : {
                    title : '',
                    content : ' ',
                    promiseHandler : null,
                    buttons : {},
                    value : '',
                    placeholder : ''
                },
                 showLoader : false,
                 loaderText : ''
            }
        },
        mounted(){

          AppFrameworkEventBus.$on('dialog',(opt)=>{
            this.dialogContent.title = opt.title;
            this.dialogContent.content = opt.content;
            this.dialogContent.promiseHandler = opt.promise;
            if(opt.buttons)
                this.dialogContent.buttons = opt.buttons;
            else{
               this.dialogContent.buttons={ok:'Ok'};
            }
            this.showDialog=true;
          });

           AppFrameworkEventBus.$on('snackbar',(opt)=>{
             this.snackbar.message=opt.message;
             this.snackbar.vertical=this.objProp(opt,'vertical','top');
             this.snackbar.horizontal=this.objProp(opt,'horizontal','right');
             this.snackbar.duration=this.objProp(opt,'duration',4000);
             this.snackbar.messagetype=this.objProp(opt,'messagetype','info');
             this.snackbar.message=opt.message;
             this.showSnackbar=true;
          });

          AppFrameworkEventBus.$on('showloader',(opt)=>{
             this.loaderText=this.coalesce(opt,'');
             this.showLoader=true;
          });

          AppFrameworkEventBus.$on('loaderstatus',(opt)=>{
             this.loaderText=this.coalesce(opt,'');
          });

          AppFrameworkEventBus.$on('hideloader',(opt)=>{
              this.loaderText='';
              this.showLoader=false;
          });

          AppFrameworkEventBus.$on('add_activity',(id)=>{
             this.currentActivity.push(id);
          });

          AppFrameworkEventBus.$on('remove_activity',(id)=>{
             this.arrayRemoveItem(this.currentActivity,id);
          });


        },
        methods : {
            closeSnackbar() {
                this.snackbar.message='';
            },
            dialogButtonClicked(btn){
              this.dialogContent.title = '';
              this.dialogContent.content = ' ';
              this.showDialog=false;
              setTimeout(()=>{
                //Finish animation before resolving
                this.dialogContent.promiseHandler.resolve(btn);
              },200);

            },
        },
        components:{

        }
    }
</script>
