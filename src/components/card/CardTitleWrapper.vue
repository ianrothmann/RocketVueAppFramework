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
                if(!isset('light')&&hasclass)
                    obj['white--text']=true;
                else
                    obj['white--text']=isset('dark');
                return obj;
            }

            const contextClasses=getContextClasses();
            return h('v-card-title',Object.assign({'class':contextClasses},c.data),[h('div',{class:'headline'},c.props.title),h('v-spacer'),c.children]);

        }
    }
</script>
