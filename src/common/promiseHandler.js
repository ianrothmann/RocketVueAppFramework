export function createPromiseHandler(){
    let _resolve, _reject;

    let promise = new Promise((resolve, reject) => {
        _reject = reject;
        _resolve = resolve;
    });

    promise.resolve = (value) => {
        _resolve(value);
    };

    promise.reject = (value) => {
        _reject(value);
    };

    return promise;
}