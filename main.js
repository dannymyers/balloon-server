"use strict";
exports.__esModule = true;
var express = require("express");
var fs = require("fs");
var port = 8080;
var app = express();



const BMP280 = require('bmp280-sensor');
const options = {
  i2cBusNumber  : 1,    // defaults to 1
  i2cAddress    : 0x76  // defaults to 0x76
};
const bmp280 = new BMP280(options);
 
bmp280.config({
  powerMode: 3,                // 0 - sleep, 1|2 - one measurement, 3 - continuous
  pressureOversampling: 3,     // 0 - Skipped, 1 - ×1, 2 - ×2, 3 - ×4, 4 - ×8, 5 - ×16
  temperatureOversampling: 1,  // 0 - Skipped, 1 - ×1, 2 - ×2, 3 - ×4, 4 - ×8, 5 - ×16
  iirFilter: 2,                // Coefficient: 0 - off, 1 - 2, 2 - 4, 3 - 8, 4 - 16
  standby: 4                   // 0 - 0.5ms, 1 - 62.5ms, 2 - 125ms, 3 - 250ms, 4 - 500ms, 5 - 1000ms, 6 - 2000ms, 7 - 4000ms
});


app.listen(port, function () {
    console.log('We are live on ' + port);
});

app.use(express.static('public'))

app.get('/sensor', function (req, res) {
    
console.log(`Reading sensors`);
bmp280.readSensors()
  .then((data) => {
    console.log(`Temperture:\t${data.Temperature}`);
    console.log(`Pressure:\t${data.Pressure}`);
    var x = { lat: 1.552, lng: 53.312, pressure: data.Pressure, x: 10, y: 10, z: 10, accel: 100, temp: data.Temperature, time: new Date() };
    fs.appendFileSync("log/1.txt", JSON.stringify(x) + "\n");
    res.send(x);

  })
  .then(() => {
    bmp280.close();
  })
  .catch((err) => {
    console.log(err);
    bmp280.close();
  });
 
});
app.get('/whatever', function (req, res) {
    var x = { lat: 5.552, lng: 53.312, alt: 10000, x: 10, y: 10, z: 10, accel: 100, temp: -10.9, time: new Date() };
    res.send(x);
});
 

process.on('SIGINT', () => {
  bmp280.close();
  process.exit();
});