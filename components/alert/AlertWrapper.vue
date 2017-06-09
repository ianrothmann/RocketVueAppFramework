<script>
    import Contextualable from '../mixins/contextualable'
    import Themeable from '../mixins/themeable'
    export default{
        props : {
            value : Boolean,
            icon : String,
            dismiss : Boolean,
            dismissAfter : Number,
        },
        data(){
             return {
                'show':false
             }
        },
        watch:{
            value(){
                this.updateValue();
            }
        },
        mounted(){
           this.updateValue();
        },
        methods : {
           updateValue(){
               this.show=this.value;

               if(this.dismissAfter&&this.value===true){
                   setTimeout(()=>{
                       this.show=false;
                       this.emitValue();
                   },this.dismissAfter)
               }
           },
           emitValue(){
               this.$emit('input',this.show);
           }
        },
        mixins : [Contextualable,Themeable],
        render(h){
            let data={
                on:{
                  input : (val)=>{
                      this.show=val;
                      this.emitValue();
                  }
                }
            };
            data['props']=Object.assign({},this.$props);
            data['props']['value']=this.show;

            if(this.dismiss)
                data['props']['dismissible']=true;

            return h('v-alert',data,this.$slots.default);
        }
    }
</script>
