<script>
    import Validation from '../mixins/validation';
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
        mixins:[Validation],
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
                    props['error-messages']=this.validationErrors;
                }

                if(props['itemValue']===undefined)
                    props['itemValue']='id';

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
            let el='v-select';
            if(this.innerProps.hasOwnProperty('search')&&this.innerProps.search===true){
                el='v-autocomplete';
            }

          return h(el,{
              props : this.innerProps,
              attrs : {
              },
              on : {
                  input : e => this.$emit('input',e)
              }
          },this.$slots.default);
        }
    }
</script>
