"use strict";

const helper = require("./modules/helper");

class Point {
	constructor(system, index) {
		this.world = system.world;
		this.system = system;
		this.ctx = system.scene;
		
		this.index = index;

		this.x = system.vertices[index][0]*this.world.zoom;
		this.y = system.vertices[index][1]*this.world.zoom;
		this.isLetter = system.vertices[index][2];

		this.commons = [];
		this.dtCommons = [];
		this.activeAnimations = [];
		this.countActivatePoints = 0;

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

				var speed = Math.min(this.system.animationSpeed*this.world.ticker.deltaTime, 0.8);
				dt[i].x = helper.lerp(dt[i].x, p.x, speed);
				dt[i].y = helper.lerp(dt[i].y, p.y, speed);


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

	resize() {
		this.x = this.system.vertices[this.index][0]*this.world.zoom;
		this.y = this.system.vertices[this.index][1]*this.world.zoom;
	}
}

module.exports = Point;