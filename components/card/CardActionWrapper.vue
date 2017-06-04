<script>
    import Themable from '../mixins/themeable';
    import Contextualable from '../mixins/contextualable';
    export default{
        props : {

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
                console.log(isset('light'));
                if(!isset('dark')&&hasclass)
                    obj['white--text']=true;
                else
                    obj['white--text']=isset('light');
                return obj;
            }

            return h('v-card-row',{
                props:{'actions':true},
                'class':getContextClasses()
            },ctx.children);
        }
    }
</script>
