<script>
    export default{
        props : {
           trim : Boolean
        },
        functional : true,
        render(h,c){
            const data=c.data;
            if(c.props.trim){
               if(data.hasOwnProperty('class'))
                data.class['trim']=true;
               else
                 data['class']={
                   'trim':true
                 }
            }
            return h('v-subheader',data,c.children);
        }
    }
</script>
<style>
    .v-subheader.trim{
        padding:0!important;
    }
</style>
