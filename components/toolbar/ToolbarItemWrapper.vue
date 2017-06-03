<script>
    export default{
        props : {
            text : {required:false},
            hint : {required:false},
            icon : String,
            href : {required:false},
            active : {required:false},
            disabled : {required:false},
        },
        render(h){
            const props=Object.assign({},this.$props);
            if(this.$options.parent.options&&this.$options.parent.options.hasOwnProperty('propsData')&&this.$options.parent.options.propsData.hasOwnProperty('dark')){
                props['dark']=true;
            }else{
                props['light']=true;
            }

            if(this.text){
                return h('v-toolbar-item',{
                    props,
                    'class':{
                        'toolbar__item--active':this.active
                    }
                },this.text);
            }else if(this.icon){
                    props['icon']=true;
                    return h('v-btn',{
                        props,
                        directives:[{
                            name:'tooltip',
                            value:{html:this.hint},
                            arg : 'bottom'
                        }],
                        'class':{
                            'toolbar__item--active':this.active
                        }
                    },[h('v-icon',{},this.icon)]);

            }

        }
    }
</script>
