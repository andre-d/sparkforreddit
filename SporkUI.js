Spork.UI = {}

Spork.UI.Item = Backbone.View.extend({
	tagName: 'div',
	className: 'item',
	render: function() {
		this.$el.html('Empty')
		return this
	}
})

Spork.UI.LinkItem = Backbone.View.extend({
	className: 'item linkitem',
	thumbnail: function() {
		var thumbnail = this.model.get('thumbnail')
		
		if (thumbnail == 'self') {
			return 'https://www.reddit.com/static/self_default2.png'
		}
		
		return thumbnail ? thumbnail : 'https://www.reddit.com/static/noimage.png'
	},
	permalink: function() {
		return 'https://i.reddit.com' + this.model.get('permalink')
	},
	render: function() {
		this.$el.html('').append(
				$('<div>').addClass('thumbnail').append(
					$('<a>').attr('target', '_blank').attr('href', this.model.get('url')).append(
							$('<img>').attr('width', 128).attr('src', this.thumbnail())
					)
				)
		).append(
				$('<div>').addClass('title').append(
						
						$('<a>').attr('href',this.permalink()).text(this.model.get('title'))
				)
		)
		return this
	}
})

Spork.UI.Listing = Backbone.View.extend({
	initialize : function() {
		this.collection.forEach(this.add.bind(this))
		this.collection.on('add', this.add, this)
	},
	add: function(item) {
		var model = new Spork.UI.LinkItem({model: item}).render();
		this.$el.append(model.render().el)
	},
	render: function() {
		return this
	}
})