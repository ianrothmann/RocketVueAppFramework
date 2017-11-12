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
            navigate(link,target){
                if(this.$navigationGuard.guard===null||this.$navigationGuard===undefined){
                    this.$navigate(link,target);
                }else{
                    let result=this.$navigationGuard.guard();

                    if(typeof(result) === "boolean"){
                         if(result)
                             this.$navigate(link,target);

                    }else{
                        result.then((canNavigate)=>{
                            if(canNavigate){
                                this.$navigate(link,target);

                            }
                        });
                    }

                }

            },
            isGroup(item){
               return Object.keys(item.subMenu.items).length > 0;
            },
            isValid(item){
               return item.itemLink!=null;
            },
            isActive(url,currentUrl){
               return url===currentUrl||currentUrl.startsWith(url);
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
                    }else if(this.isValid(item)){
                        const url=this.getComparableUrl(item);
                        children.push(h('rw-btn',{
                            props : {
                                flat : true,
                                icon : item.itemIcon,
                                iconLeft:true,
                                id :url ,
                                active:this.isActive(url,this.currentUrl)
                            },
                            on : {
                                click : ()=>{
                                    this.navigate(item.itemLink,item.itemTarget);
                                }
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

                const on={

                };

                if(item.itemTarget!=null){
                    props.href=item.itemLink;
                    props.target=item.itemTarget;
                }else if(item.itemLink!=null){
                    on['click']=()=>{

                        this.navigate(item.itemLink);
                    };
                }


                return h('rw-list-item',{
                    props,on
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
                                icon : item.itemIcon
                            }
                        },[subChildren]));

                    }else if(this.isValid(item)){
                        children.push(this.renderListItem(h,item));
                    }

                }


                return h('rw-list',{
                    props : {
                        compact : true,
                        value : this.currentUrl,
                        valueFuzzyMatchStart:false
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
