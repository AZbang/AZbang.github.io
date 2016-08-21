window.onload = function() {
	// animation hide preloader
	animateHide(preloader, 1000);

	function animateHide(el, time, cb) {
		el.style.opacity = 0;

		setTimeout(function() {
			el.classList.add('hide');
			if(cb) cb();
		}, time);
	}

	// progress dev games
	var progress = document.getElementsByClassName('progress')[0];
	var valueProgress = progress.innerHTML;
	progress.innerHTML = '';

	var w = document.createElement('div');
	w.classList.add('progress-value');
	w.style.width = 2 * valueProgress + 'px';
	progress.appendChild(w);


	// Animation 3D cube
	var rotates = [null, 'rotateY(-90deg)', 'rotateY(180deg)', 'rotateY(90deg)'];
	var nowSide = 0;
	var cube = document.getElementById('cube');

	next.onclick = function(e) {
		cube.children[nowSide].classList.add('invis');

		nowSide++;
		if(nowSide > 3) nowSide = 0;

		cube.children[nowSide].classList.remove('invis');
		rotateCube(nowSide);
	}

	back.onclick = function(e) {
		cube.children[nowSide].classList.add('invis');

		nowSide--;
		if(nowSide < 0) nowSide = 3;

		cube.children[nowSide].classList.remove('invis');
		rotateCube(nowSide);
	}

	function rotateCube(i) {
		cube.style.transform = rotates[i];

	}


	// runing stroke
	var stroke = ('console.log("Web Development");').split('');
	var i = 0;
	var code = document.getElementById('code');

	var timer = setInterval(function() {
			code.innerHTML += stroke[i];
			i++;
			if(!stroke[i]) {
			clearInterval(timer);
		}
	}, 50);
}