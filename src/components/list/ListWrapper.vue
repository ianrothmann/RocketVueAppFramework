<script>
    export default{
       props: {
           noRipple : Boolean,
           value: String,
           dividers : Boolean,
           compact : Boolean,
           large : Boolean,
           valueFuzzyMatchStart:Boolean
        },
        methods : {
           matchValue(id,value){
               if(this.valueFuzzyMatchStart){
                   return value.startsWith(id);
               }else{
                   return id==value;
               }
           },
           renderGroup(h,node){
               let props = node.componentOptions.propsData;

               const ownContent=[
                   h('v-list-tile-content',{},[h('v-list-tile-title',{},props.title)])
               ];

               if(props.icon){
                   ownContent.unshift(h('v-list-tile-action',{},[h('v-icon',{},props.icon)]));
               }
               let value=false;

               const items=[];
               if(node.componentOptions.children){
                   node.componentOptions.children.forEach((child)=> {

                       if (child.tag !== undefined && child.tag.indexOf('rw-list-item') > -1) {
                           let props = child.componentOptions.propsData;
                           if(props['id']!==undefined&&this.matchValue(props['id'],this.value))
                               value=true;
                           items.push(this.renderItem(h,child));
                       }
                   });
               }


               return h('v-list-group',{
                   props : {
                      value
                   },
                   on: node.componentOptions.listeners,
                 },[
                   h('v-list-tile',{
                       slot : 'activator'
                   },ownContent),
               ].concat(items));
           },
           renderItem(h,node,lastItem){
               let props =  node.componentOptions.propsData;

               const listeners=Object.assign({}, node.componentOptions.listeners);

               let value=false;
               if(props['id']!==undefined){
                   if(this.matchValue(props['id'],this.value)){
                       value=true;
                   }


                   listeners['click']=(e)=>{
                       this.$emit('input',props['id']);
                       if(node.componentOptions['listeners']&&node.componentOptions.listeners.hasOwnProperty('click'))
                           node.componentOptions.listeners.click(e);
                   };
               }

               if(props.custom!==undefined){
                   return h('v-list-tile',{
                       props : {
                           ripple : false,
                           disabled : props['disabled'],

                       },
                       on: listeners,
                   },[h('v-list-tile-content',{},node.componentOptions.children)]);
               }

               const content=[
                   h('v-list-tile-title',{},props.title),
                   h('v-list-tile-sub-title',{},node.componentOptions.children)
               ];

               let final;

               const avatar=[];

               if(props.avatar!==undefined){
                   avatar.push(h('v-list-tile-avatar',{},[
                           h('img',{domProps:{'src':props.avatar}})
                       ]));
               }

               let action=[];
               let actionText=null;
               if(props.actionText!==undefined&&props.actionText!=''){
                   actionText=h('v-list-tile-action-text',{},props.actionText);
               }
               if(props.icon!=undefined){
                   action.push(
                       h('v-icon',{
                          'class':props.iconClass
                       },props.icon),
                   );

                   if(props.iconEnd!==undefined||(props.avatar!==undefined&&props.avatarEnd===undefined)){
                       action.unshift(actionText);
                       final=[
                           avatar,
                           h('v-list-tile-content',{},content),
                           h('v-list-tile-action',{},action),

                       ]
                   }else{


                       if(actionText!==null)
                           actionText=h('v-list-tile-action',{},[actionText]);

                       if(avatar.length===0){
                           /*if(props.iconEnd===undefined && !actionText){

                           }
                            */
                           final=[
                               h('v-list-tile-avatar',{},action),
                               h('v-list-tile-content',{},content),
                               actionText,
                               avatar
                           ]
                       }else{
                           final=[
                               h('v-list-tile-action',{},action),
                               h('v-list-tile-content',{},content),
                               actionText,
                               avatar
                           ]

                       }


                   }

               }else if(props.avatarEnd!==undefined){
                   if(actionText!==null)
                       actionText=h('v-list-tile-action',{},[actionText]);

                   final=[
                       h('v-list-tile-content',{},content),
                       actionText,
                       avatar
                   ]
               }else{
                   if(actionText!==null)
                       actionText=h('v-list-tile-action',{},[actionText]);

                   final=[
                       avatar,
                       h('v-list-tile-content',{},content),
                       actionText
                   ]
               }

               return h('v-list-tile',{
                   props : {
                       ripple : !this.noRipple,
                       href : props['href'],
                       disabled : props['disabled'],
                       avatar : props.avatar!==undefined,
                       value
                   },
                   attrs : {
                      target : props['target']
                   },
                   on: listeners,
               },final);

           },
           renderHeader(h,node){
               return h('v-subheader',node.componentOptions,node.componentOptions.children);
           },
           renderDivider(h,node){
             let data={};
             if(node!==null)
                 data=node.data||{};
          /*   if(!data.hasOwnProperty('props'))
                 data['props']={};

             if(!data.props.hasOwnProperty('inset'))
                   data['props']={};
             data['props']={'inset':true};
             //TODO sort out insets
             */
             return h('v-divider', data,'');
           }
        },
        render(h) {
            /*
            TODO:Avatars
             */
            const items=[];
            let lastItem='';
            if(this.$slots.default){
                this.$slots.default.forEach((node)=> {
                    if (node.tag !== undefined && node.tag.indexOf('rw-list-item') > -1) {
                        if((lastItem==='rw-list-group'||lastItem==='rw-list-item')&&this.dividers){
                            items.push(this.renderDivider(h,null,lastItem));
                        }

                        items.push(this.renderItem(h,node,lastItem));
                        lastItem='rw-list-item';
                    }else if (node.tag !== undefined && node.tag.indexOf('rw-list-group') > -1) {
                        if((lastItem==='rw-list-group'||lastItem==='rw-list-item')&&this.dividers){
                            items.push(this.renderDivider(h,null,lastItem));
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
            }


            let props=this.$props;
            props['subheader']=true;
            if(this.large){
                props['threeLine']=true;
            }
            if(this.compact){
                props['dense']=true;

            }

            return h('v-list',{
                props:props,
                on : {
                    input : e => this.$emit('input',e)
                }
            },items);
        }
    }
</script>
<style>
    .list__item .input-group .input-group__input input{
        height : 48px!important; /* to support text inputs in lists */
    }
</style>
