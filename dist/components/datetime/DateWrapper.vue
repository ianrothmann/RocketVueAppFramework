<script>
    import Themable from '../mixins/themeable';
    export default{
        props : {
            value : {},
            inline : Boolean,
            menu : Boolean,
            label : String,
            name : String,
            hint : String,
            disabled : Boolean,
            compact : Boolean,
            months : Array,//renaming months
            days : Array,//renaming days
            landscape : Boolean,
            noMargins : Boolean,
            allowedDates : [Function],
            allowBefore : [Date,String],
            allowAfter : [Date,String]
        },
        data(){
            return {
                menuOpen:false,
                oldValue:null
            }
        },
        watch:{
            menuOpen(open){
                if(open){
                    this.oldValue=this.value;
                }
            }
        },
        mixins : [Themable],
        render(h){
            const props=Object.assign({},this.$props);
            const scopedSlots={};

          if((this.menu&&!this.inline)  || (!this.menu&&!this.inline)){
             /* scopedSlots['default']=(scope)=>{

                  return h('v-card-actions',{
                      props : {actions:true}
                  },[
                      h('v-btn',{
                          props:{flat:true,secondary:true},
                          on : {
                              click : ()=>{
                                  scope.cancel();
                              }
                          }
                      },'Cancel'),
                      h('v-btn',{
                          props:{flat:true,primary:true},
                          on : {
                              click : ()=>{
                                  scope.save();
                              }
                          }
                      },'Save'),
                  ]);
              };*/

              props['scrollable'] = true;
          }


          props['actions'] = true;
          if(!props['dark'])
            props['light'] = true;

          if(props['compact'])
            props['noTitle']=true;


          if(props['allowedDates']===undefined){

              if(props['allowBefore']){
                  props['max']=props['allowBefore'];
              }

              if(props['allowAfter']){
                  props['min']=props['allowAfter'];
              }
          }

          const dpChild=[];

          if((this.menu&&!this.inline)  || (!this.menu&&!this.inline)){
              dpChild.push( h('v-btn',{
                      props:{flat:true,secondary:true},
                      on : {
                          click : ()=>{
                            this.$emit('input',this.oldValue);
                            this.menuOpen=false;
                          }
                      }
                  },'Cancel'),
                 );

              dpChild.push(h('v-btn',{
                      props:{flat:true,primary:true},
                      on : {
                          click : ()=>{
                              this.menuOpen=false;
                          }
                      }
                  },'OK')
                 );
          }

          const datepicker=h('v-date-picker',{
              props,
              on : {
                  input : e=>this.$emit('input',e)
              },
              scopedSlots
          },dpChild);


          if(this.inline){
              return h('div',{},[h('strong',{},this.label),[h('br'),datepicker]]);
          }else{
              const style = {'min-width':'200px'};
              if(this.noMargins){
                style['margin']=0;
              }

              const text=h('rw-input',{
                  slot : 'activator',
                  props : {
                      readonly : true,
                      prependIcon : 'event',
                      value : this.value,
                      label : this.label,
                      name : this.name,
                      hint : this.hint,
                      disabled : this.disabled,
                      persistentHint : this.hint!==undefined
                  },
                  attrs:this.$attrs,
                  style,
                //  'class':this.class,
                  on : {
                      input : e=>this.$emit('input',e),
                      focus : e => this.$emit('focus',e),
                      blur : e => this.$emit('blur',e),
                      change : e => this.$emit('change',e),
                      click : e=>this.$emit('click',e)
                  }

              });

              if(this.menu){
                  return h('v-menu',{
                      props : {
                          lazy : true,
                          closeOnContentClick : false,
                          transition : "v-scale-transition",
                          offsetY : true,
                          nudgeLeft : 40,
                          value: this.menuOpen
                      },
                      on : {
                          input : ()=>{
                              this.menuOpen=true;
                          }
                      }
                  },[text,datepicker]);
              }else{
                  return h('v-dialog',{
                      props : {
                          lazy : true,
                          persistent : false,
                          value: this.menuOpen,
                          width:'290px',
                      },
                      on : {
                          input : ()=>{
                              this.menuOpen=true;
                          }
                      }
                  },[text,datepicker]);
              }

          }

        }
    }
</script>
