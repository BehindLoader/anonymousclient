define([
    'text!templates/board.html',
    'marionette'
], function(html, Mn) {
    'use strict'; 

    var ItemView = Mn.View.extend({
        className: 'thread-item',
        template: $(html).filter('#board-thread-item')[0].outerHTML,
        events: {
            'click touchstart': 'onClick'
        },

        initialize: function(options) {
            this.options = options;
            this.model = options.model;
            this.textParse();
        },

        textParse: function() {
            // TODO
        },

        onClick: function() {
            this.destroy();
        },
    });

    var Collection = Backbone.Collection.extend({});

    var View = Mn.CollectionView.extend({
        template: $(html).filter('#board-thread-list')[0].outerHTML,
        childView: ItemView,

        initialize: function() {
            this.board = window.options.board;
        },

        onRender: function() {
            this.collection = new Collection();
            this.collection.url = window.location.origin + 
                '/api/get/' + this.board;
            this.collection.fetch();

            console.log(this.collection);
        },
    });

    return View;
})