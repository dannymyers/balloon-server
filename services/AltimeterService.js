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
var BMP280 = require("bmp280-sensor");
var AltimeterService = /** @class */ (function (_super) {
    __extends(AltimeterService, _super);
    function AltimeterService() {
        var _this = _super.call(this, 20000) || this;
        _this.MaxTemperature = -10000;
        _this.MinTemperature = 10000;
        _this.CurrentTemperature = 0;
        _this.MaxPressure = -10000;
        _this.MinPressure = 10000;
        _this.CurrentPressure = 0;
        _this.run = function () {
            console.log("Reading sensors");
            _this.bmp280.readSensors()
                .then(function (data) {
                //console.log(`Temperture:\t${data.Temperature}`);
                //console.log(`Pressure:\t${data.Pressure}`);
                console.log(data);
                _this.CurrentPressure = data.Pressure;
                if (_this.CurrentPressure > _this.MaxPressure)
                    _this.MaxPressure = _this.CurrentPressure;
                if (_this.CurrentPressure < _this.MinPressure)
                    _this.MinPressure = _this.CurrentPressure;
                _this.CurrentTemperature = data.Temperature;
                if (_this.CurrentTemperature > _this.MaxTemperature)
                    _this.MaxTemperature = _this.CurrentTemperature;
                if (_this.CurrentTemperature < _this.MinTemperature)
                    _this.MinTemperature = _this.CurrentTemperature;
            })
                .then(function () {
                _this.bmp280.close();
            })["catch"](function (err) {
                console.log(err);
                _this.bmp280.close();
            });
        };
        _this.kill = function () {
            _this.bmp280.close();
        };
        _this.bmp280 = new BMP280({
            i2cBusNumber: 1,
            i2cAddress: 0x76 // defaults to 0x76
        });
        _this.bmp280.config({
            powerMode: 3,
            pressureOversampling: 3,
            temperatureOversampling: 1,
            iirFilter: 2,
            standby: 4 // 0 - 0.5ms, 1 - 62.5ms, 2 - 125ms, 3 - 250ms, 4 - 500ms, 5 - 1000ms, 6 - 2000ms, 7 - 4000ms
        });
        return _this;
    }
    return AltimeterService;
}(BaseService_1["default"]));
var svc = new AltimeterService();
module.exports = svc;
