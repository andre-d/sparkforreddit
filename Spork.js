Spork.run = function() {
	var listing = new Spork.UI.Listing({collection: new Reddit.getFrontPage()})
	$('#content').html('').append(listing.el)
}

Spork.init = function() {
	$(Spork.run)
}

Spork.Utils.getScripts('Reddit.js', 'SporkUI.js').then(Spork.init)