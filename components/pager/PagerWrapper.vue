<script>
    export default{
        props : {
            length : Number,
            value : Number,
            disabled : Boolean
        },
        functional : true,
        render(h,c){
          const data=c.data;
          data['props']=c.props;

          return h('v-pagination',data,c.children);
        }
    }
</script>
