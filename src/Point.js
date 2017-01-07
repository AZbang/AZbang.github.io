"use strict";
const helper = require("./modules/helper");


class Point {
	constructor(system, index) {
		this.index = index;
		this.system = system;
		this.ctx = system.scene;

		this.x = system.vertices[index][0]*this.system.world.zoom;
		this.y = system.vertices[index][1]*this.system.world.zoom;
		this.isLetter = system.vertices[index][2];
		console.log(system.vertices[index]);

		this.commons = [];
		this.dtCommons = [];
		this.activeAnimations = [];

		this.isStart = false;
	}
	isCreateAnimation() {
		return helper.randRange(0, this.system.probabilityCreateAnimation) == 1;
	}

	start() {
		this.isStart = true;
	}

	update() {
		this.isStart && this.animation();
	}
	animation() {
		for(let i = 0; i < this.commons.length; i++) {
			var dt = this.dtCommons;
			var p = this.commons[i];

			if(this.isCreateAnimation() || dt[i]) {
				if(!dt[i]) dt[i] = {x: this.x, y: this.y};

				dt[i].x = helper.lerp(dt[i].x, p.x, this.system.animationSpeed);
				dt[i].y = helper.lerp(dt[i].y, p.y, this.system.animationSpeed);


				if(helper.compare(dt[i].x, p.x, 1) && helper.compare(dt[i].y, p.y, 1)) {
					p.start();
				}
			}
		}
	}

	draw() {
		if(this.isStart) {
			for(let i = 0; i < this.dtCommons.length; i++) {
				if(this.dtCommons[i]) {
					this.ctx.lineStyle(1.5, this.isLetter && this.commons[i].isLetter ? 0xFFAD38 : 0xCCCCCC);
					this.ctx.moveTo(this.x, this.y);
					this.ctx.lineTo(this.dtCommons[i].x, this.dtCommons[i].y);
				}
			}

			this.ctx.beginFill(0xC3C3C3);
			this.ctx.drawCircle(this.x, this.y, 2*this.system.world.zoom);
		}
	}
}

module.exports = Point;