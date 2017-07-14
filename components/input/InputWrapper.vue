<script>
    export default{
        props : {
            value : String,
            label : String,
            hint : String,
            placeholder : String,
            error : Boolean,
            errorText : String,
            id : {required:false},
            name : {required:false},
            autofocus: Boolean,
            counter: Boolean,
            readonly: Boolean,
            prefix: String,
            suffix: String,
            maxlength: [Number, String],
            light:Boolean,
            dark:{type:Boolean,'default':false},
            password:Boolean,
            date : Boolean,
            time : Boolean,
            persistentHint:Boolean,
            disabled:Boolean,
            fullWidth:Boolean,
            multiline:Boolean,
            rows : Number,
            prependIcon : String,
            appendIcon : String,
            hideDetails : Boolean

        },
        data(){
            return {
                rules: [],
                showPassword : false
            }
        },
        watch : {
           error(){
              this.assignError();
           }
        },
        computed:{
            max(){
               return this.maxlength;
            },
            inputType(){
                return this.password?'password':
                       this.date?'date':
                       this.time?'time':
                       'text';
            },
            innerProps(){
                let props=Object.assign({},this.$props);
                props['rules']=this.rules;
                props['max']=this.maxlength;
                props['type']=this.inputType;
                if(props['type']==='password'){
                   props['appendIcon']=this.showPassword?'visibility':'visibility_off';
                   if(this.showPassword){
                       props['type']='text';
                   }
                   props['appendIconCb']=()=>{
                     this.showPassword=!this.showPassword;
                   };
                }
                props['multi-line']=this.multiline;

                if(this.$validator!==undefined&&this.name){
                    if(this.verrors.has(this.name)){
                        props['rules']=[()=>this.verrors.first(this.name)];
                        props['error']=true;
                    }
                }

                return props;
            }
        },
        methods : {
           assignError(){
               if(this.error){
                   this.rules=[
                       () => this.errorText
                   ];
               }else{
                   this.rules=[];
               }
           }
        },
        inject: ['$validator'],
        mounted(){
            this.assignError();
        },
        render(h){

          return h('v-text-field',{
              props : this.innerProps,
              on : {
                  input : e => this.$emit('input',e),
                  focus : e => this.$emit('focus',e),
                  blur : e => this.$emit('blur',e),
                  change : e => this.$emit('change',e)
              }
          },this.$slots.default);
        }
    }
</script>
