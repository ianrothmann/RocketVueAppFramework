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
            landscape : Boolean,
            noMargins : Boolean,
            ampm : {'default':true}
        },
        mixins : [Themable],
        render(h){
            const props=Object.assign({},this.$props);
            const actions=[];

          if((this.menu&&!this.inline)  || (!this.menu&&!this.inline)){
              actions.push(
                  h('template',{
                      domProps: {scope:"{save , cancel}"}
                      },[h('v-card-row',{
                         props : {actions:true}
                      },[
                          h('v-btn',{props:{flat:true,primary:true}},'Cancel'),
                          h('v-btn',{props:{flat:true,primary:true}},'Save'),
                      ])]
                  )
              );
              props['scrollable'] = true;
          }

          if(props['ampm'])
              props['format']='ampm';
          else
              props['format']='24hr';

          props['actions'] = true;
          if(!props['dark'])
            props['light'] = true;

          if(props['compact'])
            props['noTitle']=true;

          const datepicker=h('v-time-picker',{
              props,
              on : {
                  input : e=>this.$emit('input',e)
              }
          },actions);


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
                      prependIcon : 'access_time',
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
