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
            const data=c.data;
            data['props']=c.props;

            return h('v-icon',data,c.children);
        }
    }
</script>
