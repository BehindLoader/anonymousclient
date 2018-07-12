define([
    'text!templates/main.html',
    'marionette',
    'js/menu'
], function(html, Mn, MenuView) {
    'use strict';

    var View = Mn.View.extend({
        template: $(html).filter('#main-template')[0].outerHTML,
        el: '#app',
        ui: {
            'left': '.left',
            'right': '.right',
            'center': '.center',

            'loading': '#loading',
        },
        regions: {
            'content': '#content',
        },

        history: [],

        initialize: function() {
            this.setTheme('darkTheme'); // TODO CSS BY COOKIE

            this.board = window.options.board;
            this.thread = window.options.thread;
            this.answer = window.options.answer;
        },

        onRender: function() {
            this.startLoading();
            if (this.answer) {

            } else if (this.thread) {

            } else if (this.board) {

            } else { // main menu
                this.view = new MenuView({
                    parent: this,
                });
            }
            this.getRegion('content').show(this.view);
        },

        setHeader: function(options) {

        },

        setView: function(view) {
            this.startLoading();

            this.history.push(this.view);
            this.view = view;
            this.getRegion('content').show(this.view);
        },

        // LOADING
        startLoading: function() {
            this.ui.loading.animate({ height: '50px' }, 300)
        },
        stopLoading: function() {
            this.ui.loading.animate({ height: '0px' }, 100)
        },

        // THEMES
        setTheme: function(theme) {
            $('body').removeClass();
            $('#app').removeClass();
            $('body').addClass(theme);
            $('#app').addClass(theme);
        },

        // COOKIES TODO
        /** creates cookies */
        createCookie: function(options) {
        },
        /** reads cookies */
        readCookie: function(options) {
        },
        /** deletes cookies */
        deleteCookies: function(options){
        },
    });

    return View;
});