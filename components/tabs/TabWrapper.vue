<script>
    export default{
        props : {
            title : {required:true},
            icon : {},
            id : {required:false}
        },
        render(h){
          return h('v-card',{},[h('v-card-text',{},this.$slots.default)]);
        }
    }
</script>
