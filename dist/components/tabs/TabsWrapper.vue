<script>
import {AppFrameworkEventBus} from '../../framework';
    export default{
       props: {
            centered: {'default' : false},
            grow: {'default' : true},
            scrollBars: {'default' : false},
            value: String,
            dark:{'default' : true, type:Boolean},
            light:Boolean,
            sliderColor : String
        },
        data(){
            return{
                id:'tab',
                tabs : [],
                defaultTabid:null
            }
        },
        created(){
           this.id=AppFrameworkEventBus.getUniqueID('tab');
        },
        mounted(){
            if(this.defaultTabid!==null){
                setTimeout(()=>{
                    this.$emit('input',this.defaultTabid);
                },100);
            }
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
                if(props.id && props.id!=='')
                    tabid=props.id;

                if(props.active&&props.active===true){
                    this.defaultTabid=tabid;
                }

                let tabTitle=[];
                if(props.hasOwnProperty('title')&&props.title!=='')
                 tabTitle.push(props.title);

                if(props.hasOwnProperty('icon')&&props.icon!==''){
                  icons=true;
                  tabTitle.push(h('v-icon',{},props.icon));
                }

                tabNodes.push(h('v-tabs-item',{attrs: {href:'#'+tabid, id:tabid, ripple:true}},tabTitle));
                tabContent.push(h('v-tabs-content',{attrs: {id:tabid}}, [node])),
                id++;
            }

          });

         const sliderProps = {
             class : this.sliderColor || 'secondary'
          };

          const tabsBar=[h('v-tabs-bar',{},tabNodes.concat(h('v-tabs-slider',sliderProps)))];


          let props=this.$props;
          props['icons']=icons;
          return h('v-tabs',{
            props:props,
            on : {
                input : e => this.$emit('input',e)
            }
          },tabsBar.concat(h('v-tabs-items',{},tabContent)));
        }
    }
</script>
