window.onload = ->
	class Rect
		constructor: (ctx, config) ->
			@ctx = ctx
			@x = config.x ? 0
			@y = config.y ? 0
			@w = config.w ? 50
			@h = config.h ? 50

			@angle = config.angle ? 0
			@img = config.img


		update: (dt) ->
			@angle += 0.1

		draw: ->
			do @ctx.save

			@ctx.translate @x + @w/2, @y + @h/2
			@ctx.rotate @angle

			@ctx.drawImage @img, -@w, -@h, @w, @h

			do @ctx.restore






	# init canvas
	canvas = document.getElementById "paper"
	ctx = canvas.getContext "2d"

	canvas.width = 1000
	canvas.height = 800

	# create rect every 10 milliseconds
	bodies = []
	box = document.getElementById "box"

	setInterval ->
		config =
			x: Math.floor Math.random()*canvas.width
			y: Math.floor Math.random()*canvas.height
			img: box
			

		bodies.push new Rect(ctx, config)
	, 10




	lastLoop = new Date

	tick = ->
		ctx.clearRect 0, 0, canvas.width, canvas.height

		# fps
		thisLoop = new Date
		fps = Math.floor 1000 / (thisLoop - lastLoop)
		lastLoop = thisLoop


		# update and draw bodies
		for rect in bodies
			do rect.update

		for rect in bodies
			do rect.draw

		# draw text fps
		ctx.font = "30px Arial"
		ctx.fillStyle = "red"
		ctx.fillText "FPS: #{fps}   COUNT OBJECTS: #{bodies.length}", 10, 50

		requestAnimationFrame tick

	do tick