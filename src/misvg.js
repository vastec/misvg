/* global require, module */
'use strict';

var assign = require('object-assign');
var loadXml = require('./utils/load-xml');
var stringBelt = require('./utils/string-belt');

var DEFAULT_OPTIONS = {
	indent: 2
};

function misvg(options) {
	var misvgOptions = assign({}, DEFAULT_OPTIONS, options);
	var sprites = {};

	return {
		add: function (key, file) {
			var sprite = loadXml('');      // Empty XML file for SVG element
			var xmlFile = loadXml(file);
			var svgElement = xmlFile('svg');   // Ignore XML tag, DOCTYPE and just get the SVG element

			sprite.root().append(svgElement);

			sprites[key] = sprite.xml();

			return this;
		},

		getObjectString: function () {
			var str = '{';

			for (var prop in sprites) {
				/* istanbul ignore else */
				if (Object.prototype.hasOwnProperty.call(sprites, prop)) {
					str += '\n' + stringBelt.addIndent(misvgOptions.indent) + '\'' + prop + '\': \'' + sprites[prop] + '\',';
				}
			}

			str = str.replace(/,\s*$/, '') + '\n}';
			return str;
		},

		getSprites: function () {
			return sprites;
		}
	};
}

module.exports = misvg;
