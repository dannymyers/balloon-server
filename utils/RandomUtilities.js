"use strict";
exports.__esModule = true;
var RandomUtilities = /** @class */ (function () {
    function RandomUtilities() {
    }
    RandomUtilities.RandomIntFromInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    return RandomUtilities;
}());
exports["default"] = RandomUtilities;
