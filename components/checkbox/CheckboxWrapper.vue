<script>
    import Contextualable from '../mixins/contextualable'
    import Themeable from '../mixins/themeabledark'
    export default{
        mixins : [Contextualable,Themeable],
        props : {
            indeterminate: Boolean,
            falseValue: String,
            trueValue: String,
            value : {},
            label : String,
            name : String,
            error : Boolean,
            errorText : String,
        },
        data(){
            return {
                rules: [],
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
        inject: ['$validator'],
        render(h){
          const props=Object.assign({},this.$props);
          props['inputValue']=this.value;

          props['value']=props['trueValue'];

          if(this.$validator!==undefined&&this.name){
              if(this.verrors.has(this.name)){
                  props['rules']=[()=>this.verrors.first(this.name)];
              }
          }else{
              props['rules']=this.rules;
          }

          return h('v-checkbox',{
              props,
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
