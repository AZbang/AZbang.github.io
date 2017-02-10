"use strict";

const Handlebars = require('handlebars');
const PolyRun = require("./PolyRun");
const $ = require('jquery');

// My Data
const data = require('./data');

$(() => {
	data.descriptionMarkdown = '';
	for(let i = 0; i < data.description.length; i++) {
		data.descriptionMarkdown += '\n' + data.description[i];
	}

	Handlebars.registerHelper('markdown', require('helper-markdown'));
	var source = $("#template").html();
	var template = Handlebars.compile(source);
	$('body').html(template(data));



	var vertices = [];
	
	var poly = new PolyRun({
		root: $('#main'),
		view: document.getElementById('background'),
		animationSpeed: 0.1,
		startPoint: 0,
		isRenderPoint: true,
		cell: 100,

		style: {
			colorActiveLine: 'orange',
			colorLine: '#333',
			colorPoint: '#000',
			radiusPoint: 2.5,
			lineWidth: 1
		}
	});

	window.onresize = poly.resize.bind(poly);
	poly.start();
});