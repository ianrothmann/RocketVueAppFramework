<template>
    <div>{{topSpacerHeight}}
    <v-list class="v-scroll-list" style="max-height:80vh;min-height:80vh;" ref="list" dense >
        <div ref="item1">
            <slot name="item"
                  :item="firstItem">
            </slot>
        </div>
        <li :style="{height:topSpacerHeight+'px'}"> </li>
       <slot name="item"
              v-for="item in finalItems"
              :item="item">
        </slot>

        <li :style="{height:bottomSpacerHeight+'px'}"> </li>
    </v-list>
    </div>
</template>
<style>
    .v-scroll-list{
        overflow-y:auto;
    }
</style>
<script>

    export default{
        props : {
            items : {required:true,type:Array},
            itemsInView : {type:Number,default:100}
        },
        data(){
            return {
                scrollPerc : 0,
                itemHeight : 0,
                firstItemInViewIndex : 0,
                lastItemInViewIndex : 0,
                topSpacerHeight : 0,
                bottomSpacerHeight : 0,
                scrollTimer:null,
              //  finalItems : []

            }
        },
        computed:{
           /* topSpacerHeight(){
                if(this.items.length>0){
                    console.log('TOP');
                    console.log(this.itemHeight*(this.firstItemInViewIndex));
                    return this.itemHeight*(this.firstItemInViewIndex);
                }else{
                    return 0;
                }

            },
            bottomSpacerHeight(){
                if(this.items.length>0){
                    console.log('BOTTOM');
                    console.log( this.itemHeight*(this.items.length-this.lastItemInViewIndex));
                    return this.itemHeight*(this.items.length-this.lastItemInViewIndex);
                }else{
                    return 0;
                }
            },*/
            firstItem(){
                return this.items.length>0?this.items[0]:null;
            },
            otherItems(){
                return this.items.length>0?this.items.slice(1):[];
            },
            numItems(){
               return Math.ceil(this.itemsInView/2);
            },
            finalItems(){
               // return this.firstItem;
                return this.otherItems.slice(this.firstItemInViewIndex,this.lastItemInViewIndex);
            }

        },
        created(){
           window.scrollListTimer=null;
           window.itemsTimer=null;
           this.handleScroll=debounce(this.handleScroll,300);
        },
        mounted (){
            this.$refs.list.$el.addEventListener('scroll', this.handleScroll);
            this.calculateItemHeight();
            this.$watch('items',()=>{
                this.calculateItemHeight();
            },{deep:true});
            this.lastItemInViewIndex=this.numItems*2;
            this.updateSpacers(0,779);
        },
        beforeDestroy() {
            this.$refs.list.$el.removeEventListener('scroll', this.handleScroll);
        },
        methods:{
            handleScroll(e){
                clearTimeout(window.scrollListTimer);
                window.scrollListTimer=setTimeout(()=>{
                    this.scrollEnd(e);
                },50);
            },
            scrollEnd(e){
                this.$refs.list.$el.removeEventListener('scroll', this.handleScroll);

               // this.scrollPerc=((e.target.scrollTop+(e.target.clientHeight/2))/(e.target.scrollHeight-e.target.clientHeight));

                this.updateSpacers(e.target.scrollTop,e.target.clientHeight);

                //let start=Math.floor(this.otherItems.length*this.scrollPerc)-this.numItems;
                let start=Math.floor(e.target.scrollTop/this.itemHeight);
                if(start<0)
                    start=0;

                const itemsInView=Math.ceil(e.target.clientHeight/this.itemHeight);

                let end=start+itemsInView;
                if(end>this.otherItems.length)
                    end=this.otherItems.length;

                this.firstItemInViewIndex=start;
                this.lastItemInViewIndex=end;


                console.log(start+'-'+end);

                //console.log(start + ' - ' + end);
                //this.finalItems=this.otherItems.slice(this.firstItemInViewIndex,this.lastItemInViewIndex);
                setTimeout(()=>{
                    this.$refs.list.$el.addEventListener('scroll', this.handleScroll);
                },400);
              //  console.log('Ending ' + this.scrollPerc);

            },
            updateSpacers(scrollTop,height){
                this.topSpacerHeight=scrollTop-this.itemHeight;
                const total=this.items.length*this.itemHeight;
                this.bottomSpacerHeight=total-this.topSpacerHeight-height;
            },
            calculateItemHeight(){
                this.itemHeight=this.$refs.item1.clientHeight;
            }
        }
    }
</script>
