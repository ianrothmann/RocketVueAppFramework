import Vue from 'vue';
import {createPromiseHandler} from './common/promiseHandler'


Vue.component('rocket-app-framework', require('./AppFramework.vue'));
Vue.component('rw-dialog', require('./components/dialog/DialogWrapper.vue'));
Vue.component('rw-tabs', require('./components/tabs/TabsWrapper.vue'));
Vue.component('rw-tab', require('./components/tabs/TabWrapper.vue'));
Vue.component('rw-card', require('./components/card/CardWrapper.vue'));
Vue.component('rw-card-actions', require('./components/card/CardActionWrapper.vue'));


export const AppFrameworkEventBus = new Vue({
    data : {
        currentID : 0
    },
    methods : {
        getUniqueID(prefix){
            this.currentID++;
            return 'app_'+prefix+this.currentID;
        }
    }
});
export const AppFramework = {};

AppFramework.install = function (Vue, options) {
    Vue.prototype.$dialog = function (title, content, buttonObj) {
        let opt = {};
        opt.title = title;
        opt.content = content;
        opt.buttons = buttonObj;
        let promise = createPromiseHandler();
        opt.promise = promise;
        AppFrameworkEventBus.$emit('dialog',opt);
        return promise;
    };

    Vue.prototype.$snackbar = function (message, messagetype,vertical,horizontal,duration) {
        let opt = {};
        opt.message = message;
        opt.messagetype = messagetype;
        opt.vertical = vertical;
        opt.horizontal = horizontal;
        opt.duration = duration;
        AppFrameworkEventBus.$emit('snackbar',opt);
    };

    Vue.prototype.$showloader = function (message) {
        AppFrameworkEventBus.$emit('showloader',message);
    };

    Vue.prototype.$loaderstatus = function (message) {
        AppFrameworkEventBus.$emit('loaderstatus',message);
    };

    Vue.prototype.$hideloader = function () {
        AppFrameworkEventBus.$emit('hideloader');
    };

    Vue.prototype.$addactivity = function (id) {
        AppFrameworkEventBus.$emit('add_activity',id);
    };

    Vue.prototype.$removeactivity = function (id) {
        AppFrameworkEventBus.$emit('remove_activity',id);
    };

};

