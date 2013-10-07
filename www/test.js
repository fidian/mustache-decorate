/*global document, Mustache, window*/
(function () {
	'use strict';

	// I advocate that you should use a library to run code when the
	// page loads.  To keep the demo light, I use this archaeic method.
	window.onload = function () {
		var model, template, view;

		model = {
			list: [
				'word1',
				'word2',
				'word3',
				'word4'
			],
			someProperty: "someValue"
		};
		template = "{{_log}} Word List: {{#_comma}}list{{/_comma}}";
		view = Mustache.render(template, model);
		document.getElementById('dest').innerHTML = view;
	};
}());
