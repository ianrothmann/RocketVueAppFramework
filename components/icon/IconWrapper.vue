<script>
    import Themeable from '../mixins/themeable'
    export default{
        mixins: [Themeable],
        functional : true,
        props: {
            fa: Boolean,
            large: Boolean,
            left: Boolean,
            medium: Boolean,
            right: Boolean,
            xLarge: Boolean
        },
        render(h,c){
            return h('v-icon',{
              props:c.props
          },c.children);
        }
    }
</script>
