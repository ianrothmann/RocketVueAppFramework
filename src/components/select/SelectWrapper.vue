<script>
    export default{
        props : {
            value : {
                type : [String,Object,Number,Array]
            },
            label : String,
            hint : String,
            items : Array,
            disabled : Boolean,
            error : Boolean,
            errorText : String,
            id : {required:false},
            name : {required:false},
            light:Boolean,
            dark:Boolean,
            persistentHint:Boolean,
            chips:Boolean,
            itemValue : String,
            itemText : {
                type : String,
                required : false,
                'default' : 'text'
            },
            prependIcon : String,
            appendIcon : String,
            search : Boolean,
            multi : Boolean

        },
        data(){
            return {
                rules: [],
                showPassword : false
            }
        },
        watch : {
           error(){
               if(this.error){
                   this.rules=[
                       () => this.errorText
                   ];
               }else{
                   this.rules=[];
               }
           }
        },
        computed:{
            innerProps(){
                let props=Object.assign({},this.$props);
                props['rules']=this.rules;

                if(this.$validator!==undefined&&this.name){

                    if(this.verrors.has(this.name)){
                        props['rules']=[()=>this.verrors.first(this.name)];
                        props['error']=true;
                    }
                }

                if(props['itemValue']===undefined)
                    props['itemValue']='id';

                if(props['search']){
                    props['autocomplete']=true;
                }

                if(props['multi']){
                    props['multiple']=true;
                }

                return props;
            }
        },
        inject: ['$validator'],
        mounted(){

        },
        render(h){
            /*
             TODO:List item custom formatting and server-items
             */
          return h('v-select',{
              props : this.innerProps,
              on : {
                  input : e => this.$emit('input',e)
              }
          },this.$slots.default);
        }
    }
</script>
