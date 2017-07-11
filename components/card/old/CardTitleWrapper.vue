<script>
    import Themable from '../mixins/themeable';
    import Contextualable from '../mixins/contextualable';
    export default{
        name : 'title',
        functional : true,
        props : {
            title : String
        },
        mixins : [Contextualable,Themable],
        render(h,c){
            function isset(val){
                return c.props[val]!==undefined&&c.props[val];
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

            const contextClasses=getContextClasses();
            const cardTitle=h('v-card-title',{},[h('span',{},c.props.title),h('v-spacer'),c.children]);
            return h('v-card-row',Object.assign({'class':contextClasses},c.data),[cardTitle]);

        }
    }
</script>
