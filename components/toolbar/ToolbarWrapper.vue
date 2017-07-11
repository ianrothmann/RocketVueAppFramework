<script>
    import Themable from '../mixins/themeable';
    import Contextualable from '../mixins/contextualable';
    export default{
        props : {
            dark : Boolean,
            fixed : Boolean,
            title : String,
            sideIcon : Boolean,
            prominent : Boolean,
            dense : Boolean
        },
        mixins : [Contextualable,Themable],
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

            if(this.dense){
                props['dense']=true;
            }

            if(this.prominent){
                props['prominent']=true;
            }


            const items=[];
            if(this.sideIcon){
                items.push(h('v-toolbar-side-icon',{
                    props : Object.assign({'icon':true},shade),
                    nativeOn : {
                        click : e => {
                            e.stopPropagation();
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
              props,
              class : this.getContextClasses()
          },items.concat(
              [h('v-spacer',{},''),this.$slots.default]

          ));
        }
    }
</script>
