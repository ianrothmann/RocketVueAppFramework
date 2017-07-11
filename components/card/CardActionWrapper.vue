<script>
    import Themable from '../mixins/themeable';
    import Contextualable from '../mixins/contextualable';
    export default{
        name : 'actions',
        props : {
            divider : {'default':false}
        },
        functional : true,
        mixins : [Contextualable,Themable],
        render(h,ctx){
            function isset(val){
                return ctx.props[val]!==undefined&&ctx.props[val];
            }

            function getContextClasses(){
                const obj={};
                obj['primary']=isset('primary');
                obj['secondary']=isset('secondary');
                obj['success']=isset('success');
                obj['info']=isset('info');
                obj['warning']=isset('warning');
                obj['error']=isset('error');
                const hasclass=obj.primary || obj.secondary || obj.success || obj.info || obj.warning || obj.error;

                if(!isset('dark')&&hasclass)
                    obj['white--text']=true;
                else
                    obj['white--text']=isset('light');
                return obj;
            }

            ctx.props['actions']=true;
            let data = {
                props : ctx.props,
                'class' : getContextClasses()
            };
            data=Object.assign(data,ctx.data);
            return h('v-card-actions',data,ctx.children);
        }
    }
</script>
