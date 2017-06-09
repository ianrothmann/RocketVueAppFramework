<script>
    export default{
        props : {
            value : Boolean,
            icon : String,
            dismissible : Boolean,
        },
        functional : true,
        render(h,c){
          return h('v-alert',c.data,c.props.children);
        }
    }
</script>
