define([
    'text!templates/main.html',
    'marionette',
    'js/board',
], function(html, Mn, BoardView) {
    'use strict';

    var ItemView = Mn.View.extend({
        className: 'item',
        template: $(html).filter('#boards-item')[0].outerHTML,
        events: {
            'click': 'onClick',
        },

        onClick: function() {
            var view = new BoardView({model: this.model});
            window.app.setView(view);
        },
    });

    var Collection = Backbone.Collection.extend({
        url: window.location.origin + '/api/boards',
    })
    
    var View = Mn.CollectionView.extend({
        className: 'boards',
        childView: ItemView,

        initialize: function(options) {
            this.options = options;
        },
        
        onRender: function() {
            window.app.setHeader({
                center: {
                    content: 'Доски'
                },
                left: {
                    content: ''
                },
                right: {
                    content: ''
                }
            })
            this.collection = new Collection();
            this.collection.fetch({
                success: function() {
                    window.app.stopLoading();
                },
            });
        },
    });

    return View;
});