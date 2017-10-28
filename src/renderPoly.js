module.exports = (view, w, h, mainColor, side) => {
  view.width = w;
	view.height = h;
	var ctx = view.getContext('2d');

	var poly = PolyRun.add(view.id, {
		parent: document.body,
		view, w, h,

		generate: true,
		autoStart: false,
		cell: 100,
		compress: 10,

		vertices: [],
		speed: 0.15,
		probability: 3,
		acceleration: 0.00001,

		animCounterSpeed: 0.1,
		animCounterMax: 10,

		clear: () => {
			ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		},
		render: {
			0: {
				renderLine: (p, x1, y1, x2, y2) => {
			    ctx.lineStyle = mainColor;
					ctx.lineWidth = 1.5;

					ctx.beginPath();
					ctx.moveTo(x1, y1);
					ctx.lineTo(x2, y2);
					ctx.stroke();
				},
				renderPoint: (p, x, y) => {
					ctx.fillStyle = mainColor;
					ctx.beginPath();
					ctx.arc(x, y, 3, 0, 2*Math.PI);
					ctx.fill();

					ctx.strokeStyle = mainColor;
					ctx.lineWidth = 2;

					ctx.beginPath();

					// // animationCounter for custom animation (something like a TWEEN.Linear)
					// ctx.arc(x, y, p.animCounter, 0, 2*Math.PI);
					// ctx.stroke();
				}
			}
		}
	});

  let fx = PolyRun.effects[view.id];
  fx.start(Math.round(w/100));
  fx.start(0);

	var loop = () => {
		PolyRun.update();
		requestAnimationFrame(loop);
	}

	loop();
};
