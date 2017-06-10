<script>
    export default{
        props : {
            stayOpen : Boolean
        },
        functional : true,
        render(h,c){
            const data=c.data;
            if(c.props.stayOpen){
                data['props']={
                    'expand':true
                };
            }

            return h('v-expansion-panel',data,[c.children]);
        }
    }
</script>
