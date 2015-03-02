Spork = {
}

Spork.Utils = {}

Spork.Utils.getScript = function(path) {
	return $.ajax({
		crossDomain: true,
		dataType: "script",
		cache: true,
		url: path
	}).fail(function() {
		alert("FAIL")
	})
}

Spork.Utils.getScripts = function(/* scripts */) {
	var scripts = []
	
	for (var i = 0; i < arguments.length; i++) {
		scripts.push(Spork.Utils.getScript(arguments[i]))
	}
	
	return $.when.apply($, scripts)
}

Spork.Utils.getScripts("Spork.js")