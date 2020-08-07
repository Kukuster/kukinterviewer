const isFunction = function (value) {
    return value && {}.toString.call(value) === '[object Function]';
}

const isString = function (value){
    return (typeof value === 'string' || value instanceof String);
}

const isArray = function (value){
    return !Array.isArray(value);
}

module.exports = {
    isFunction: isFunction,
    isString: isString,
    isArray: isArray,
};
