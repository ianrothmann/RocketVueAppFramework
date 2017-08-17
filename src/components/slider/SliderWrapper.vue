<script>
    export default{
        props : {
            inverted: Boolean,
            min: {
                type: [Number, String],
                default: 0
            },
            max: {
                type: [Number, String],
                default: 100
            },
            step: {
                type: [Number, String],
                default: 0
            },
            thumbLabel: Boolean,
            value: [Number, String],
            vertical: Boolean,
            label : String,
            disabled : Boolean,
            error : Boolean,
            errorText : String,
            name : String,
            prependIcon : String,
            appendIcon : String
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

            if(this.step && this.step>1){
                props['snap']=true;
            }

            if(this.$validator!==undefined&&this.name){
                if(this.verrors.has(this.name)){
                    props['rules']=[()=>this.verrors.first(this.name)];
                }
            }else{
                props['rules']=this.rules;
            }

            return h('v-slider',{
                props,
                attrs : {
                },
                on : {
                    input : e => {
                        this.$emit('input',e);
                        this.$emit('change',e);
                    }
                }
            },this.$slots.default);
        }
    }
</script>
