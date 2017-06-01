<script>
    export default{
        props:{
          backColor : String,
          light : Boolean
        },
        render(h){
            let classes={};

            if(this.backColor)
             classes[this.backColor]=true;

            if(this.light)
             classes['white--text']=true;

            return h('v-card-row',{
                props:{
                 actions : true
                },
                'class':classes
             },this.$slots.default)
        }
    }
</script>
