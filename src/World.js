"use strict";

const PIXI = require('pixi.js');
const helper = require("./modules/helper");

class World {
	constructor(id, config = {}) {
		this.w = window.innerWidth;
		this.h = window.innerHeight;
		this.zoom = this.w/1920;

		this.renderer = PIXI.autoDetectRenderer(this.w, this.h, {
			backgroundColor: 0xFFFFFF,
			antialiasing: true
		});
		document.body.appendChild(this.renderer.view);
		this.stage = new PIXI.Container();


		this.ticker = new PIXI.ticker.Ticker();
		this.ticker.add(this.loop.bind(this));

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
		console.log(this.ticker.FPS);
		this.update(time);
		this.draw(time);

		this.renderer.render(this.stage);
	}

	update(time) {
		for(let i = 0; i < this.objects.length; i++) {
			this.objects[i].update(time);
		}
	}	
	draw(time) {
		for(let i = 0; i < this.objects.length; i++) {
			this.objects[i].draw(time);
		}
	}
	resize() {
		this.w = window.innerWidth;
		this.h = window.innerHeight;
		this.zoom = this.w/1920;

		for(let i = 0; i < this.objects.length; i++) {
			this.objects[i].resize();
		}
	}
}

module.exports = World;