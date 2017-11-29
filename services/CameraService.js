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
var PiCamera = require("pi-camera");
var moment = require("moment");
var CameraService = /** @class */ (function (_super) {
    __extends(CameraService, _super);
    function CameraService() {
        var _this = _super.call(this, 10000) || this;
        _this.run = function () {
            var timestamp = moment().format("YYYYMMDDHHmmss");
            console.log("Taking Picture...");
            var camera = new PiCamera({
                mode: 'photo',
                output: "./camera/" + timestamp + ".jpg",
                width: 3280,
                height: 2464,
                nopreview: true
            });
            camera.snap().then(function (result) {
                console.log("Success");
            })["catch"](function (error) {
                console.log("Error");
                console.log(error);
                _this.Error = error;
            });
        };
        return _this;
    }
    return CameraService;
}(BaseService_1["default"]));
var svc = new CameraService();
module.exports = svc;
