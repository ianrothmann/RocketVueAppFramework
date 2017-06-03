<script>
    export default{
        props : {
            value : {},
            inline : Boolean,
            menu : Boolean,
            label : String,
            name : String,
            hint : String

        },
        render(h){
          const actions=[];

          if(this.menu&&!this.inline){
             /* actions.push(
                  h('template',{
                      scope:"{ save, cancel }"
                      },[h('v-card-row',{
                         props : {actions:true}
                      },[
                          h('v-btn',{props:{flat:true,primary:true}})
                      ]

                      )]
                  )
              );
              */
          }

          const datepicker=h('v-date-picker',{
              props : {
                  value : this.value
              },
              on : {
                  input : e=>this.$emit('input',e)
              }
          },actions);


          if(this.inline){
              return h('div',{},[h('strong',{},this.label),datepicker]);
          }else{
              const text=h('rw-input',{
                  slot : 'activator',
                  props : {
                      readonly : true,
                      prependIcon : 'event',
                      value : this.value,
                      label : this.label,
                      name : this.name,
                      hint : this.hint,
                      persistentHint : this.hint!==undefined
                  },
                  on : {
                      input : e=>this.$emit('input',e)
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
