<script>
    export default{
        functional : true,
        render(h,c){
          return h('v-subheader',c.data,c.children);
        }
    }
</script>
