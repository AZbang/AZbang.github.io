"use strict";

var Handlebars = require('handlebars');
var PolyRun = require("poly_run");
var $ = require('jquery');

// My Data
var data = require('./data');
data.descriptionMarkdown = data.description.join('\n');

$(function() {

	Handlebars.registerHelper('markdown', require('helper-markdown'));
	var source = $("#template").html();
	var template = Handlebars.compile(source);
	$('body').html(template(data));

	
	PolyRun.add('bg', {
		parent: document.getElementById('main'),
		view: document.getElementById('background'),
		startPoint: 1,

		cell: 100,
		compress: 6,

		animation: 0.1,
		speed: 0.1,
		acceleration: 0.00001,

		style: {
			0: {
				strokeStyle: '#333',
				lineWidth: 0.5,
				isRenderPoint: true,
				fillStyle: '#424242',
				radiusPoint: 2.5
			}
		}
	});

	var loop = function() {
		PolyRun.update();
		requestAnimationFrame(loop);
	}
	loop();
});