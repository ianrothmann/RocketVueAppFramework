<script>
    import Themable from '../mixins/themeable';
    import Contextualable from '../mixins/contextualable';
    export default{
        functional : true,
        props : {
          title:String,
          titleIcon:String,
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
           const contextClasses=getContextClasses();

           if(isset('fill')){
               cardClasses=Object.assign(cardClasses,contextClasses);
           }

            const titleChildren=[];
            const innerChildren=[];
            const actionChildren=[];

            if(ctx.children){
                ctx.children.forEach((node)=>{

                    if(node.tag){
                        if(node.functionalOptions && node.functionalOptions.name==='title'){
                            titleChildren.push(node);
                        }else if(node.data && node.functionalOptions && node.functionalOptions.name==='actions'){
                            if(node.data.props['divider']!==false)
                                actionChildren.push(h('v-divider'));

                            actionChildren.push(node);
                        }else{
                            innerChildren.push(node);
                        }
                    }else{
                        innerChildren.push(node);
                    }
                });
            }

           let cardMedia=null;
           if(ctx.props.img){
               cardMedia=h('v-card-media',{
                 props : {
                     src : ctx.props.img,
                     height : ctx.props.imgHeight,
                     contain: ctx.props.horizontal
                 }
               });
           }

           let cardTitle=null;
           if(ctx.props.title&&titleChildren.length===0){
               titleChildren.push(
                 h('div',{},[h('div',{class:['headline']},ctx.props.title)])
               );
               cardTitle=h('v-card-title',{
                   props:{
                       primaryTitle : true
                   }
               },titleChildren);
           }else{
               cardTitle=titleChildren;
           }



            const cardContent=h('v-card-text',{},innerChildren);

            let data={
                props:{
                    hover : ctx.props.hover,
                    raised : ctx.props.raised,
                    horizontal : ctx.props.horizontal
                },
                'class' : cardClasses
            };

            data=Object.assign(data,ctx.data);
            return h('v-card',data,[cardMedia,cardTitle,cardContent,actionChildren]);



        }
    }
</script>
