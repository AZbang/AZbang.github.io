window.onload = ->
	#init canvas
	renderer = PIXI.autoDetectRenderer 1000, 800, 
		backgroundColor: 0x698AE8
	document.body.appendChild renderer.view

	#init text fps
	textFPS = new PIXI.Text "",
		font: "bold italic 36px Arial"
		fill: "#F7EDCA"

	textFPS.x = 0
	textFPS.y = 0

	#create a black shape picture?! It's crazy, C2!
	box = PIXI.Texture.fromImage('box.png');

	bodies = []
	setInterval ->
		x = Math.floor Math.random()*1000
		y = Math.floor Math.random()*800

		rect = new PIXI.Sprite(box)
		rect.position.set x, y
		rect.height = 50
		rect.width = 50
		rect.anchor.set 0.5, 0.5

		rects.addChild rect

		bodies.push rect
	, 10



	#init containers
	stage = new PIXI.Container
	rects = new PIXI.Container

	stage.addChild rects
	stage.addChild textFPS


	# create animate
	ticker = new PIXI.ticker.Ticker

	ticker.add ->
		textFPS.text = "FPS: #{Math.floor(ticker.FPS)}   COUNT OBJECTS: #{bodies.length}"
		
		for rect in bodies
			rect.rotation += 0.1

		renderer.render stage

	do ticker.start