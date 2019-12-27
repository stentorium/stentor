"use strict";
exports.__esModule = true;
var AbstractResponseBuilder = /** @class */ (function () {
    function AbstractResponseBuilder(props) {
        // super();
        this.device = props.device;
        this._response = {};
    }
    Object.defineProperty(AbstractResponseBuilder.prototype, "response", {
        /**
         * The response that will be communicated to the user
         *
         * @readonly
         * @type {Readonly<Response>}
         * @memberof ResponseBuilder
         */
        get: function () {
            return this._response;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * The number of playables that can be sent at once. Override it if the platform handles more.
     *
     * @returns {number}
     */
    AbstractResponseBuilder.prototype.mediaQueueSize = function () {
        return 1;
    };
    return AbstractResponseBuilder;
}());
exports.AbstractResponseBuilder = AbstractResponseBuilder;
