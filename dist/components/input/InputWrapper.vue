<script>
    import Validation from '../mixins/validation';
    export default{
        props : {
            value : {},
            label : String,
            hint : String,
            placeholder : String,
            error : Boolean,
            errorText : String,
            id : {required:false},
            name : {required:false},
            autofocus: Boolean,
            counter: Number|String,
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
        mixins:[Validation],
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
                }

                if(this.$validator!==undefined&&this.name){
                    props['error-messages']=this.validationErrors;
                }

                return props;
            },
            innerAttrs(){
                const props={};

                if(this.name)
                    props.name=this.name;

                if(this.id)
                    props.id=this.id;

                if(this.readonly)
                    props.readonly=this.readonly;


                return props;
            },
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

            let el='v-text-field';
            if(this.multiline){
                el='v-textarea';
            }

          return h(el,{
              props : this.innerProps,
              attrs : this.innerAttrs,
              on : {
                  input : e => this.$emit('input',e),
                  focus : e => this.$emit('focus',e),
                  blur : e => this.$emit('blur',e),
                  change : e => this.$emit('change',e),
                  'click:append' : e =>this.showPassword=!this.showPassword
              }
          },this.$slots.default);
        }
    }
</script>
