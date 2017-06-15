<template>
   <div @drop="drop($event)" @dragover="dragHover($event)" @dragleave="dragLeave($event)">

           <input type="file" :accept="processedAccept" :multiple="true" :disabled="disabled"
                  ref="fileInput" @change="onFileChange">
       <rw-subheader v-html="processedLabel" trim></rw-subheader>
           <v-list dense subheader v-if="files.length>0">

               <draggable :list="files" :options="{animation:50, disabled:!reOrder}" @start="startReorder($event)" @end="updateOrder()">
                   <v-list-item v-for="(file,index) in files" :key="file.originalfilename">
                       <v-list-tile avatar :disabled="file.deleting||reorderActive" :class="{'no-drag':!reOrder}">
                           <v-list-tile-avatar  v-if="(file.uploading)||file.deleting">
                               <v-progress-circular v-if="file.deleting" indeterminate class="warning--text"></v-progress-circular>
                               <v-icon class="error--text" v-if="file.error">error</v-icon>
                               <v-progress-circular :value="file.progress || 0" class="primary--text" v-if="!file.deleting&&!file.error"></v-progress-circular>

                           </v-list-tile-avatar>
                           <v-list-tile-avatar v-else>
                               <img :src="file.url" v-if="file.thumbnail&&file.thumbnail!==''" />
                               <v-icon v-else>insert_drive_file</v-icon>
                           </v-list-tile-avatar>
                           <v-list-tile-content>
                               <v-list-tile-title>{{file.originalfilename}}</v-list-tile-title>
                               <v-list-tile-sub-title v-if="file.uploading"><span v-if="file.error" class="error--text">Error: {{file.error}}</span><span v-else>Uploading {{humanFileSize(file.size*(file.progress/100))}} of {{humanFileSize(file.size)}}</span></v-list-tile-sub-title>
                               <v-list-tile-sub-title v-else>{{humanFileSize(file.size)}}</v-list-tile-sub-title>
                           </v-list-tile-content>
                           <v-list-tile-action>
                               <v-menu bottom left v-if="!file.error&&!file.uploading">
                                   <v-btn icon="icon" slot="activator" class="grey--text text--lighten-1">
                                       <v-icon>more_vert</v-icon>
                                   </v-btn>
                                   <v-list>
                                       <v-list-item v-if="isImage(file.mimetype)">
                                           <v-list-tile @click.native="previewImage(index)">
                                               <v-list-tile-title>Preview</v-list-tile-title>
                                           </v-list-tile >
                                       </v-list-item>
                                       <v-list-item>
                                           <v-list-tile @click.native="downloadFile(file.url)">
                                               <v-list-tile-title>Download</v-list-tile-title>
                                           </v-list-tile >
                                       </v-list-item>
                                       <v-list-item>
                                           <v-list-tile @click.native="confirmDelete(index,$event)">
                                               <v-list-tile-title>Delete</v-list-tile-title>
                                           </v-list-tile>
                                       </v-list-item>
                                   </v-list>
                               </v-menu>
                           </v-list-tile-action>
                       </v-list-tile>

                   </v-list-item>


               </draggable>
           </v-list>
           <v-list dense>
               <v-list-item v-if="dragHovering">
                   <v-list-tile avatar class="grey lighten-3">
                       <v-list-tile-avatar>
                           <v-icon class="grey lighten-3">library_add</v-icon>
                       </v-list-tile-avatar>
                       <v-list-tile-content>
                           <v-list-tile-title>Drop to add files... </v-list-tile-title>
                       </v-list-tile-content>
                   </v-list-tile>
               </v-list-item>

               <v-list-item v-if="globalError">
                   <v-list-tile avatar class="error--text">
                       <v-list-tile-avatar>
                           <v-icon class="error--text">error</v-icon>
                       </v-list-tile-avatar>
                       <v-list-tile-content>
                           <v-list-tile-title>{{globalError}}</v-list-tile-title>
                       </v-list-tile-content>
                   </v-list-tile>
               </v-list-item>

               <v-list-item v-if="validationError">
                   <v-list-tile avatar class="error--text">
                       <v-list-tile-avatar>
                           <v-icon class="error--text">error</v-icon>
                       </v-list-tile-avatar>
                       <v-list-tile-content>
                           <v-list-tile-title>{{validationError}}</v-list-tile-title>
                       </v-list-tile-content>
                   </v-list-tile>
               </v-list-item>

               <v-list-item v-if="!dragHovering&&!globalError&&(!maxNumFiles || files.length <maxNumFiles) ">
                   <v-list-tile avatar class="no-drag" @click.native="onUploadClick()">
                       <v-list-tile-avatar>
                           <v-icon class="green--text text--lighten-1">add_circle</v-icon>
                       </v-list-tile-avatar>
                       <v-list-tile-content>
                           <v-list-tile-title class="green--text">Click here to add (or drop files here)</v-list-tile-title>
                       </v-list-tile-content>
                   </v-list-tile>
               </v-list-item>
           </v-list>


       <v-dialog v-show="delDialog" v-model="delDialog" persistent>
           <v-card>
               <v-card-row>
                   <v-card-title>Are you sure?</v-card-title>
               </v-card-row>
               <v-card-row>
                   <v-card-text>Are you sure that you want to delete <span v-if="delIndex!==null">{{files[delIndex].originalfilename}}</span>?</v-card-text>
               </v-card-row>
               <v-card-row actions>
                   <v-btn class="info--text" flat="flat" @click.native="delDialog = false">Cancel</v-btn>
                   <v-btn class="warning--text" flat="flat" @click.native="deleteFile(delIndex)">OK</v-btn>
               </v-card-row>
           </v-card>
       </v-dialog>

       <v-dialog v-if="lightboxDialog" width="70%" v-model="lightboxDialog">
           <v-carousel>
               <v-carousel-item v-if="lightboxIndex!==null" :src="files[lightboxIndex].url"></v-carousel-item>
           </v-carousel>
       </v-dialog>

   </div>
