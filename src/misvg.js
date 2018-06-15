/* global require, module */
'use strict';

const assign = require('object-assign');
const loadXml = require('./utils/load-xml');
const stringBelt = require('./utils/string-belt');

const DEFAULT_OPTIONS = {
	indent: 2
};

function misvg(options) {
	const misvgOptions = assign({}, DEFAULT_OPTIONS, options);
	const sprites = {};

	return {
		add(key, file) {
			const sprite = loadXml('');					// Empty XML file for SVG element
			const xmlFile = loadXml(file);
			const svgElement = xmlFile('svg');	// Ignore XML tag, DOCTYPE and just get the SVG element

			sprite.root().append(svgElement);

			sprites[key] = sprite.xml();

			return this;
		},

		getObjectString() {
			let str = '{';

			for (const prop in sprites) {
				/* istanbul ignore else */
				if (Object.prototype.hasOwnProperty.call(sprites, prop)) {
					str += '\n' + stringBelt.addIndent(misvgOptions.indent) + '\'' + prop + '\': `' + sprites[prop] + '`,';
				}
			}

			str = str.replace(/,\s*$/, '') + '\n}';
			return str;
		},

		getSprites() {
			return sprites;
		}
	};
}

module.exports = misvg;
