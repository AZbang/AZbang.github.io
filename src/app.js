"use strict";

const $ = require('jquery');
const Handlebars = require('handlebars');
const renderPoly = require('./renderPoly');

Handlebars.registerHelper('markdown', require('helper-markdown'));

$(() => {
	$.getJSON("./data.json", (data) => {
		data.image = data.images[Math.floor(Math.random()*data.images.length)];

		var source = $("#template").html();
		var template = Handlebars.compile(source);
		$('body').html(template(data));

		let img = document.createElement('img');
		img.setAttribute('src', data.image)

		img.addEventListener('load', () => {
			let colorThief = new ColorThief();
			let main = colorThief.getColor(img);
			let back = colorThief.getPalette(img)[1];
			let maincolor = `rgb(${main[0]}, ${main[1]}, ${main[2]})`;
			let backcolor = `rgb(${back[0]}, ${back[1]}, ${back[2]})`;
			$('.avatar, .mui-panel').css('borderColor', maincolor);
			$('.text-color-thief').css({'color': backcolor});
			$('.bg-color-thief').css({'background-color': maincolor});

			if(window.innerWidth > 520)
				renderPoly($('#background')[0], window.innerWidth, window.innerHeight, maincolor, backcolor);
		});
	});
});
