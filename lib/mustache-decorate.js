// fid-umd {"depends":[{"name":"Mustache","commonjs":"mustache"}],"jslint":1,"name":"DecoratedObject"}
/*global define, YUI*/
(function (n, r, f) {
	"use strict";
	try { module.exports = f(require("mustache")); return; } catch (a) {}
	try { exports[n] = f(require("mustache")); return; } catch (b) {}
	try { return define.amd && define(n, ["Mustache"], f); } catch (c) {}
	try { return YUI.add(n, function (Y) { Y[n] = f(Y.Mustache); }, "", { requires: ["Mustache"] }); } catch (d) {}
	try { r[n] = f(r.Mustache); return; } catch (e) {}
	throw new Error("Unable to export " + n);
}("DecoratedObject", this, function (Mustache) {
	"use strict";
	// fid-umd end

	var oldRender, augmentData;

	function DecoratedObject() {}


	/*jslint nomen:true*/
	DecoratedObject.prototype._comma = function () {
		/*jslint nomen:false*/
		var myself;

		myself = this;

		return function (text, render) {
			var target;

			target = myself[text];

			if (!target || !Array.isArray(target)) {
				return '';
			}

			return target.join(', ');
		};
	};


	/*jslint nomen:true*/
	DecoratedObject.prototype._log = function () {
		/*jslint nomen:false*/
		console.log(this);
	};


	function augmentDataArray(input) {
		var output, key;

		// Copy all numeric keys
		output = input.slice();

		// Copy all properties
		for (key in input) {
			if (input.hasOwnProperty(key) && !output.hasOwnProperty(key)) {
				output[key] = input[key];
			}
		}

		for (key in DecoratedObject.prototype) {
			if (DecoratedObject.prototype.hasOwnProperty(key)) {
				output[key] = DecoratedObject.prototype[key];
			}
		}

		output.lengthOfOne = (output.length === 1);

		return output;
	}

	function augmentDataObject(input) {
		var output, key;

		output = new DecoratedObject();

		for (key in input) {
			if (input.hasOwnProperty(key)) {
				output[key] = augmentData(input[key]);
			}
		}

		return output;
	}

	augmentData = function augmentData(input) {
		if (Array.isArray(input)) {
			return augmentDataArray(input);
		}

		if (typeof input === 'object' && input !== null) {
			return augmentDataObject(input);
		}

		return input;
	};
	oldRender = Mustache.render;
	Mustache.render = function (template, view, partials) {
		var newView;

		newView = augmentData(view);

		return oldRender(template, newView, partials);
	};
	return DecoratedObject;

	// fid-umd post
}));
// fid-umd post-end
