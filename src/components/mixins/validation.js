export default {
    computed : {
        validationErrors(){
            if(this.$el&&this.$el.dataset&&this.$el.dataset.vvScope){
                const scope=this.$el.dataset.vvScope;
                return this.verrors.has(this.name,scope)?[this.verrors.first(this.name,scope)]:[];
            }else{
                return this.verrors.has(this.name)?[this.verrors.first(this.name)]:[];
            }
        },
        validationError(){
            if(this.$el&&this.$el.dataset&&this.$el.dataset.vvScope){
                const scope=this.$el.dataset.vvScope;
                return this.verrors.has(this.name,scope)?this.verrors.first(this.name,scope):'';
            }else{
                return this.verrors.has(this.name)?this.verrors.first(this.name):'';
            }
        }
    }
}