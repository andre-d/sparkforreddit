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
	events: {
		 'click .self .thumbnail a': 'showself',
    },
    renderself: function() {
    	this.paragraph = $('<div>').css('height', 0).addClass('hider').append($('<p>').addClass('selftext'))
    	this.paragraph.find('.selftext').html($("<div>").html(this.model.get('selftext_html')).text())
    	this.$el.append(this.paragraph)
    },
    toggle: function() {
    	if (this.paragraph.hasClass('shown')) {
    		this.paragraph.css('height', 0)
    	} else {
    		var fullheight = this.paragraph.find('.selftext').height();
    		this.paragraph.css('height', fullheight)
    	}
    	this.paragraph.toggleClass('shown')
    },
    showself: function(e) {
    	e ? e.preventDefault() : undefined
    	if (!this.paragraph) {
    		this.renderself()
    	}
    	window.setTimeout(this.toggle.bind(this), 0)
    },
	thumbnail: function() {
		var thumbnail = this.model.get('thumbnail')
		
		if (thumbnail == 'self' || this.model.get('is_self')) {
			return 'https://www.reddit.com/static/self_default2.png'
		}
		
		return thumbnail ? thumbnail : 'https://www.reddit.com/static/noimage.png'
	},
	link: function() {
		if (this.model.get('is_self')) {
			return '#'
		}
		return this.model.get('url')
	},
	permalink: function() {
		return 'https://i.reddit.com' + this.model.get('permalink')
	},
	render: function() {
		if (this.model.get('is_self')) {
			this.$el.addClass('selfitem')
		}
		
		var contents = $('<div>').addClass('content')
		
		if (this.model.get('is_self')) {
			contents.addClass('self')
		}
		
		contents.append(
				$('<div>').addClass('thumbnail').append(
					$('<a>').attr('target', '_blank').attr('href', this.link()).append(
							$('<img>').attr('width', 128).attr('src', this.thumbnail())
					)
				)
		).append(
				$('<div>').addClass('title').append(
						
						$('<a>').attr('href',this.permalink()).text(this.model.get('title'))
			
				
				)
		)
		
		this.$el.html('').append(contents)
		
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