'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AppFramework = exports.AppFrameworkEventBus = undefined;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _promiseHandler = require('./common/promiseHandler');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _veeValidate = require('vee-validate');

var _veeValidate2 = _interopRequireDefault(_veeValidate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_veeValidate2.default.Validator.extend('min_array_length', {
    getMessage: function getMessage(field, args) {
        return 'The ' + field + ' field requires at least ' + args[0] + (args[0] == 1 ? ' item' : ' items') + '.';
    },
    validate: function validate(value, args) {
        return value.length >= args[0];
    }
});
//VeeValidate

_veeValidate2.default.Validator.extend('max_array_length', {
    getMessage: function getMessage(field, args) {
        return 'The ' + field + ' field requires less than ' + args[0] + (args[0] == 1 ? ' item' : ' items') + '.';
    },
    validate: function validate(value, args) {
        return value.length <= args[0];
    }
});
_vue2.default.use(_veeValidate2.default, { errorBagName: 'verrors', inject: false });
//


_vue2.default.component('rocket-app-framework', require('./AppFramework.vue'));
_vue2.default.component('rw-container', require('./components/layout/ContainerWrapper.vue'));
_vue2.default.component('rw-divider', require('./components/layout/DividerWrapper.vue'));
_vue2.default.component('rw-spacer', require('./components/layout/SpacerWrapper.vue'));
_vue2.default.component('rw-toolbar', require('./components/toolbar/ToolbarWrapper.vue'));
_vue2.default.component('rw-toolbar-item', require('./components/toolbar/ToolbarItemWrapper.vue'));
_vue2.default.component('rw-btn', require('./components/button/ButtonWrapper.vue'));
_vue2.default.component('rw-icon', require('./components/icon/IconWrapper.vue'));
_vue2.default.component('rw-menu', require('./components/menu/MenuWrapper.vue'));
_vue2.default.component('rw-list', require('./components/list/ListWrapper.vue'));
_vue2.default.component('rw-list-group', require('./components/list/ListGroupWrapper.vue'));
_vue2.default.component('rw-list-header', require('./components/list/ListHeaderWrapper.vue'));
_vue2.default.component('rw-list-item', require('./components/list/ListItemWrapper.vue'));
_vue2.default.component('rw-input', require('./components/input/InputWrapper.vue'));
_vue2.default.component('rw-radio', require('./components/radio/RadioWrapper.vue'));
_vue2.default.component('rw-radio-group', require('./components/radio/RadioGroupWrapper.vue'));
_vue2.default.component('rw-multi-group', require('./components/checkbox/MultiGroupWrapper.vue'));
_vue2.default.component('rw-checkbox', require('./components/checkbox/CheckboxWrapper.vue'));
_vue2.default.component('rw-switch', require('./components/switch/SwitchWrapper.vue'));
_vue2.default.component('rw-select', require('./components/select/SelectWrapper.vue'));
_vue2.default.component('rw-dialog', require('./components/dialog/DialogWrapper.vue'));
_vue2.default.component('rw-tabs', require('./components/tabs/TabsWrapper.vue'));
_vue2.default.component('rw-tab', require('./components/tabs/TabWrapper.vue'));
_vue2.default.component('rw-card', require('./components/card/CardWrapper.vue'));
_vue2.default.component('rw-card-title', require('./components/card/CardTitleWrapper.vue'));
_vue2.default.component('rw-card-actions', require('./components/card/CardActionWrapper.vue'));
_vue2.default.component('rw-date', require('./components/datetime/DateWrapper.vue'));
_vue2.default.component('rw-datetime', require('./components/datetime/DateTimeWrapper.vue'));
_vue2.default.component('rw-time', require('./components/datetime/TimeWrapper.vue'));
_vue2.default.component('rw-nav-drawer', require('./components/navdrawer/NavDrawerWrapper.vue'));
_vue2.default.component('rw-multi-file', require('./components/upload/MultiFileUpload.vue'));
_vue2.default.component('rw-alert', require('./components/alert/AlertWrapper.vue'));
_vue2.default.component('rw-chip', require('./components/chip/ChipWrapper.vue'));
_vue2.default.component('rw-pager', require('./components/pager/PagerWrapper.vue'));
_vue2.default.component('rw-slider', require('./components/slider/SliderWrapper.vue'));
_vue2.default.component('rw-subheader', require('./components/subheader/SubheaderWrapper.vue'));
_vue2.default.component('rw-label', require('./components/label/LabelWrapper.vue'));
_vue2.default.component('rw-accord', require('./components/accordion/AccordionWrapper.vue'));
_vue2.default.component('rw-accord-panel', require('./components/accordion/AccordionPanelWrapper.vue'));
_vue2.default.component('rw-scroll-list', require('./components/scroll-list/ScrollList.vue'));
_vue2.default.component('rw-map', require('./components/map/MapInput.vue'));
_vue2.default.component('rw-input-error', require('./components/inputerror/InputError.vue'));
_vue2.default.component('rocket-framework-menu', require('./components/frameworkmenu/RocketFrameworkMenu.vue'));
_vue2.default.component('rocket-editinplace', require('./components/editinplace/EditInPlace.vue'));

var AppFrameworkEventBus = exports.AppFrameworkEventBus = new _vue2.default({
    data: {
        currentID: 0
    },
    methods: {
        getUniqueID: function getUniqueID(prefix) {
            this.currentID++;
            return 'app_' + prefix + this.currentID;
        }
    }
});
var AppFramework = exports.AppFramework = {};

AppFramework.install = function (Vue, options) {

    Vue.prototype.$activityProgress = function (progress) {
        AppFrameworkEventBus.$emit('activityProgress', progress);
    };

    Vue.prototype.$navigate = function (href, target) {
        if (target) {
            setTimeout(function () {
                window.open(href, target);
            }, 0);
        } else {
            setTimeout(function () {
                location.href = href;
            }, 0);
            AppFrameworkEventBus.$emit('add_activity', 'loading');
        }
    };

    Vue.prototype.$navigationGuard = {
        guard: null,
        set: function set(functionReturningBoolPromise) {
            Vue.prototype.$navigationGuard.guard = functionReturningBoolPromise;
        }
    };

    Vue.prototype.$dialog = function (title, content, width, overlay, buttonObj) {
        var opt = {};
        opt.title = title;
        opt.content = content;
        opt.buttons = buttonObj;
        opt.width = width;
        opt.overlay = overlay;
        var promise = (0, _promiseHandler.createPromiseHandler)();
        opt.promise = promise;
        AppFrameworkEventBus.$emit('dialog', opt);
        return promise;
    };

    Vue.prototype.$formDialog = function (title, content, definition, data, width, overlay, buttonObj) {
        var opt = {};
        opt.title = title;
        opt.content = content;
        opt.definition = definition;
        opt.data = data;
        opt.buttons = buttonObj;
        opt.overlay = overlay;
        opt.width = width;
        var promise = (0, _promiseHandler.createPromiseHandler)();
        opt.promise = promise;
        AppFrameworkEventBus.$emit('formDialog', opt);
        return promise;
    };

    Vue.prototype.$snackbar = function (message, messagetype, vertical, horizontal, duration) {
        var opt = {};
        opt.message = message;
        opt.messagetype = messagetype;
        opt.vertical = vertical;
        opt.horizontal = horizontal;
        opt.duration = duration;
        AppFrameworkEventBus.$emit('snackbar', opt);
    };

    Vue.prototype.$showloader = function (message) {
        AppFrameworkEventBus.$emit('showloader', message);
    };

    Vue.prototype.$loaderstatus = function (message) {
        AppFrameworkEventBus.$emit('loaderstatus', message);
    };

    Vue.prototype.$hideloader = function () {
        AppFrameworkEventBus.$emit('hideloader');
    };

    Vue.prototype.$addactivity = function (id) {
        AppFrameworkEventBus.$emit('add_activity', id);
    };

    Vue.prototype.$removeactivity = function (id) {
        AppFrameworkEventBus.$emit('remove_activity', id);
    };

    Vue.filter('rdate', function (dateString, format_type) {

        var date = (0, _moment2.default)(dateString, 'YYYY-MM-DD HH:mm:ss', true);

        if (!date.isValid()) {
            return null;
        } else if (format_type === 'compactdate') {
            return date.format("D MMM 'YY");
        } else if (format_type === 'dbdate') {
            return date.format("YYYY-MM-DD");
        } else if (format_type === 'dbdatetime') {
            return date.format("YYYY-MM-DD HH:mm:ss");
        } else if (format_type === 'date') {
            return date.format("D MMMM YYYY");
        } else if (format_type === 'time') {
            return date.format("h:mma");
        } else if (format_type === 'datetime') {
            return date.format("D MMMM YYYY, h:mma");
        } else if (format_type === 'compactdatetime') {
            return date.format("D MMM YY, h:mma");
        } else if (format_type === 'ago') {
            return date.fromNow();
        } else if (format_type === 'to') {
            return date.toNow();
        } else if (format_type === 'auto') {
            return date.calendar(null, { sameElse: 'D MMM YY' });
        }
    });

    Vue.filter('rwtime', function (dateString) {
        var date = (0, _moment2.default)(dateString, 'h:mma', true);
        if (!date.isValid()) {
            return null;
        }
        return date.format("YYYY-MM-DD HH:mm:ss");
    });
};