</template>
<style scoped>
    input[type=file] {
        position: absolute;
        left: -99999px;
    }
    .no-drag{
        user-drag: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-drag: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }

</style>
<script>
    import draggable from 'vuedraggable';
    export default{
        props : {
            name : String,
            value: {
                type: [Array],
                'default' : []
            },
            accept: {
                type: Array
            },
            label: {
                type: String,
                default: "Files"
            },
            required: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            reOrder: {
                type: Boolean,
                default: false
            },
            url : {
                type : String,
                required : true
            },
            maxNumFiles : {
                type : Number
            },
            maxFilesizeMb : {
                type : Number
            }
        },
        components: {
            draggable
        },
        inject : ['$validator'],
        mounted(){
            this.files=this.value;
            this.$watch('value', (val)=>{
                this.files=this.value;
            }, {deep: true});

        },
        beforeUpdate(){
            this.validate();
        },
        updated(){
           this.validate();
        },
        data(){
            return {
                files : [],
                lightboxDialog : false,
                lightboxIndex : null,
                reorderActive : false,
                delDialog : false,
                delIndex : null,
                dragHovering : false,
                validationError : null,
                globalError : null
            }
        },
        computed:{
            processedLabel(){
                return this.label + (this.reOrder&&this.files.length>0?' (drag to reorder)':'');
            },
            processedAccept(){
                return !this.accept?'':this.accept.join(',');
            },
            formattedAccept(){
                if(!this.accept)
                    return '';

                return this.accept.map((el)=>{
                    return el.substring(el.lastIndexOf('/')+1);
                }).join(', ');
            }
            /*
           imageFiles(){
               return this.files.filter((item)=>{
                   return this.isImage(item.mimetype);
               });
           }
           */
        },
        methods : {
            validate(){
                if(this.$validator!==undefined&&this.name){
                    if(this.verrors.has(this.name)){
                        this.validationError=this.verrors.first(this.name);
                    }
                }
            },
            drop(e){
                this.dragLeave(e);
                this.onFileChange(e);
            },
            dragHover(e){
                e.stopPropagation();
                e.preventDefault();
                if(!this.dragHovering){
                     this.dragHovering=true;
                     //more work could be done here
                }
            },
            dragLeave(e){
                e.stopPropagation();
                e.preventDefault();
                this.dragHovering=false;
            },
            startReorder(){
                this.reorderActive=true;
            },
            updateOrder(){
                this.reorderActive=false;
                this.$emit('input', this.files);
                this.$emit('reorder', this.files);
            },
            humanFileSize(size) {
                if(size===0)
                    return '0 B';
                let i = Math.floor( Math.log(size) / Math.log(1024) );
                return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
            },
            getFormData (files) {
                const data = new FormData();
                for (let file of files) {
                    data.append('files[]', file, file.name);
                }
                return data;
            },
            onUploadClick(){
                if (!this.disabled) {
                    this.$refs.fileInput.click();
                }
            },
            onFileChange($event){
                const files = $event.target.files || $event.dataTransfer.files;
                this.validationError=null;
                if(this.validateFiles(files)){
                    for (let file of files) {
                        this.upload(file);
                    }
                }
            },
            validateFiles(files){
                const fileFilterActive=this.accept&&this.accept.length>0;

                if(!this.maxNumFiles&&!this.maxFilesizeMb&&!fileFilterActive)
                    return true;
                let cnt=0;
                let result=true;
                let exceededMaxFilesize=false;
                let filesAccepted=true;

                for (let file of files) {
                    cnt++;
                    if(this.maxFilesizeMb && file.size>this.maxFilesizeMb)
                        exceededMaxFilesize=true;

                    if(fileFilterActive){
                        if(this.accept.find(el=>el.toLowerCase()===file.type.toLowerCase())===undefined)
                            filesAccepted=false;
                    }

                }

                if(this.maxNumFiles&&(cnt+this.files.length)>this.maxNumFiles){
                    this.maxNumFiles===1 ? this.globalError='Only one file is allowed' : this.globalError='Only '+ this.maxNumFiles+' file(s) are allowed.';
                    result=false;
                }else if(exceededMaxFilesize){
                    this.globalError='Some files are larger than ' +  this.maxFilesizeMb + 'Mb.';
                    result=false;
                }else if(!filesAccepted){
                    this.globalError='The following file types are accepted: ' +  this.formattedAccept;
                    result=false;
                }

                if(!result){
                    setTimeout(()=>{
                        this.globalError=null;
                    },3000);
                }

                return result;

            },
            upload(file){
                let file_entry={
                    file,
                    originalfilename : file.name,
                    mimetype : file.type,
                    size : file.size,
                    uploading : true,
                    progress : 0,
                    error : null
                };
                this.files.push(file_entry);

                let data = new FormData();
                data.append('command', 'upload');
                data.append('file', file);
                data.append('name', file.name);
                data.append('_token', Laravel.csrfToken);

                let request = new XMLHttpRequest();

                request.onreadystatechange = ()=>{
                    if(request.readyState === 4){
                        let resp;
                        try {
                            resp = JSON.parse(request.response);
                        } catch (e){
                            resp = {
                                status: 'error',
                                data: request.responseText
                            };
                        }


                        if(resp['status']==='error'){
                            file_entry.error=resp['data'];
                            setTimeout(()=>{
                                this.removeFileFromList(file);
                            },5000);
                        }else{
                            file_entry.uploading=false;
                            file_entry.url=resp.url;
                            if(resp.thumbnail)
                                file_entry.thumbnail=resp.thumbnail;

                            this.$emit('input', this.files);
                        }


                    }
                };

                request.upload.addEventListener('progress', (e)=>{
                      file_entry.progress=100*(e.loaded/e.total);
                }, false);

                request.open('POST', this.url);
                request.setRequestHeader('X-Requested-With','XMLHttpRequest');
                request.send(data);
            },
            isImage(mime){
                return mime.indexOf('image')>-1;
            },
            downloadFile(url){
                window.open(url);
            },
            confirmDelete(index,e){
                this.delIndex=index;
                this.delDialog=true;

            },
            deleteFile(index){
                this.delDialog = false;
                const file=this.files[index];
                this.delIndex=null;
                this.$set(file,'deleting',true);
                this.$http.post(this.url,{command:'delete',file}).then(()=>{
                    this.removeFileFromList(file);
                    this.$emit('input', this.files);
                });

            },
            removeFileFromList(file){
                this.files=this.files.filter((item)=>{
                    return item!==file;
                });
            },
            previewImage(index){
                this.lightboxIndex=index;
                this.lightboxDialog=true;
            }
        }
    }
</script>
