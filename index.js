'use strict';

const five = require('johnny-five');
const board = new five.Board();

let potentiometers = [];
let led;
let anode;
let color = '#000000';

class Main {
	constructor() {
		board.on("ready", () => {
			// Create a new `potentiometer` hardware instance.
			potentiometers[0] = new five.Sensor({
				pin: "A3",
				freq: 250
			});

			potentiometers[1] = new five.Sensor({
				pin: "A2",
				freq: 250
			});

			// Create a new anode instance
			anode = new five.Led.RGB({
				pins: {
					red: 6,
					green: 5,
					blue: 3
				},
				isAnode: true
			});

			// Inject the `sensor` hardware into
			// the Repl instance's context;
			// allows direct command line access
			board.repl.inject({
				pot: potentiometers[0],
				pot: potentiometers[1],
				anode
			});

			anode.on();
			anode.color("#FF0000");

			// "data" get the current reading from the potentiometer
			potentiometers[0].on("data", function() {
				// console.log(this.value, this.raw);
				let newColorValue = decimalToHex(map(this.value, 0, 910, 0, 255));
				color = color.replaceAt(1, newColorValue);
				console.log(color);
				anode.color(color);
			});
			potentiometers[1].on("data", function() {
				// console.log(this.value, this.raw);
				let newColorValue = decimalToHex(map(this.value, 0, 910, 0, 255));
				color = color.replaceAt(3, newColorValue);
				console.log(color);
				anode.color(color);
			});
		});
	}
}

function map(val, min1, max1, min2, max2) {
	return Math.floor((val-min1)/(max1-min1) * (max2-min2) + min2);
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function decimalToHex(d, padding) {
	if (d < 256) {
	    var hex = Number(d).toString(16);
	    padding = typeof (padding) === 'undefined' || padding === null ? padding = 2 : padding;

	    while (hex.length < padding) {
	        hex = '0' + hex;
	    }
	} else {
		hex = '00';
	}
    return hex;
}

new Main();
