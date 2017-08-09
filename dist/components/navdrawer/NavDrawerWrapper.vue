<script>
    export default{
        functional : true,
        render(h,c){
          return h('v-navigation-drawer',c.data,c.children);
        }
    }
</script>
