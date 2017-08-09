<script>
    export default{
       props: {
           noRipple : Boolean,
           value: String,
           dividers : Boolean,
           compact : Boolean,
           large : Boolean,
        },
        render(h) {

           /*
            TODO:Avatars
             */
            const items=[];
            let lastItem='';

            if(this.$slots.default){
                this.$slots.default.forEach((node)=>{
                    if(node.functionalOptions && node.functionalOptions.name==='list-item'){
                        node.props['helo']='helo';
                        items.push(node);
                        //console.dir(node);
                    }

                });
            }


            let props=this.$props;
            props['subheader']=true;
            if(this.large){
                props['threeLine']=true;
            }
            if(this.compact){
                props['dense']=true;
            }

            return h('v-list',{
                props
            },items);

        }
    }
</script>
