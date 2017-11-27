import express = require("express");
import fs = require("fs");
import ExternalTemperatureService = require("./services/ExternalTemperatureService");
import AltimeterService = require("./services/AltimeterService");

class Main{

    public start = () =>{

        ExternalTemperatureService.start();
        AltimeterService.start();

        var port = 8080;
        var app = express();
        
        app.listen(port, () => {
            console.log('We are live on ' + port);
        });
        
        app.use(express.static('public'))
        
        app.get('/sensor', (req, res) => {
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
        
    }

    public stop = () => {
        ExternalTemperatureService.stop();
        AltimeterService.stop();
        process.exit();
    }
}
let main = new Main();
main.start();

process.on('SIGINT', () => {
    main.stop();
});