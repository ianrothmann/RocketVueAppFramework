<script>
    import Contextualable from '../mixins/contextualable'
    import Themeable from '../mixins/themeabledark'
    import Validation from '../mixins/validation';
    export default{
        mixins : [Contextualable,Validation],
        props : {
            value : {},
            label : String,
            name : String,
            error : Boolean,
            errorText : String,
            light : Boolean,
            dark : Boolean,
            color:String
        },

        data(){
            return {
                innerValue : null,
                innerError : ''
            }
        },
        watch : {
            value(){
                this.assignValue();
            },
            error(){
                this.createError();
            }
        },
        mounted(){
            this.assignValue();
            this.createError();
        },
        methods : {
            assignValue(){
                if(this.value){
                    this.innerValue=this.value;
                }else{
                    this.innerValue=null;
                }
            },
            createError(){
                if(this.error){
                    this.innerError=this.errorText;
                }else{
                    this.innerError=null;
                }
            },
            renderError(h){
                if(this.innerError!=''){
                    return h('rw-input-error',{},[this.innerError]);
                }else{
                    return null;
                }
            }
        },
        inject: ['$validator'],
        render(h){
            const props=Object.assign({},this.$props);

            if(this.$validator!==undefined&&this.name){
                this.innerError=this.validationError;
            }


            const children=[];
            children.push(h('rw-subheader',{props:{trim:true}},this.label));

            const radios=[];

            if(this.$slots.default){
                this.$slots.default.forEach((node)=> {
                    if (node.tag !== undefined && node.tag.indexOf('v-radio') > -1) {
                        const data=node.data;
                        if(node.componentOptions.hasOwnProperty('propsData'))
                            data['props']=Object.assign({},this.$props,node.componentOptions.propsData);
                        else
                            data['props']=Object.assign({},this.$props);
                        delete data.props['name'];
                        data['props']['color']=this.getColorProperty();


                        data['class']={'no-margins':true,'pb-0':true,'pt-0':true};
                        data['on']={
                          change : (e)=>{
                              this.innerValue=e;
                              this.$emit('input',this.innerValue);
                          }
                        };
                        radios.push(h('v-radio',data));
                    }
                });
            }

            children.push(h('v-radio-group',{
                props : {
                    inputValue : this.innerValue
                },
                on : {
                    input : (e)=>{
                        this.innerValue=e;
                        this.$emit('input',this.innerValue);
                    }
                }
            },radios));

            children.push(this.renderError(h));
            return h('div',{
                props,
            },children);
        }
    }
</script>
<style>
    .no-margins{
        margin:0!important;
    }
</style>
