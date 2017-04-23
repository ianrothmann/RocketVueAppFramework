import Vue from 'vue';
import {createPromiseHandler} from './common/promiseHandler'


Vue.component('app-framework', require('./AppFramework.vue'));
Vue.component('w-dialog', require('./components/DialogWrapper.vue'));


export const AppFrameworkEventBus = new Vue();
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

