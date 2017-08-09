"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createPromiseHandler = createPromiseHandler;
function createPromiseHandler() {
    var _resolve = void 0,
        _reject = void 0;

    var promise = new Promise(function (resolve, reject) {
        _reject = reject;
        _resolve = resolve;
    });

    promise.resolve = function (value) {
        _resolve(value);
    };

    promise.reject = function (value) {
        _reject(value);
    };

    return promise;
}