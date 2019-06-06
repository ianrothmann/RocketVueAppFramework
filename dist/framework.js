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


_vue2.default.component('rocket-app-framework', require('./AppFramework.vue').default);
_vue2.default.component('rw-container', require('./components/layout/ContainerWrapper.vue').default);
_vue2.default.component('rw-divider', require('./components/layout/DividerWrapper.vue').default);
_vue2.default.component('rw-spacer', require('./components/layout/SpacerWrapper.vue').default);
_vue2.default.component('rw-toolbar', require('./components/toolbar/ToolbarWrapper.vue').default);
_vue2.default.component('rw-toolbar-item', require('./components/toolbar/ToolbarItemWrapper.vue').default);
_vue2.default.component('rw-btn', require('./components/button/ButtonWrapper.vue').default);
_vue2.default.component('rw-icon', require('./components/icon/IconWrapper.vue').default);
_vue2.default.component('rw-menu', require('./components/menu/MenuWrapper.vue').default);
_vue2.default.component('rw-list', require('./components/list/ListWrapper.vue').default);
_vue2.default.component('rw-list-group', require('./components/list/ListGroupWrapper.vue').default);
_vue2.default.component('rw-list-header', require('./components/list/ListHeaderWrapper.vue').default);
_vue2.default.component('rw-list-item', require('./components/list/ListItemWrapper.vue').default);
_vue2.default.component('rw-input', require('./components/input/InputWrapper.vue').default);
_vue2.default.component('rw-radio', require('./components/radio/RadioWrapper.vue').default);
_vue2.default.component('rw-radio-group', require('./components/radio/RadioGroupWrapper.vue').default);
_vue2.default.component('rw-multi-group', require('./components/checkbox/MultiGroupWrapper.vue').default);
_vue2.default.component('rw-checkbox', require('./components/checkbox/CheckboxWrapper.vue').default);
_vue2.default.component('rw-switch', require('./components/switch/SwitchWrapper.vue').default);
_vue2.default.component('rw-select', require('./components/select/SelectWrapper.vue').default);
//Vue.component('rw-dialog', require('./components/dialog/DialogWrapper.vue'));
_vue2.default.component('rw-tabs', require('./components/tabs/TabsWrapper.vue').default);
_vue2.default.component('rw-tab', require('./components/tabs/TabWrapper.vue').default);
_vue2.default.component('rw-card', require('./components/card/CardWrapper.vue').default);
_vue2.default.component('rw-card-title', require('./components/card/CardTitleWrapper.vue').default);
_vue2.default.component('rw-card-actions', require('./components/card/CardActionWrapper.vue').default);
_vue2.default.component('rw-date', require('./components/datetime/DateWrapper.vue').default);
_vue2.default.component('rw-datetime', require('./components/datetime/DateTimeWrapper.vue').default);
_vue2.default.component('rw-time', require('./components/datetime/TimeWrapper.vue').default);
_vue2.default.component('rw-nav-drawer', require('./components/navdrawer/NavDrawerWrapper.vue').default);
_vue2.default.component('rw-multi-file', require('./components/upload/MultiFileUpload.vue').default);
_vue2.default.component('rw-alert', require('./components/alert/AlertWrapper.vue').default);
_vue2.default.component('rw-chip', require('./components/chip/ChipWrapper.vue').default);
_vue2.default.component('rw-pager', require('./components/pager/PagerWrapper.vue').default);
_vue2.default.component('rw-slider', require('./components/slider/SliderWrapper.vue').default);
_vue2.default.component('rw-subheader', require('./components/subheader/SubHeaderWrapper.vue').default);
_vue2.default.component('rw-label', require('./components/label/LabelWrapper.vue'));
_vue2.default.component('rw-accord', require('./components/accordion/AccordionWrapper.vue').default);
_vue2.default.component('rw-accord-panel', require('./components/accordion/AccordionPanelWrapper.vue').default);
_vue2.default.component('rw-scroll-list', require('./components/scroll-list/ScrollList.vue').default);
_vue2.default.component('rw-map', require('./components/map/MapInput.vue').default);
_vue2.default.component('rw-input-error', require('./components/inputerror/InputError.vue').default);
_vue2.default.component('rocket-framework-menu', require('./components/frameworkmenu/RocketFrameworkMenu.vue').default);
_vue2.default.component('rocket-editinplace', require('./components/editinplace/EditInPlace.vue').default);

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
            setTimeout(function () {
                AppFrameworkEventBus.$emit('remove_activity', 'loading');
            }, 8000);
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
            date = (0, _moment2.default)(dateString);
        }

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
            return date.format("HH:mm");
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
            date = (0, _moment2.default)(dateString, 'HH:mm', true);
            if (!date.isValid()) {
                return null;
            }
        }
        return date.format("YYYY-MM-DD HH:mm:ss");
    });
};

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

String.prototype.toTitleCase = function () {
    var i, j, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // Certain minor words should be left lowercase unless
    // they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0, j = lowers.length; i < j; i++) {
        str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), function (txt) {
            return txt.toLowerCase();
        });
    } // Certain words such as initialisms or acronyms should be left uppercase
    uppers = ['Id', 'Tv'];
    for (i = 0, j = uppers.length; i < j; i++) {
        str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), uppers[i].toUpperCase());
    }return str;
};