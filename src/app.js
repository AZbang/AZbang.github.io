"use strict";

const Vibrant = require('node-vibrant');
const Handlebars = require('handlebars');
const $ = require('jquery');

const renderPoly = require('./renderPoly');

// My Data
const data = require('./data');
data.descriptionMarkdown = data.description.join('\n\n');
data.contactsMarkdown = data.contacts.join('\n\n');

$(() => {
	Handlebars.registerHelper('markdown', require('helper-markdown'));
	var source = $("#template").html();
	var template = Handlebars.compile(source);
	$('body').html(template(data));
	
	renderPoly($('#background')[0], window.innerWidth, window.innerHeight, 'rgb(17, 17, 17)');
});
