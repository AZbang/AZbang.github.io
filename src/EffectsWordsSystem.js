const TWEEN = require('tween.js');

class EffectsWordsSystem {
	constructor(config) {
		var world = config.world;
		var zoom = {x: 1, y: 1};

		// this.animationZoom = new TWEEN.Tween(zoom)
		// 	.to({ x: 3, y: 3 }, 10000)
		// 	.delay(20000)
		// 	.onUpdate(function() {
		// 		world.stage.scale.set(this.x, this.y);
		// 		world.stage.position.x = (world.w*this.x)-(world.w/2);
		// 		world.stage.position.y = (world.h*this.y)-(world.h/2);
		// 	})
		// 	.start();

		// setTimeout(() => {
		// 	world.renderer.view.className = 'blur';
		// 	document.getElementById('content').style.opacity = 1;
		// }, 20000);
	}
	update(time) {
		TWEEN.update(time);
	}
}

module.exports = EffectsWordsSystem;