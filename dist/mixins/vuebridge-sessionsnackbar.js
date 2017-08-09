'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _sessionStatus = typeof sessionStatus === 'undefined' ? '' : sessionStatus;

var sessionStatusMixin = exports.sessionStatusMixin = {
    mounted: function mounted() {
        if (_sessionStatus != '') {
            var msgtype = 'info';
            if (_sessionStatus.messagetype != 'status') msgtype = _sessionStatus.messagetype;
            this.$snackbar(_sessionStatus.message, msgtype);
        }
    }
};