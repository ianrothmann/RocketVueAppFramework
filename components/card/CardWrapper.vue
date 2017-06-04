<script>
    import Themable from '../mixins/themeable';
    import Contextualable from '../mixins/contextualable';
    export default{
        functional : true,
        props : {
          title:String,
          hover:Boolean,
          raised:Boolean,
          horizontal:Boolean,
          imgLeft:Boolean,
          imgRight:Boolean,
          img:String,
          imgHeight:String,
          fill:Boolean,
        },
        mixins : [Contextualable,Themable],
        render(h,ctx){
           function isset(val){
             return ctx.props[val]!==undefined&&ctx.props[val];
           }

           function getContextClasses(){
               const obj={};
               obj['primary']=isset('primary');
               obj['secondary']=isset('secondary');
               obj['success']=isset('success');
               obj['info']=isset('info');
               obj['warning']=isset('warning');
               obj['error']=isset('error');
               const hasclass=obj.primary || obj.secondary || obj.success || obj.info || obj.warning || obj.error;
               if(!isset('dark')&&hasclass)
                  obj['white--text']=true;
               else
                  obj['white--text']=isset('light');
               return obj;
           }

           let cardClasses={};
           let cardTitle=null;
           let cardInner;

           const contextClasses=getContextClasses();

           if(isset('fill')){
               cardClasses=Object.assign(cardClasses,contextClasses);
           }

           const titleChildren=[];
           const innerChildren=[];
           const actionChilden=[];

           ctx.children.forEach((node)=>{

               if(node.tag){
                   if(node.functionalOptions && node.functionalOptions.name==='title'){
                       titleChildren.push(node);
                   }else if(node.data && node.data.ref==='actions'){
                       if(node.data.props['divider']!==false)
                        actionChilden.push(h('v-divider'));

                       actionChilden.push(node);
                   }else{
                       innerChildren.push(node);
                   }
               }else{
                   innerChildren.push(node);
               }
           });

           if(ctx.props.title!==undefined&&titleChildren.length===0){
               cardTitle=h('v-card-title',{},[h('span',{},ctx.props.title),h('v-spacer'),titleChildren]);
               if(!isset('fill')){
                   cardTitle=h('v-card-row',{'class':contextClasses},[cardTitle]);
               }
           }else{
               cardTitle=titleChildren;
           }

           cardInner=h('v-card-text',{},innerChildren);

           let cardImg=null;
           if(isset('img')){
               cardImg=h('v-card-row',{
                   props : {
                       img:ctx.props.img,
                       height:ctx.props.imgHeight
                   }
               });
           }
           console.log( );
            let data={
                props:{
                    hover : ctx.props.hover,
                    raised : ctx.props.raised,
                    horizontal : ctx.props.horizontal
                },
                'class' : cardClasses
            };
            data=Object.assign(data,ctx.data);

            if(data.props.horizontal){
                if(ctx.props.imgRight){
                    return h('v-card',data,[h('v-card-column',{},[cardInner,actionChilden]),cardImg]);
                }else{
                    return h('v-card',data,[cardImg,h('v-card-column',{},[cardInner,actionChilden])]);
                }

            }else{
                return h('v-card',data,[cardTitle,cardImg,cardInner,actionChilden]);
            }



        }
    }
</script>
