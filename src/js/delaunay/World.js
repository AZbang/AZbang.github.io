"use strict";

const PIXI = require('pixi.js');
const helper = require("./modules/helper");

class World {
	constructor(config = {}) {
		this.root = config.root;
		this.view = config.view;
		this.w = this.root.width();
		this.h = this.root.height();
		this.zoom = this.w/1920;

		this.renderer = PIXI.autoDetectRenderer(this.w, this.h, {
			view: config.view,
			backgroundColor: 0xFFFFFF,
			antialiasing: true
		});
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
		this.w = this.root.width();
		this.h = this.root.height();
		this.renderer.resize(this.w, this.h);
		this.zoom = this.w/1920;

		for(let i = 0; i < this.objects.length; i++) {
			this.objects[i].resize();
		}
	}
}

module.exports = World;