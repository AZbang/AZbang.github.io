//  Утилита для создания сцены из точек.
window.points = [];
window.triangles;

window.onclick = function(e) {
	var x = e.clientX;
	var y = e.clientY;

	// Ставим точку при обычном действии
	if(!e.shiftKey && !e.ctrlKey) {
		points.push([x, y]);
	}

	// Стираем точку, если зажат ктрл
	if(e.ctrlKey) {
		for(var i = 0; i < points.length; i++) {
			if(x > points[i][0]-2.5 && x < points[i][0]+2.5 && y > points[i][1]-2.5 && y < points[i][1]+2.5) {
				points.splice(i, 1);
				break;
			}
		}
	}

	// Обновляем триангуляцию
	triangles = Delaunay.triangulate(points);
}

// Выделяем при движении и зажатым шифтом главные точки
var isMouseDown = false;
window.onmousemove = function(e) {
	if(isMouseDown && e.shiftKey) {
		var x = e.clientX;
		var y = e.clientY;

		var isFlag = false;

		for(var i = 0; i < points.length; i++) {
			if(x > points[i][0]-15 && x < points[i][0]+15 && y > points[i][1]-15 && y < points[i][1]+15) {
				points[i][2] = true;
			}
		}
	}
}
window.onmousedown = function() {
	isMouseDown = true;
}
window.onmouseup = function() {
	isMouseDown = false;
}
