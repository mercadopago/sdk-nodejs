var preconditions = module.exports = {};

/**
 * Check if the callback function sent is defined, if not send a noop function
 * @param callbackFunc
 * @returns {Function}
 */
preconditions.getCallback = function (callbackFunc) {
  return (callbackFunc === undefined || typeof callbackFunc !== 'function') ? function () {} : callbackFunc;
};
