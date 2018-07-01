define([
    'text!templates/main.html',
    'marionette',
    'js/header',
    'js/board',
], function(html, Mn, Header, Board) {
    'use strict';

    /** Основная вьюха */
    var View = Mn.View.extend({
        el: '#app',
        template: $(html).filter('#main-template')[0].outerHTML,

        regions: {
            header: '#site-header',
            boards: '#site-header-boards',
            body: '#site-body',
            footer: '#site-footer',
        },

        initialize: function(options) {
            this.options = options;
        },

        onRender: function() {
            this.content = new Board();
            this.getRegion('body').show(this.content);
        },
    });

    return View;
})