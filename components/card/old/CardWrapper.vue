<script>
    import Themable from '../mixins/themeable';
    export default{
        props : {
          title:String,
          hover:Boolean,
          raised:Boolean,
          backColor:String,
          titleColor:String,
          horizontal:Boolean,
          light:Boolean,
          img:String,
          imgHeight:String
        },
        render(h){
           let cardinner=[];
           if(this.title){
            let titleClass={};
            if(this.light)
             titleClass['white--text']=true;

            cardinner.push(h('v-card-row',{'class':this.titleColor},[h('v-card-title',{},[h('span',{'class':titleClass},[this.title,h('v-spacer')])])]));
           }

          if(this.img){
            let imgProps={
              img : this.img
            };

            if(this.imgHeight)
             imgProps['height']=this.imgHeight;

             cardinner.push(h('v-card-row',{'props':imgProps}));
           }

           cardinner.push(h('v-card-text',{},[h('div',{},this.$slots.default.filter((node)=>{
                return !node.tag||node.tag.indexOf('rw-card-actions')==-1;
           }))]));

           let actions=this.$slots.default.filter((node)=>{
                return node.tag&&node.tag.indexOf('rw-card-actions')>-1;
           });

           if(actions.length>0){
             cardinner.push(actions[0]);
           }


           let cardClasses={};
           if(this.backColor){
             cardClasses[this.backColor]=true;
           }

           if(this.light)
             cardClasses['white--text']=true;

           return h('v-card',{
            props:{
              hover : this.hover,
              raised : this.raised,
              horizontal : this.horizontal
            },
            'class' : cardClasses
           },cardinner);
        }
    }
</script>
