Reddit = {}

Reddit.API = 'https://api.reddit.com'

Reddit.init = function() {
	
}

Reddit.Collection = Backbone.Collection.extend({
	url: function() {
		return Reddit.API + '/' + this.endpoint + '.json'
	}
})

Reddit.Item = Backbone.Model.extend({
})

Reddit.Link = Reddit.Item.extend({})

Reddit.Listing = Reddit.Collection.extend({
	endpoint: '',
	model: function(attrs, options) {
		return new Reddit.Link(attrs["data"])
	},
	parse: function(data) {
		return data.data.children
	}
})

Reddit.getFrontPage = function() {
	var collection = new Reddit.Listing()
	collection.fetch()
	return collection
}

Reddit.init()