<script>
    export default{
        props : {
            type : {
                type : String,
                default : 'list'
            },
            menu : {
                required:true
            }
        },
        computed:{
            items(){
                if(this.menu !== null && typeof this.menu === 'object')
                 return this.menu.items;
                else
                 return {};
            },
            currentUrl(){
                return location.hostname+location.pathname;
            }
        },
        methods : {
            isGroup(item){
               return item.subMenu.items.length > 0;
            },
            getComparableUrl(item){
                const parser = document.createElement('a');
                parser.href = item.itemLink;
                return parser.hostname+parser.pathname;
            },
            renderToolbar(h){
                const children=[];

                for(let itemKey of Object.keys(this.items)){
                    const item=this.items[itemKey];

                    if(this.isGroup(item)){
                        const subChildren=[];
                        for(let subItemKey of Object.keys(item.subMenu.items)){
                            subChildren.push(this.renderListItem(h,item.subMenu.items[subItemKey]));
                        }
                        children.push(h('rw-menu',{
                            props : {
                                title : item.itemLabel,
                                icon : item.itemIcon,
                                left : true,
                                bottom: true,
                                offsetY:true
                            }
                        },[h('rw-list',{props : {value:this.currentUrl}},subChildren)]));
                    }else{
                        const url=this.getComparableUrl(item);
                        children.push(h('rw-btn',{
                            props : {
                                flat : true,
                                icon : item.itemIcon,
                                iconLeft:true,
                                id :url ,
                                active:url===this.currentUrl
                            }
                        },item.itemLabel));

                    }

                }

                return h('div',{},children);
            },
            renderListItem(h,item){
                const props = {
                    title : item.itemLabel,
                    icon : item.itemIcon,
                    id : this.getComparableUrl(item)

                };
                if(item.itemLink!='')
                    props.href=item.itemLink;
                if(item.itemTarget!='')
                    props.target=item.itemTarget;

                return h('rw-list-item',{
                   props
                });
            },
            renderList(h){
                const children=[];

                for(let itemKey of Object.keys(this.items)){
                    const item=this.items[itemKey];
                    if(this.isGroup(item)){
                        const subChildren=[];
                        for(let subItemKey of Object.keys(item.subMenu.items)){
                            subChildren.push(this.renderListItem(h,item.subMenu.items[subItemKey]));
                        }
                        children.push(h('rw-list-group',{
                            props : {
                                title : item.itemLabel,
                                icon : item.itemIcon,
                            }
                        },[subChildren]));
                    }else{
                        children.push(this.renderListItem(h,item));
                    }

                }

                return h('rw-list',{
                    props : {
                        compact : true,
                        value : this.currentUrl
                    }
                },children);
            }
        },
        render(h){
            if(this.type==='toolbar'){
                return this.renderToolbar(h);
            }else{
                return this.renderList(h);
            }

        }
    }
</script>
