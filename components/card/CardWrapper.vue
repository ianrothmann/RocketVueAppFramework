<script>
    import Themable from '../mixins/themeable';
    import Contextualable from '../mixins/contextualable';
    export default{
        functional : true,
        props : {
          title:String,
          hover:Boolean,
          raised:Boolean,
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
                   if(node.tag.indexOf('rw-card-title')>-1){
                       titleChildren.push(node);
                   }else if(node.data && node.data.ref==='actions'){
                       actionChilden.push(node);
                   }else{
                       innerChildren.push(node);
                   }
               }else{
                   innerChildren.push(node);
               }
           });

           if(ctx.props.title!==undefined){
               cardTitle=h('v-card-title',{},[h('span',{},ctx.props.title),h('v-spacer'),titleChildren]);
               if(!isset('fill')){
                   cardTitle=h('v-card-row',{'class':contextClasses},[cardTitle]);
               }
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

           return h('v-card',{
            props:{
              hover : ctx.props.hover,
              raised : ctx.props.raised,
              horizontal : ctx.props.horizontal
            },
            'class' : cardClasses
           },[cardTitle,cardImg,cardInner,actionChilden]);
        }
    }
</script>
