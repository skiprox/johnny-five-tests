'use strict';

const five = require('johnny-five');
const board = new five.Board();

let led;
let anode;

class Main {
	constructor() {
		board.on("ready", () => {
			anode = new five.Led.RGB({
				pins: {
					red: 6,
					green: 5,
					blue: 3
				},
				isAnode: true
			});
			anode.intensity(100);
			anode.color("#FF5500");
		});
	}
}

new Main();