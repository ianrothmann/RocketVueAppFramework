<script>
    export default{
        props : {
            fluid :Boolean
        },
        render(h){
            const props={

            };
            if(this.fluid){
                props['fluid']=true;
            }
            return h('v-container',{
              props
          },this.$slots.default);
        }
    }
</script>
