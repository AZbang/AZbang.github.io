"use scrict";

const PIXI = require('pixi.js');
const delaunay = require("delaunay-fast");
const Point = require("./Point");
const helper = require("./modules/helper");

class TriangulationSystem {
	constructor(config) {
		this.world = config.world;

		this.scene = new PIXI.Graphics();
		this.world.stage.addChild(this.scene);

		this.vertices = config.vertices || [];
		this.animationSpeed = config.animationSpeed || 0.1;
		this.probabilityCreateAnimation = config.probabilityCreateAnimation || 50;

		this.points = [];
		this.triangles = [];

		this.ACCELERATION_ANIMATION = 0.001;

		this._create();
	}
	_createPoints() {
		var iterationsControl = 0;
		for(var i = 0; i < this.triangles.length; i++) {
			var points;
			var ind = this.triangles[i];

			iterationsControl++;
			if(!this.points[ind]) this.points[ind] = new Point(this, ind);

			switch(iterationsControl) {
				case 1:
					points = [this.triangles[i+1], this.triangles[i+2]];
					break;
				case 2:
					points = [this.triangles[i-1], this.triangles[i+1]];
					break;
				case 3:
					points = [this.triangles[i-1], this.triangles[i-2]];
					iterationsControl = 0;
					break;
			}

			eachPoints: for(let p = 0; p < points.length; p++) {
				for(let j = 0; j < this.points[ind].commons.length; j++) {
					if(this.points[ind].commons[j] == points[p]) continue eachPoints;
				}
				this.points[ind].commons.push(points[p]);
			}
		}
	}
	_createPointLinks() {
		for(let i = 0; i < this.points.length; i++) {
			for(let p = 0; p < this.points[i].commons.length; p++) {
				this.points[i].commons[p] = this.points[this.points[i].commons[p]];
			}
		}
	}

	_create() {
		this.triangles = delaunay.triangulate(this.vertices);
		this._createPoints();
		this._createPointLinks();
	}
	update(time) {
		if(this.animationSpeed < 0.5) this.animationSpeed += this.ACCELERATION_ANIMATION;

		for(let i = this.points.length; i;) {
			--i; this.points[i].update(time);
		}
	}
	draw(time) {
		this.scene.clear();

		for(let i = this.points.length; i;) {
			--i; this.points[i].draw(time);
		}
	}
	resize() {
		for(let i = this.points.length; i;) {
			--i; this.points[i].resize();
		}
	}
}

module.exports = TriangulationSystem;