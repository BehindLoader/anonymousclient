define([
    'text!templates/board.html',
    'marionette',
    'js/thread'
], function(html, Mn, ThreadView) {
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
            var view = new ThreadView({ model: this.model });
            window.app.setView(view);
        },
        onRender: function() {
            this.ui.image.css({'background-image': 'url("/api/img' + this.model.get('files')[0].thumbnail + '")'});
        }
    });

    var View = Mn.CollectionView.extend({
        className: 'thread',
        childView: ItemView,

        onRender: function() {
            var this_ = this;
            window.app.setHeader({
                left: {
                    content: 'Назад',
                    event: window.app.backward
                },
                center: {
                    content: this.model.get('name')
                },
                right: {
                    content: 'Обновить',
                    event: function() {
                        window.app.startLoading();
                        this_.collection.fetch({
                            success: function() {
                                window.app.stopLoading();
                            }
                        })
                    }
                }
            });

            window.options.board = this.model.get('id');

            this.collection = new Backbone.Collection({ parent: this });
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