<script>
    import Contextualable from '../mixins/contextualable'
    import Themeable from '../mixins/themeable'
    export default{
        props : {
            value : {type:Boolean, default:true},
            avatar : String,
            textAvatarClass : String,
            textAvatarChars : Number,
            textAvatar : String,
            icon : String,
            iconEnd : Boolean,
            close : Boolean,
        },
        mixins : [Contextualable,Themeable],
        functional : true,
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

          let data=Object.assign({},ctx.data);

          data['props']=ctx.props;
          data['class']=getContextClasses();

          let children;
          let childrenEnd;

          if(isset('avatar')){
              children=h('v-avatar',{},[h('img',{
                  domProps : {
                      'src':ctx.props.avatar
                  }
              })]);
          }else if(isset('textAvatar')){
              let content=ctx.props.textAvatar;
              if(isset('textAvatarChars')){
                  content=content.substring(0,1);
                  if(ctx.props.textAvatarChars===2){
                      let words=ctx.props.textAvatar.split(' ');
                      if(words.length>1)
                          content+=words[1].substring(0,1);
                  }

              }

              const cls={
                  'white--text':true
              };
              if(isset('textAvatarClass')){
                  cls[ctx.props.textAvatarClass]=true;
              }else{
                  cls['secondary'] = !isset('textAvatarClass');
              }
              children=h('v-avatar',{
                  'class' : cls
              },content);
          }else if(isset('textAvatarChars')){
              const cls={

              };
              if(isset('textAvatarClass')){
                  cls[ctx.props.textAvatarClass]=true;
              }else{
                  cls['secondary'] = !isset('textAvatarClass');
              }
              children=h('v-avatar',{
                  'class' : cls
              },ctx.props.textAvatar);
          }else if(isset('icon')){
              if(isset('iconEnd')){
                  childrenEnd=h('v-icon',{
                      'props' : {
                          right : true
                      }
                  },ctx.props.icon);

              }else{

                  children=h('v-icon',{},ctx.props.icon);
                  children=h('v-avatar',{},[children]);
              }
          }

          return h('v-chip',data,[children,ctx.children,childrenEnd]);
        }
    }
</script>
