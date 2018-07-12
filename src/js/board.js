define([
    'text!templates/board.html',
    'marionette'
], function(html, Mn) {
    'use strict';

    var ItemView = Mn.View.extend({
        tagName: 'table',
        className: 'item',
        template: $(html).filter('#thread-item')[0].outerHTML,
        ui: {
            'image': '.image div',
        },
        events: {
            'click': 'onClick',
        },
        onClick: function() {
            debugger
        },
        onRender: function() {
            this.ui.image.css({'background-image': 'url("/api/img' + this.model.get('files')[0].thumbnail + '")'});
        }
    });

    var View = Mn.CollectionView.extend({
        className: 'thread',
        childView: ItemView,

        onRender: function() {
            window.app.setHeader({
                left: {
                    content: 'Назад',
                    event: window.app.backward
                },
                center: {
                    content: this.model.get('name')
                }
            });

            this.collection = new Backbone.Collection();
            this.collection.url = window.location.origin + '/api/get/'
                    + this.model.get('id');
            this.collection.fetch({
                success: function(){
                    window.app.stopLoading();
                }
            })
        }
    });

    return View;
});