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
            icon: String,
            large: Boolean,
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
            }
        },
        render(h,context){
          const props=context.props;
          let content;
          if(context.props.icon!==undefined){
              content=[h('v-icon',{},context.props.icon)];
              props['icon']=true;
          }else{
              content=context.children;
          }
            return h('v-btn',{
              props,
              nativeOn:context.listeners
          },content);
        }
    }
</script>
