"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BaseService_1 = require("./BaseService");
var RandomUtilities_1 = require("../utils/RandomUtilities");
var ExternalTemperatureService = /** @class */ (function (_super) {
    __extends(ExternalTemperatureService, _super);
    function ExternalTemperatureService() {
        var _this = _super.call(this, 20000) || this;
        _this.MaxTemperature = -10000;
        _this.CurrentTemperature = 0;
        _this.MinTemperature = 10000;
        _this.run = function () {
            _this.CurrentTemperature = RandomUtilities_1["default"].RandomIntFromInterval(-60, 100);
            if (_this.CurrentTemperature > _this.MaxTemperature)
                _this.MaxTemperature = _this.CurrentTemperature;
            if (_this.CurrentTemperature < _this.MinTemperature)
                _this.MinTemperature = _this.CurrentTemperature;
            console.log("Current: " + _this.CurrentTemperature + " Max: " + _this.MaxTemperature + " Min: " + _this.MinTemperature);
        };
        return _this;
    }
    return ExternalTemperatureService;
}(BaseService_1["default"]));
var svc = new ExternalTemperatureService();
module.exports = svc;
