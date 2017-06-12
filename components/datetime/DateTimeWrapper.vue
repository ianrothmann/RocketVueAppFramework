<script>
    import Themable from '../mixins/themeable';
    import * as moment from 'moment/moment';
    export default{
        props : {
            value : {},
            inline : Boolean,
            menu : Boolean,
            dateLabel : String,
            timeLabel : String,
            name : String,
            dateHint : String,
            timeHint : String,
            persistentHint : Boolean,
            disabled : Boolean,
            compact : Boolean,
            months : Array,//renaming months
            days : Array,//renaming days
            landscape : Boolean,
            noMargins : Boolean,
            allowedDates : [Array,Function,Object],
            allowBefore : [Date,String],
            allowAfter : [Date,String]
        },
        mixins : [Themable],
        data(){
          return {
              innerValue : null,
          }
        },
        watch:{
           value(){
             this.populateInnerValue();
           }
        },
        mounted(){
            this.populateInnerValue();
        },
        computed : {
           dateValue(){
               return this.innerValue===null?null:this.innerValue.format("YYYY-MM-DD");
           },
           timeValue(){
               return this.innerValue===null?null:this.innerValue.format("h:mm a");
           },
        },
        methods : {
           populateInnerValue(){
               if(this.value!=null)
                   this.innerValue=moment(this.value,"YYYY-MM-DD h:mm");
               else
                   this.innerValue=null;
           },
           dateChanged(date){
               if(this.innerValue===null){
                   this.innerValue=moment(date,"YYYY-MM-DD h:mm a");
               }else{
                   this.innerValue=moment(date + " " + this.innerValue.format("h:mm a"),"YYYY-MM-DD h:mm a");
               }

               this.$emit('input',this.innerValue.format("YYYY-MM-DD h:mm"))
           },
           timeChanged(time){
               if(this.innerValue===null){
                   this.innerValue=moment(moment().format("YYYY-MM-DD")+" "+time,"YYYY-MM-DD h:mm a");
               }else{
                   this.innerValue=moment(this.innerValue.format("YYYY-MM-DD")+" "+time,"YYYY-MM-DD h:mm a");
               }

               this.$emit('input',this.innerValue.format("YYYY-MM-DD kk:mm:ss"))
           }
        },
        render(h){
            const dateProps=Object.assign({},this.$props);
            const timeProps=Object.assign({},this.$props);

            dateProps['value']=this.dateValue;
            timeProps['value']=this.timeValue;

            dateProps['label']=this.dateLabel || 'Date';
            timeProps['label']=this.timeLabel || 'Time';

            dateProps['hint']=this.dateHint;
            timeProps['hint']=this.timeHint;

            const style = {};
            if(this.noMargins){
                style['margin']=0;
            }


            const datepicker=h('rw-date',{
                props:dateProps,
                on : {
                    input : e=>this.dateChanged(e)
                },
                style
            },'');

            const timepicker=h('rw-time',{
                props:timeProps,
                on : {
                    input : e=>this.timeChanged(e)
                },
                style
            },'');

            return h('div',{},[datepicker,timepicker]);

        }
    }
</script>
