<script>
import {AppFrameworkEventBus} from '../../framework';
    export default{
       props: {
            centered: {'default' : false},
            grow: {'default' : true},
            scrollBars: {'default' : false},
            value: String
        },
        data(){
            return{
                id:'tab',
                tabs : [],
                active : 1
            }
        },
        created(){
           this.id=AppFrameworkEventBus.getUniqueID('tab');
        },
        render(h) {
          let id=1;
          const tabNodes=[];
          const tabContent=[];
          let icons=false;

          this.$slots.default.forEach((node)=>{
            if(node.tag!==undefined&&node.tag.indexOf('rw-tab')>-1){
                let props=node.componentOptions.propsData;
                let tabid=this.id+'_'+id;

                let tabTitle=[];
                if(props.hasOwnProperty('title')&&props.title!='')
                 tabTitle.push(props.title);

                if(props.hasOwnProperty('icon')&&props.icon!=''){
                  icons=true;
                  tabTitle.push(h('v-icon',{},props.icon));
                }

                tabNodes.push(h('v-tab-item',{slot:'activators',domProps: {href:'#'+tabid, id:tabid}},tabTitle));
                tabContent.push(h('v-tab-content',{slot:'content', domProps: {id:tabid}}, [node])),
                id++;
            }

          });

          let props=this.$props;
          props['icons']=icons;
          return h('v-tabs',{
            props:props,
            on : {
                input : e => this.$emit('input',e)
            }
          },tabNodes.concat(tabContent));
        }
    }
</script>
