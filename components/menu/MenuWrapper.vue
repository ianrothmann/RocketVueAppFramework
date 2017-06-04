<script>
    export default{
        props : {
            dark : Boolean,
            icon : String,
            lazy : Boolean,
            title : String,
            offsetX: Boolean,
            offsetY: Boolean,
            disabled: Boolean,
            left: Boolean,
            right: Boolean,
            top: Boolean,
            bottom: Boolean,
            origin : String
        },
        render(h){
            const menuProps=this.$props;
            let items=[];
            if(this.$slots.hasOwnProperty('activator')){
                items.push(h('template',{slot:'activator'},this.$slots.activator));
            }else if(this.icon){
                const props={
                    icon:'icon',
                };
                if(this.dark){
                    props['dark']=true;
                }else{
                    props['light']=true;
                }
                items.push(h('v-btn',{
                      props,
                      slot : 'activator'
                    },[h('v-icon',{},this.icon)]));
            }else if(this.title){
                const props={
                    icon:'icon',
                };
                if(this.dark){
                    props['dark']=true;
                }else{
                    props['light']=true;
                }
                items.push(h('v-btn',{
                    props,
                    slot : 'activator'
                },this.title));
                menuProps['offset-y']=true;
            }
            console.log(menuProps);
            return h('v-menu',{
                props:menuProps
            },items.concat(this.$slots.default));
        }
    }
</script>
