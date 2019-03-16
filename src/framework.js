import Vue from 'vue';
import {createPromiseHandler} from './common/promiseHandler'

import moment from "moment";
//VeeValidate
import VeeValidate from 'vee-validate';

VeeValidate.Validator.extend('min_array_length', {
    getMessage: (field,args) => 'The ' + field + ' field requires at least '+args[0]+(args[0]==1?' item':' items')+'.',
    validate: (value,args) => value.length>=args[0]
});
VeeValidate.Validator.extend('max_array_length', {
    getMessage: (field,args) => 'The ' + field + ' field requires less than '+args[0]+(args[0]==1?' item':' items')+'.',
    validate: (value,args) => value.length<=args[0]
});
Vue.use(VeeValidate, { errorBagName: 'verrors',inject: false });
//


Vue.component('rocket-app-framework', require('./AppFramework.vue'));
Vue.component('rw-container', require('./components/layout/ContainerWrapper.vue'));
Vue.component('rw-divider', require('./components/layout/DividerWrapper.vue'));
Vue.component('rw-spacer', require('./components/layout/SpacerWrapper.vue'));
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
Vue.component('rw-radio-group', require('./components/radio/RadioGroupWrapper.vue'));
Vue.component('rw-multi-group', require('./components/checkbox/MultiGroupWrapper.vue'));
Vue.component('rw-checkbox', require('./components/checkbox/CheckboxWrapper.vue'));
Vue.component('rw-switch', require('./components/switch/SwitchWrapper.vue'));
Vue.component('rw-select', require('./components/select/SelectWrapper.vue'));
//Vue.component('rw-dialog', require('./components/dialog/DialogWrapper.vue'));
Vue.component('rw-tabs', require('./components/tabs/TabsWrapper.vue'));
Vue.component('rw-tab', require('./components/tabs/TabWrapper.vue'));
Vue.component('rw-card', require('./components/card/CardWrapper.vue'));
Vue.component('rw-card-title', require('./components/card/CardTitleWrapper.vue'));
Vue.component('rw-card-actions', require('./components/card/CardActionWrapper.vue'));
Vue.component('rw-date', require('./components/datetime/DateWrapper.vue'));
Vue.component('rw-datetime', require('./components/datetime/DateTimeWrapper.vue'));
Vue.component('rw-time', require('./components/datetime/TimeWrapper.vue'));
Vue.component('rw-nav-drawer', require('./components/navdrawer/NavDrawerWrapper.vue'));
Vue.component('rw-multi-file', require('./components/upload/MultiFileUpload.vue'));
Vue.component('rw-alert', require('./components/alert/AlertWrapper.vue'));
Vue.component('rw-chip', require('./components/chip/ChipWrapper.vue'));
Vue.component('rw-pager', require('./components/pager/PagerWrapper.vue'));
Vue.component('rw-slider', require('./components/slider/SliderWrapper.vue'));
Vue.component('rw-subheader', require('./components/subheader/SubHeaderWrapper.vue'));
Vue.component('rw-label', require('./components/label/LabelWrapper.vue'));
Vue.component('rw-accord', require('./components/accordion/AccordionWrapper.vue'));
Vue.component('rw-accord-panel', require('./components/accordion/AccordionPanelWrapper.vue'));
Vue.component('rw-scroll-list', require('./components/scroll-list/ScrollList.vue'));
Vue.component('rw-map', require('./components/map/MapInput.vue'));
Vue.component('rw-input-error', require('./components/inputerror/InputError.vue'));
Vue.component('rocket-framework-menu', require('./components/frameworkmenu/RocketFrameworkMenu.vue'));
Vue.component('rocket-editinplace', require('./components/editinplace/EditInPlace.vue'));



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

    Vue.prototype.$activityProgress = function (progress) {
        AppFrameworkEventBus.$emit('activityProgress',progress);
    };


    Vue.prototype.$navigate = function (href,target) {
        if(target){
            setTimeout(()=>{
                window.open(href,target);
            },0);
        }else{
            setTimeout(()=>{
                location.href=href;
            },0);
            AppFrameworkEventBus.$emit('add_activity','loading');
            setTimeout(()=>{
                AppFrameworkEventBus.$emit('remove_activity','loading');
            },8000);
        }

    };


    Vue.prototype.$navigationGuard={
        guard:null,
        set:(functionReturningBoolPromise)=>{
            Vue.prototype.$navigationGuard.guard=functionReturningBoolPromise;
        }
    };

    Vue.prototype.$dialog = function (title, content, width,overlay, buttonObj) {
        let opt = {};
        opt.title = title;
        opt.content = content;
        opt.buttons = buttonObj;
        opt.width = width;
        opt.overlay = overlay;
        let promise = createPromiseHandler();
        opt.promise = promise;
        AppFrameworkEventBus.$emit('dialog',opt);
        return promise;
    };

    Vue.prototype.$formDialog = function (title, content, definition, data,width,overlay, buttonObj) {
        let opt = {};
        opt.title = title;
        opt.content = content;
        opt.definition = definition;
        opt.data = data;
        opt.buttons = buttonObj;
        opt.overlay = overlay;
        opt.width = width;
        let promise = createPromiseHandler();
        opt.promise = promise;
        AppFrameworkEventBus.$emit('formDialog',opt);
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

    Vue.filter('rdate', function(dateString,format_type) {

        let date = moment(dateString, 'YYYY-MM-DD HH:mm:ss' , true);
        if(!date.isValid()){
            date = moment(dateString);
        }

        if(!date.isValid()){
            return null;
        }else if(format_type==='compactdate'){
            return date.format("D MMM 'YY");
        }else if(format_type==='dbdate'){

            return date.format("YYYY-MM-DD");
        }else if(format_type==='dbdatetime'){
            return date.format("YYYY-MM-DD HH:mm:ss");
        }else if(format_type==='date'){
            return date.format("D MMMM YYYY");
        }else if(format_type==='time'){
            return date.format("HH:mm");
        }else if(format_type==='datetime'){
            return date.format("D MMMM YYYY, h:mma");
        }else if(format_type==='compactdatetime'){
            return date.format("D MMM YY, h:mma");
        }else if(format_type==='ago'){
            return date.fromNow();
        }else if(format_type==='to'){
            return date.toNow();
        }else if(format_type==='auto'){
            return date.calendar(null,{sameElse:'D MMM YY'});
        }
    });

    Vue.filter('rwtime', function(dateString) {
        let date = moment(dateString, 'h:mma' , true);
        if(!date.isValid()){
            date = moment(dateString, 'HH:mm' , true);
            if(!date.isValid()){
                return null;
            }
        }
        return date.format("YYYY-MM-DD HH:mm:ss");

    });

};

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

String.prototype.toTitleCase = function() {
    var i, j, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // Certain minor words should be left lowercase unless
    // they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
        'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0, j = lowers.length; i < j; i++)
        str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
            function(txt) {
                return txt.toLowerCase();
            });

    // Certain words such as initialisms or acronyms should be left uppercase
    uppers = ['Id', 'Tv'];
    for (i = 0, j = uppers.length; i < j; i++)
        str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'),
            uppers[i].toUpperCase());

    return str;
}

