<script>
    export default{
        props : {
            locale : {required:true},
            line : {required:true},
            html : {required:false, default:false},
            url : {required:true}
        },
        data(){
            return {
                updated : false,
                content : null,
                editing : false,
                savedcontent : ''
            }
        },
        methods:{
           save(){
                this.$http.post(this.url,{locale:this.locale,line:this.line,content:this.content}).then(()=>{
                    this.savedcontent=this.content;
                    this.updated=true;
                    this.editing=false;
                });
           }
        },
        mounted(){
            if(!this.updated){
                this.content=this.$refs.slotcontent.innerHTML;
            }
        },
        render(h){
           const children=[];
            if(!this.updated){
               children.push(this.$slots.default);
            }else{
                children.push(h('span',{
                    domProps: {
                        innerHTML: this.savedcontent
                    }
                },children));
            }

            const inner=h('span',{
                ref : 'slotcontent'
            },children);


            const editButton=h('v-btn',{
                props : {
                    icon:true,
                    small:true
                },
                slot : 'activator'
            },[h('v-icon',{props:{small:true}},'mode_edit')]);

            let editor;

            if(this.html){
                editor=h('quill-editor',{
                    props:{
                        value : this.content,
                    },
                    on:{
                        input : (e)=>{
                            this.content=e;
                        }
                    }
                });
            }else{
                editor=h('rw-input',{
                    props:{
                        value : this.content,
                        multiLine : true,

                    },
                    on:{
                        input : (e)=>{
                            this.content=e;
                        }
                    }
                });
                editor=h('v-card-text',{},[editor]);
            }


            const save=h('v-btn',{
                props:{
                    primary:true,
                },
                on : {
                    click : ()=>{
                        this.save();
                    }
                }
            },'Save');

            const cancel=h('v-btn',{
                props : {
                    secondary : true
                },
                on : {
                    click : ()=>{
                        this.editing=false;

                    }
                }
            },'Cancel');

            const buttons=h('v-card-actions',{},[h('v-spacer'),save,cancel]);

            const dialog=h('v-dialog',{
                props:{
                    width : '70%',
                    value : this.editing,
                },
                on:{
                    input : (e)=>{
                        this.editing=e;
                    }
                }
            },[editButton,h('v-card',{},[h('v-card-title',{class:'headline'},'Edit'),editor,buttons])]);



            return h('span',{},[inner,dialog,this.editing]);

        }
    }
</script>
