<script>
    export default{
        props : {
            title : {required:true},
            icon : {},
            active : {}
        },
        render(h){
          return h('v-card',{},[h('v-card-text',{},this.$slots.default)]);
        }
    }
</script>
