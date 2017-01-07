"use strict";

const PIXI = require('pixi.js');
const helper = require("./modules/helper");

class World {
	constructor(id, config = {}) {
		this.w = window.innerWidth;
		this.h = window.innerHeight;

		this.renderer = PIXI.autoDetectRenderer(this.w, this.h, {
			backgroundColor: 0xFFFFFF,
			antialiasing: true
		});
		document.body.appendChild(this.renderer.view);

		this.stage = new PIXI.Container();
		this.stage.pivot.set(.5);

		this.objects = [];
	}

	addObject(constructor, config = {}) {
		config.world = this;
		var obj = new constructor(config);

		this.objects.push(obj);
		return obj;
	}
	removeObject(index) {
		this.objects.splice(index, 1);
	}

	start() {
		this.loop();
	}

	loop(time) {
		this.update(time);
		this.draw(time);

		this.renderer.render(this.stage);

		requestAnimationFrame(this.loop.bind(this));
	}

	update(time) {
		for(let i = 0; i < this.objects.length; i++) {
			this.objects[i].update(time);
		}
	}	
	draw(time) {
		for(let i = 0; i < this.objects.length; i++) {
			this.objects[i].draw && this.objects[i].draw(time);
		}
	}
}

module.exports = World;