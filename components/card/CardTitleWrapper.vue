<script>
    export default{
        functional : false,
        render(h){
           return h('div',{},this.$slots.default);

        }
    }
</script>
