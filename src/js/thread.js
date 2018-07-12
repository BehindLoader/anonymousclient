define([
    'text!templates/thread.html',
    'marionette'
], function(html, Mn) {
    'use strict';

    var AttachItem = Mn.View.extend({
        template: $(html).filter('#thread-attach')[0].outerHTML,
    });

    var AttachCollection = Mn.CollectionView.extend({
        childView: AttachItem
    });

    var ItemView = Mn.View.extend({
        className: 'item',
        template: $(html).filter('#thread-item')[0].outerHTML,
        regions: {
            'attach': '.attach',
        },

        onRender: function() {
            if (this.model.get('files')) {
                var collection = new Backbone.Collection(this.model.get('files'));
                var attach = new AttachCollection({ collection: collection });
                this.getRegion('attach').show(attach);
            }
        }
    });

    var View = Mn.CollectionView.extend({
        className: 'message',
        childView: ItemView,

        onRender: function() {
            this.collection = new Backbone.Collection();
            this.collection.url = window.location.origin + '/api/get/' +
                window.options.board + '/' + this.model.attributes.num;
            this.collection.fetch({
                success: function() {
                    window.app.stopLoading();
                },
            })
        },
    });

    return View
})