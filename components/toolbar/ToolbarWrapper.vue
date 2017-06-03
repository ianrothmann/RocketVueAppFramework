<script>
    export default{
        props : {
            dark : Boolean,
            fixed : Boolean,
            title : String,
            sideIcon : Boolean,
        },
        render(h){
            const shade={};

            if(this.dark){
                shade['dark']=true;
            }else{
                shade['light']=true;
            }
            const props=Object.assign({},shade);

            if(this.fixed){
                props['fixed']=true;
            }

            const items=[];
            if(this.sideIcon){

                items.push(h('v-btn',{
                    props : Object.assign({'icon':true},shade),
                    nativeOn : {
                        click : e => {
                            this.$emit('side-icon-click',e);
                        }
                    }
                },[h('v-icon',{

                },'menu')]));
            }
            if(this.title){
                items.push(h('v-toolbar-title',{},this.title));
            }
            //
          return h('v-toolbar',{
              props
          },items.concat(
              [h('v-toolbar-items',{},this.$slots.default)]
          ));
        }
    }
</script>
