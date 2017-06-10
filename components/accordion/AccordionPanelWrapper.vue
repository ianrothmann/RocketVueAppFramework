<script>
    export default{
        props : {
            title : String,
            icon : String,
            value : Boolean,
            ripple : Boolean,
            full : Boolean,
            innerClass : {}
        },
        functional : true,
        render(h,c){
            const children=[];
            const data=c.data;
            data['props']={
                value : c.props.value
            };
            const slots=c.slots();

            if(c.props.title!==''&&c.props.title!==undefined){
                let icon;
                if(c.props.icon){
                    icon=h('v-icon',{},c.props.icon);
                }
                if(c.props.value){
                    children.push(h('div',{slot:'header'},[icon,h('strong',{},c.props.title)]));
                }else{
                    children.push(h('div',{slot:'header'},[icon,c.props.title]));
                }

            }else if(slots.hasOwnProperty('header')){
                children.push(h('div',{slot:'header'},slots.header));
            }

            if(c.props.full){
                children.push(slots.default);
            }else{
                children.push(h('v-card',{},[h('v-card-text',{'class':c.props['innerClass']},slots.default)]));
            }

            return h('v-expansion-panel-content',data,children);
        }
    }
</script>
