<template>
   <div>

       <input type="file" :accept="accept" :multiple="true" :disabled="disabled"
              ref="fileInput" @change="onFileChange">

       <div v-if="files.length===0">
           <div class="body-2 grey--text " v-html="label"></div>
           <div class="text-xs-center grey--text text--lighten-1">No files have been uploaded<br><v-btn info light @click.native="onUploadClick()">Upload</v-btn></div>
       </div>
       <v-list dense subheader v-else>
           <v-subheader v-html="label"></v-subheader>
           <v-list-item v-for="(file,index) in files" :key="index">
               <v-list-tile avatar>
                   <v-list-tile-avatar v-if="file.uploading">
                       <v-progress-circular :value="file.progress" class="primary--text"></v-progress-circular>
                   </v-list-tile-avatar>
                   <v-list-tile-avatar v-else>
                       <img src="http://lorempixel.com/96/96/people" v-if="isImage(file.mimetype)" />
                       <v-icon v-else>insert_drive_file</v-icon>
                   </v-list-tile-avatar>
                   <v-list-tile-content>
                       <v-list-tile-title>{{file.filename}}</v-list-tile-title>
                       <v-list-tile-sub-title v-if="file.uploading">Uploading {{humanFileSize(file.size*(file.progress/100))}} of {{humanFileSize(file.size)}}</v-list-tile-sub-title>
                       <v-list-tile-sub-title v-else>{{humanFileSize(file.size)}}</v-list-tile-sub-title>
                   </v-list-tile-content>
                   <v-list-tile-action>
                       <v-menu bottom left>
                           <v-btn icon="icon" slot="activator" class="grey--text text--lighten-1">
                               <v-icon>more_vert</v-icon>
                           </v-btn>
                           <v-list>
                               <v-list-item>
                                   <v-list-tile>
                                       <v-list-tile-title>Download</v-list-tile-title>
                                   </v-list-tile>
                               </v-list-item>
                               <v-list-item>
                                   <v-list-tile>
                                       <v-list-tile-title>Delete</v-list-tile-title>
                                   </v-list-tile>
                               </v-list-item>
                           </v-list>
                       </v-menu>
                   </v-list-tile-action>
               </v-list-tile>

           </v-list-item>

       </v-list>

   </div>
</template>
<style scoped>
    input[type=file] {
        position: absolute;
        left: -99999px;
    }
</style>
<script>
    export default{
        props : {
            value: {
                type: [Array, String]
            },
            accept: {
                type: String,
                default: "*"
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
            url : {
                type : String,
                required : true
            }

        },
        data(){
            return {
                files : []
            }
        },
        methods : {
            humanFileSize(size) {
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
                   // debugger;
                    this.$refs.fileInput.click();
                }
            },
            onFileChange($event){
                const files = $event.target.files || $event.dataTransfer.files;
                for (let file of files) {
                    this.upload(file);
                }
            },
            upload(file){
                let file_entry={
                    file,
                    filename : file.name,
                    mimetype : file.type,
                    size : file.size,
                    uploading : true,
                    progress : 0
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
                                data: 'Unknown error occurred: [' + request.responseText + ']'
                            };
                        }

                        //this.innerValue.push(resp);
                       // this.$emit('input', this.innerValue);

                        file_entry.uploading=false;
                        //this.files=[];
                        console.log(resp);
                    }
                };

                request.upload.addEventListener('progress', (e)=>{
                    file_entry.progress=100*(e.loaded/e.total);
                }, false);

                request.open('POST', this.url);
                request.send(data);
            },
            isImage(mime){
                return mime.indexOf('image')>-1;
            }
        }
    }
</script>
