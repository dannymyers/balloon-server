"use strict";
exports.__esModule = true;
var BaseService = /** @class */ (function () {
    function BaseService(interval) {
        var _this = this;
        this.start = function () {
            _this.intervalHandle = setInterval(_this.run, _this.interval);
        };
        this.stop = function () {
            clearInterval(_this.intervalHandle);
        };
        this.run = function () {
            console.log("You must implement run!");
        };
        this.kill = function () { };
        this.interval = interval;
    }
    return BaseService;
}());
exports["default"] = BaseService;
