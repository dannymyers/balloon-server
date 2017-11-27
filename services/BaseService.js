"use strict";
exports.__esModule = true;
var BaseService = /** @class */ (function () {
    function BaseService() {
        var _this = this;
        this.start = function () {
            _this.intervalHandle = setInterval(_this.run, 1000);
        };
        this.stop = function () {
            clearInterval(_this.intervalHandle);
        };
        this.run = function () {
            console.log("You must implement run!");
        };
        this.kill = function () { };
    }
    return BaseService;
}());
exports["default"] = BaseService;
