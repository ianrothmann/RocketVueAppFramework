<script>
    import Contextualable from '../mixins/contextualable'
    import Themeable from '../mixins/themeabledark'
    export default{
        mixins : [Contextualable],
        props : {
            indeterminate: Boolean,
            falseValue: {type:[String,Number]},
            trueValue: {type:[String,Number]},
            value : {},
            label : String,
            color : String,
            name : String,
            error : Boolean,
            errorText : String,
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

            return h('v-radio',{
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
