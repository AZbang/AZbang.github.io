window.renderPoly = function(viewId, w, h, mainColor, sideColor) {
  var view = document.getElementById(viewId);
  view.width = w;
	view.height = h;
	var ctx = view.getContext('2d');
  var grd = ctx.createRadialGradient(w/2, h/10+200, w/10, w/2, 200, w);
  var lineWidth = w/1024;
  grd.addColorStop(0, mainColor);
  grd.addColorStop(1, sideColor);

	var poly = PolyRun.add(view.id, {
		parent: document.body,
		view, w, h,

		generate: true,
		autoStart: false,
		cell: 100*(w/720),
		compress: 10,

		speed: 0.1,
		probability: 10,
		acceleration: 0.00001,

		animCounterSpeed: 0.05,
		animCounterMax: 3,

		clear: () => {
			ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		},
		render: {
			0: {
				renderLine: (p, x1, y1, x2, y2) => {
			    ctx.lineStyle = grd;
					ctx.lineWidth = lineWidth;

					ctx.beginPath();
					ctx.moveTo(x1, y1);
					ctx.lineTo(x2, y2);
					ctx.stroke();
				},
				renderPoint: (p, x, y) => {
					ctx.fillStyle = grd;
					ctx.beginPath();
					ctx.arc(x, y, p.animCounter, 0, 2*Math.PI);
					ctx.fill();

					ctx.strokeStyle = grd;
					ctx.lineWidth = lineWidth;

					ctx.beginPath();

					// // animationCounter for custom animation (something like a TWEEN.Linear)
					// ctx.arc(x, y, p.animCounter, 0, 2*Math.PI);
					// ctx.stroke();
				}
			}
		}
	});

  let fx = PolyRun.effects[view.id];
  fx.start(Math.round(w/fx.cell));
  fx.start(0);

	var loop = () => {
		PolyRun.update();
		requestAnimationFrame(loop);
	}

	loop();
};
