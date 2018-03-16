<script>
    import Validation from '../mixins/validation';
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
        mixins : [Themable,Validation],
        data(){
          return {
              innerDate : null,
              innerTime : null,
          }
        },
        watch:{
           value(){
             this.populateInnerValues();
           }
        },
        mounted(){
            this.populateInnerValues();
        },
        methods : {
           populateInnerValues(){
             if(this.value!=null){

                   const dt=moment(this.value,"YYYY-MM-DD k:mm:ss");
                   this.innerDate=dt.format("YYYY-MM-DD");
                   this.innerTime=dt.format("k:mm");
               }else{
                   this.innerDate=null;
                   this.innerTime=null;
               }

           },
           emitFullDate(){
              if(this.innerDate!==null&&this.innerTime!==null){
                  const dt=moment(this.innerDate + ' ' + this.innerTime,"YYYY-MM-DD k:mm").format("YYYY-MM-DD k:mm:ss");
                //  console.log(this.innerDate + ' ' + this.innerTime);
                  this.$emit('input',dt);
              }
           }
        },
        render(h){
            const dateProps=Object.assign({},this.$props);
            const timeProps=Object.assign({},this.$props);

            dateProps['value']=this.innerDate;
            timeProps['value']=this.innerTime;

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
                    input : e=>{
                        this.innerDate=e;
                        this.emitFullDate();
                    }
                },
                style
            },'');

            const timepicker=h('rw-time',{
                props:timeProps,
                on : {
                    input : e=>{
                        this.innerTime=e;
                        this.emitFullDate();
                    }
                },
                style
            },'');

            return h('div',{},[datepicker,timepicker]);

        }
    }
</script>
