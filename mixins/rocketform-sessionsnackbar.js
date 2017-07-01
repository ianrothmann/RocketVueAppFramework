import {RocketFormEventBus} from '../../rocketforms/rocketforms';
export const rocketFormSnackbarMixin = {
    created(){
        RocketFormEventBus.$on('errorMessage',(message)=>{
            this.$snackbar(message,'error');
        });

        RocketFormEventBus.$on('infoMessage',(message)=>{
            this.$snackbar(message,'info');
        });
    }
};