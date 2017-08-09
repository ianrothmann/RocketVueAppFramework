'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var typeHelpers = exports.typeHelpers = {
    methods: {
        isObject: function isObject(val) {
            return val instanceof Object;
        },
        isNullOrUndefined: function isNullOrUndefined(val) {
            return val === null || typeof val === 'undefined';
        },
        coalesce: function coalesce(val, defaultvalue) {
            return this.isNullOrUndefined(val) ? defaultvalue : val;
        },
        hasProp: function hasProp(obj, key) {
            return this.isObject(obj) && obj.hasOwnProperty(key);
        },
        objProp: function objProp(obj, key, defaultvalue) {
            return this.hasProp(obj, key) ? this.coalesce(obj[key], defaultvalue) : defaultvalue;
        },
        arrayRemoveItem: function arrayRemoveItem(array, item) {
            var index = array.indexOf(item);
            if (index > -1) {
                array.splice(index, 1);
            }
        }
    }
};