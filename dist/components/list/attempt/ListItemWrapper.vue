<script>
    /*
     This is a stub, all logic is currently inside the ListWrapper
     */
    export default{
        name : 'list-item',
        props : {
            title : {required:true, 'default':''},
            icon : String,
            iconEnd : String,//icon-end
            href : String,
            disabled : Boolean,
            id : String
        },
        functional : true,
        render(h,ctx){
            function isset(val){
                return ctx.props[val]!==undefined&&ctx.props[val];
            }

            let props =  ctx.props;
            const content=[
                h('v-list-tile-title',{},props.title),
                h('v-list-tile-sub-title',{},ctx.children)
            ];

            let final;

            const action=[];
            if(props.icon!==undefined){
                action.push(
                    h('v-icon',{},props.icon),
                );

                if(props.iconEnd!==undefined){
                    final=[
                        h('v-list-tile-content',{},content),
                        h('v-list-tile-action',{},action)
                    ]
                }else{
                    final=[
                        h('v-list-tile-action',{},action),
                        h('v-list-tile-content',{},content)
                    ]
                }
            }else{
                final=[
                    null,
                    h('v-list-tile-content',{},content)
                ]
            }

            console.dir(ctx);

            let value='';

            return h('v-list-item',ctx.data,[h('v-list-tile',{
                props : {
                    ripple : isset('noRipple'),
                    href : props['href'],
                    disabled : props['disabled'],
                    value
                }
            },final)]);
        }
    }
</script>
