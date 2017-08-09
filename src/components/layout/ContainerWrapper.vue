<script>
    export default{
        //props: fluid
        functional : true,
        render(h,c){
            return h('v-container',c.data,c.children);
        }
    }
</script>
