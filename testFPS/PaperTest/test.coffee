size = new Size 800, 400

# FPS text
text = new PointText
	point: new Point 0, size.height - 50
	fillColor: "red"
	fontSize: 40

# create rects
bodies = []
img = document.getElementById "box"

# update
onFrame = (e) ->
	fps = Math.floor(e.count / e.time)
	text.content = "
		FPS: #{fps}   COUNT OBJECTS: #{bodies.length}
	"


	for rect in bodies
		rect.size = new Size 50, 50
		rect.rotate 600*e.delta


setInterval ->
	randPos = Point.random() * new Point size.width, size.height - 100
	bodies.push new Raster img, randPos
, 10