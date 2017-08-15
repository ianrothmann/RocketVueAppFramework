<script>
    import Contextualable from '../mixins/contextualable'
    import Themeable from '../mixins/themeabledark'
    export default{
        mixins : [Contextualable],
        props : {
            indeterminate: Boolean,
            falseValue: String,
            trueValue: String,
            value : {},
            label : String,
            name : String,
            error : Boolean,
            errorText : String,
            color:String,
            light : Boolean,
            dark : Boolean
        },
        data(){
            return {
                rules: [],
            }
        },
        watch : {
            error(){
                this.createError();
            }
        },
        mounted(){
            this.createError();
        },
        methods : {
            createError(){
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
        render(h){
          const props=Object.assign({},this.$props);
          props['inputValue']=this.value;
          if(typeof props['inputValue'] === 'number'){
              props['inputValue']=props['inputValue']>0;
          }

          props['value']=props['trueValue'];

          if(this.$validator!==undefined&&this.name){
              if(this.verrors.has(this.name)){
                  props['rules']=[()=>this.verrors.first(this.name)];
              }
          }else{
              props['rules']=this.rules;
          }
            if(!props.color)
                props['color']=this.getColorProperty();

          return h('v-switch',{
              props,
              attrs : {
              },
              on : {
                  change : e => {
                      this.$emit('input',e);
                      this.$emit('change',e);
                  }
              }
          },this.$slots.default);
        }
    }
</script>
