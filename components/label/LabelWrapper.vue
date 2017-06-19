<script>
    export default{
        props : {
            label : {required:true},
            placeholder : String,
            value : {}
        },
        functional : true,
        render(h,c){
          const data=c.data || {};
          if(!data.class)
              data['class']={};

          data.class['input-group']=true;
          data.class['input-group--dirty']=true;
          data.class['input-group--dark']=true;
          data.class['input-group--text-field']=true;

          let children=c.children;
          if(c.props.value!==undefined){
              if(Array.isArray(c.props.value)){
                  if(c.props.value.length>0){
                      children=c.props.value.join(", ");
                  }
              }else{
                  children=c.props.value;
              }
              children=[children];
              console.log(children);
          }
          let isPlaceholder=false;
          if(children.length===0){
            children=[c.props.placeholder];
            isPlaceholder=true;
          }

          return h('div',data,[h('label',{},c.props.label),h('div',{'class':'input-group__input'},[h('span',{
              'class':{
                  'rw-label' : true,
                  'grey--text' : isPlaceholder,
                  'text--lighten-2' : isPlaceholder,
              }
          },children)])]);
        }
    }
</script>
<style>
    span.rw-label{
        font-size: 16px;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        margin: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        min-width: 0;
        height: 30px;
    }
</style>
