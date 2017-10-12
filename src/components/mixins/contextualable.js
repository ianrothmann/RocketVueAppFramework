export default {
    props: {
        primary: Boolean,
        secondary: Boolean,
        success: Boolean,
        info: Boolean,
        warning: Boolean,
        error: Boolean,
        color:String
    },
    mounted(){

    },
    methods : {
        getContextClasses(){
            console.log(this);
            return {color:this.getColorProperty()};
        },
        getColorProperty(){

            if(this.color){
                return this.color;
            }
            else if(this.primary)
                return 'primary';
            else if(this.secondary)
                return 'secondary';
            else if(this.success)
                return 'success';
            else if(this.info)
                return 'info';
            else if(this.warning)
                return 'warning';
            else if(this.error)
                return 'error';
        },
        removeContextProperties(props){

            let color;
            const ctx=['primary','secondary','success','info','warning','error'];

            for(let c of ctx){
                if(props[c])
                    color=c;
            }

            if(color)
                props['color']=color;

            delete props['primary'];
            delete props['secondary'];
            delete props['success'];
            delete props['info'];
            delete props['warning'];
            delete props['error'];
        }
    }
}