<script>
    import Contextualable from '../mixins/contextualable'
    import Themeable from '../mixins/themeable'
    export default{
        functional: true,
        mixins : [Contextualable,Themeable],
        props : {
            activeClass: {
                type: String,
                default: 'btn--active'
            },
            block: Boolean,
            default: Boolean,
            flat: Boolean,
            floating: Boolean,
            iconLeft: Boolean,
            icon: String,
            large: Boolean,
            disabled: Boolean,
            loading: Boolean,
            outline: Boolean,
            ripple: {
                type: [Boolean, Object],
                default: true
            },
            round: Boolean,
            small: Boolean,
            tag: {
                type: String,
                default: 'button'
            },
            type: {
                type: String,
                default: 'button'
            },
            active : Boolean
        },
        render(h,context){
          let props=context.props;
          let content;
          if(context.props.icon!=undefined){
              let iconData={
                  props : {}
              };

              if(context.props.iconLeft)
                content=[h('v-icon',iconData,context.props.icon),context.children];
              else{
                  if(context.children&&context.children.length>0)
                      iconData.props.right=true;

                  content=[context.children,h('v-icon',iconData,context.props.icon)];
              }


              if(!context.children||context.children.length===0)
                props['icon']=true;
              else{
                props['icon']=false;
              }
          }else{
              content=context.children;
          }

          let data=context.data;

          Contextualable.methods.removeContextProperties(props);
          data['props']=props;

          if(props.active){
              data.class={};
              data.class['btn--active']=true;
          }


          return h('v-btn',data,content);
        }
    }
</script>
