export default {
    props: {
        primary: Boolean,
        secondary: Boolean,
        success: Boolean,
        info: Boolean,
        warning: Boolean,
        error: Boolean
    },
    methods : {
        getContextClasses(){
            const obj={};
            obj['primary']=this.primary;
            obj['secondary']=this.secondary;
            obj['success']=this.success;
            obj['info']=this.info;
            obj['warning']=this.warning;
            obj['error']=this.error;

            return obj;
        },
        getColorProperty(){
            if(this.primary)
                return 'primary';
            else  if(this.secondary)
                return 'secondary';
            else  if(this.success)
                return 'success';
            else  if(this.info)
                return 'info';
            else  if(this.warning)
                return 'warning';
            else  if(this.error)
                return 'error';
        }
    }
}