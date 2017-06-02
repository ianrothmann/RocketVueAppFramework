<script>
    export default{
       props: {
            noRipple : Boolean,
            value: String,
            dividers : Boolean
        },
        data(){
            return{

            }
        },
        methods : {
           renderGroup(h,node){
               let props = node.componentOptions.propsData;

               const ownContent=[
                   h('v-list-tile-content',{},[h('v-list-tile-title',{},props.title)]),
                   h('v-list-tile-action',{},[h('v-icon',{},'keyboard_arrow_down')])
               ];

               if(this.icon){
                   ownContent.unshift(h('v-list-tile-action',{},[h('v-icon',{},this.icon)]));
               }
               let value=false;
               const items=[];
               node.componentOptions.children.forEach((child)=> {
                   if (child.tag !== undefined && child.tag.indexOf('rw-list-item') > -1) {
                       let props = child.componentOptions.propsData;
                       if(props['id']!==undefined&&props['id']==this.value)
                           value=true;
                       items.push(this.renderItem(h,child));
                   }
               });

               return h('v-list-group',{
                   props : {
                      value
                   },
                   on: node.componentOptions.listeners,
                 },[
                   h('v-list-tile',{
                       slot : 'item'
                   },ownContent),
               ].concat(items));
           },
           renderItem(h,node,lastItem){
               let props = node.componentOptions.propsData;
               const content=[
                   h('v-list-tile-title',{},props.title),
                   h('v-list-tile-sub-title',{},node.componentOptions.children)
               ];

               let final;

               const action=[];
               if(props.icon!==undefined){
                   action.push(
                       h('v-icon',{},props.icon),
                   );

                   if(props.iconEnd!==undefined){
                       final=[
                           h('v-list-tile-content',{},content),
                           h('v-list-tile-action',{},action)
                       ]
                   }else{
                       final=[
                           h('v-list-tile-action',{},action),
                           h('v-list-tile-content',{},content)
                       ]
                   }
               }else{
                   final=[
                       null,
                       h('v-list-tile-content',{},content)
                   ]
               }

               const listeners=Object.assign({}, node.componentOptions.listeners);

               let value=false;
               if(props['id']!==undefined){
                 if(props['id']==this.value)
                     value=true;

                 listeners['click']=(e)=>{
                     this.$emit('input',props['id']);
                     if(node.componentOptions['listeners']&&node.componentOptions.listeners.hasOwnProperty('click'))
                         node.componentOptions.listeners.click(e);
                 };
               }

               return h('v-list-item',{
                   on: listeners,
               },[h('v-list-tile',{
                   props : {
                       ripple : !this.noRipple,
                       href : props['href'],
                       disabled : props['disabled'],
                       value
                   }
               },final)]);

           },
           renderHeader(h,node){
             return h('v-subheader',{
                 on: node.componentOptions.listeners,
             },node.componentOptions.children);
           },
           renderDivider(h,node){
             return h('v-divider',{
                 on: node.componentOptions.listeners,
             },'');
           }
        },
        render(h) {
            const items=[];
            let lastItem='';
            this.$slots.default.forEach((node)=> {
                if (node.tag !== undefined && node.tag.indexOf('rw-list-item') > -1) {
                    if((lastItem==='rw-list-group'||lastItem==='rw-list-item')&&this.dividers){
                        items.push(this.renderDivider(h,node,lastItem));
                    }
                    items.push(this.renderItem(h,node,lastItem));
                    lastItem='rw-list-item';
                }else if (node.tag !== undefined && node.tag.indexOf('rw-list-group') > -1) {
                    if((lastItem==='rw-list-group'||lastItem==='rw-list-item')&&this.dividers){
                        items.push(this.renderDivider(h,node,lastItem));
                    }
                    items.push(this.renderGroup(h,node,lastItem));
                    lastItem='rw-list-group';
                }else if (node.tag !== undefined && node.tag.indexOf('rw-list-header') > -1) {
                    items.push(this.renderHeader(h,node,lastItem));
                    lastItem='rw-list-header';
                }else if (node.tag !== undefined && node.tag.indexOf('rw-list-divider') > -1) {
                    //don't render divider after list group or another divider
                    if(lastItem!=='rw-list-group'&&lastItem!=='rw-list-divider'){
                        items.push(this.renderDivider(h,node,lastItem));
                        lastItem='rw-list-divider';
                    }
                }
            });

          let props=this.$props;
          props['subheader']=true;
          return h('v-list',{
            props:props,
            on : {
                input : e => this.$emit('input',e)
            }
          },items);
        }
    }
</script>
