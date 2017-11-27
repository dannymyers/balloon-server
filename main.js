"use strict";
exports.__esModule = true;
var express = require("express");
var ExternalTemperatureService = require("./services/ExternalTemperatureService");
var AltimeterService = require("./services/AltimeterService");
var Main = /** @class */ (function () {
    function Main() {
        this.start = function () {
            ExternalTemperatureService.start();
            AltimeterService.start();
            var port = 8080;
            var app = express();
            app.listen(port, function () {
                console.log('We are live on ' + port);
            });
            app.use(express.static('public'));
            app.get('/sensor', function (req, res) {
                var x = {
                    currentPressure: AltimeterService.CurrentPressure,
                    minPressure: AltimeterService.MinPressure,
                    maxPressure: AltimeterService.MaxPressure,
                    currentInternalTemperature: AltimeterService.CurrentTemperature,
                    minInternalTemperature: AltimeterService.MinTemperature,
                    maxInternalTemperature: AltimeterService.MaxTemperature,
                    currentExternalTemperature: ExternalTemperatureService.CurrentTemperature,
                    minExternalTemperature: ExternalTemperatureService.MinTemperature,
                    maxExternalTemperature: ExternalTemperatureService.MaxTemperature,
                    time: new Date()
                };
                console.log(x);
                res.send(x);
            });
        };
        this.stop = function () {
            ExternalTemperatureService.stop();
            AltimeterService.stop();
            process.exit();
        };
    }
    return Main;
}());
var main = new Main();
main.start();
process.on('SIGINT', function () {
    main.stop();
});
