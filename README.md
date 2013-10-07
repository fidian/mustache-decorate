Debugging Mustache
==================

[Mustache.js] provides a really convenient way to work with templates in JavaScript.  The hard part is figuring out what you are doing wrong in your templates as there is little or no debugging information available.  This library solves that problem, at least partially.  New things are available on objects and you can extend all objects that are sent out to the templates.

This is done by hijacking the Mustache.render method, augmenting the data that is passed to the view, and then letting the original render method work.  Arrays have additional properties added and objects are converted from a generic Object to a new DecoratedObject.  By adding more methods to DecoratedObject.prototype, everything shown in the view gets new, unbelievable functionality.

How To Use
==========

Add this to your HTML, just after you load mustache.

```html
<script src="libraries/mustache.js"></script>
<script src="libraries/mustache-decorate.js"></script>
```

Now you automatically have two new things available in your templates.  The first, `_log` will log the current object to the console.  Secondly, you can join the elements of an array with a comma by using `_comma` in your template.  You can look at the "www/test.html" in the repository to see them in action.

_log
----

Writes the current object to the console.  This is great if you are nested somewhere deep and you don't know what's available any longer.  Output is sent to the console.  If you use IE8 or lower, make sure you either open the developer console or implement `console.log()` somehow.

```
Logging my current object is easy.  {{_log}}
Log each element in an array:  {{#someProperty}}{{_log}}{{/someProperty}}
```

_comma
------

The content of the _comma block should be the name of the property you wish to implode.

```js
var data = { propName: [1, 2, 3] };
```

Now you would use this template

```
Here is my array with commas:  {{#_comma}}propName{{/propName}}
```

And the result would be exactly what you'd expect.

```html
Here is my array with commas:  1, 2, 3
```

I Want More!
============

When you use this DecoratedObject, you are able to add more things to its prototype and will also be available to objects when they go to the view.  You can have methods that will show trees, localize text, convert dates into a more readable version and more.

License
=======

This code is released under a MIT license with an additional non-advertising clause.  The full text is available in the LICENSE.md file in the repository.

[Mustache.js]: https://github.com/janl/mustache.js
