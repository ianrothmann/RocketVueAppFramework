import Vue from 'vue';
import {createPromiseHandler} from './common/promiseHandler'


import VeeValidate from 'vee-validate';
Vue.use(VeeValidate, { errorBagName: 'verrors',inject: false });

Vue.component('rocket-app-framework', require('./AppFramework.vue'));
Vue.component('rw-container', require('./components/layout/ContainerWrapper.vue'));
Vue.component('rw-toolbar', require('./components/toolbar/ToolbarWrapper.vue'));
Vue.component('rw-toolbar-item', require('./components/toolbar/ToolbarItemWrapper.vue'));
Vue.component('rw-btn', require('./components/button/ButtonWrapper.vue'));
Vue.component('rw-icon', require('./components/icon/IconWrapper.vue'));
Vue.component('rw-menu', require('./components/menu/MenuWrapper.vue'));
Vue.component('rw-list', require('./components/list/ListWrapper.vue'));
Vue.component('rw-list-group', require('./components/list/ListGroupWrapper.vue'));
Vue.component('rw-list-header', require('./components/list/ListHeaderWrapper.vue'));
Vue.component('rw-list-item', require('./components/list/ListItemWrapper.vue'));
Vue.component('rw-input', require('./components/input/InputWrapper.vue'));
Vue.component('rw-radio', require('./components/radio/RadioWrapper.vue'));
Vue.component('rw-checkbox', require('./components/checkbox/CheckboxWrapper.vue'));
Vue.component('rw-switch', require('./components/switch/SwitchWrapper.vue'));
Vue.component('rw-select', require('./components/select/SelectWrapper.vue'));
Vue.component('rw-dialog', require('./components/dialog/DialogWrapper.vue'));
Vue.component('rw-tabs', require('./components/tabs/TabsWrapper.vue'));
Vue.component('rw-tab', require('./components/tabs/TabWrapper.vue'));
Vue.component('rw-card', require('./components/card/CardWrapper.vue'));
Vue.component('rw-card-actions', require('./components/card/CardActionWrapper.vue'));
Vue.component('rw-date', require('./components/datetime/DateWrapper.vue'));


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

