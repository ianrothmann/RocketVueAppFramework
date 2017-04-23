const _sessionStatus = (typeof sessionStatus === 'undefined') ? '' : sessionStatus;

export const sessionStatusMixin = {
    mounted(){
        if(_sessionStatus!=''){
            let msgtype='info';
            if(_sessionStatus.messagetype!='status')
                msgtype=_sessionStatus.messagetype;
            this.$snackbar(_sessionStatus.message,msgtype);
        }
    }
};