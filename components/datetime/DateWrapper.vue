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
            allowedDates : [Array,Function,Object],
            allowBefore : [Date,String],
            allowAfter : [Date,String]
        },
        mixins : [Themable],
        render(h){
            const props=Object.assign({},this.$props);
            const scopedSlots={};

          if((this.menu&&!this.inline)  || (!this.menu&&!this.inline)){
              scopedSlots['default']=(scope)=>{

                  return h('v-card-row',{
                      props : {actions:true}
                  },[
                      h('v-btn',{
                          props:{flat:true,secondary:true},
                          nativeOn : {
                              click : ()=>{
                                  scope.cancel();
                              }
                          }
                      },'Clear'),
                      h('v-btn',{
                          props:{flat:true,primary:true},
                          nativeOn : {
                              click : ()=>{
                                  scope.save();
                              }
                          }
                      },'Save'),
                  ]);
              };

              props['scrollable'] = true;
          }


          props['actions'] = true;
          if(!props['dark'])
            props['light'] = true;

          if(props['compact'])
            props['noTitle']=true;

          if(props['allowedDates']===undefined){
              if(props['allowBefore']||props['allowAfter'])
                props['allowedDates']={min:null,max:'2100-01-01'};

              if(props['allowBefore']){
                  props['allowedDates']['max']=props['allowBefore'];
              }

              if(props['allowAfter']){
                  props['allowedDates']['min']=props['allowAfter'];
              }
          }

          const datepicker=h('v-date-picker',{
              props,
              on : {
                  input : e=>this.$emit('input',e)
              },
              scopedSlots
          },[]);


          if(this.inline){
              return h('div',{},[h('strong',{},this.label),datepicker]);
          }else{
              const style = {};
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
                  style,
                  on : {
                      input : e=>this.$emit('input',e),
                      focus : e => this.$emit('focus',e),
                      blur : e => this.$emit('blur',e),
                      change : e => this.$emit('change',e)
                  },
                  nativeOn : {
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
                          nudgeLeft : 40
                      }
                  },[text,datepicker]);
              }else{
                  return h('v-dialog',{
                      props : {
                          lazy : true,
                          persistent : false
                      }
                  },[text,datepicker]);
              }

          }

        }
    }
</script>
