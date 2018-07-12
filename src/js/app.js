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
        events: {
            'click @ui.left': 'leftClick',
            'click @ui.right': 'rightClick',
            'click @ui.center': 'centerClick',
        },

        history: [],
        headerEvents: {},

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
            if (options.left) {
                this.ui.left.text(options.left.content);
                this.headerEvents.left = options.left.event;
            }
            if (options.right) {
                this.ui.right.text(options.right.content);
                this.headerEvents.right = options.right.event;
            }
            if (options.center) {
                this.ui.center.text(options.center.content);
                this.headerEvents.center = options.center.event;
            }
        },

        setView: function(view) {
            this.startLoading();

            this.history.push(this.view);
            this.view = view;
            this.getRegion('content').show(this.view);
        },

        // CLICK EVENTS
        leftClick: function(){
            if (this.headerEvents.left) {
                this.headerEvents.left.apply(this);
            }
        },
        rightClick: function(){
            if (this.headerEvents.right) {
                this.headerEvents.right.apply(this);
            }
        },
        centerClick: function(){
            if (this.headerEvents.center) {
                this.headerEvents.center.apply(this);
            }
        },
        backward: function() {
            this.view.destroy();
            this.view = this.history.pop();
            // this.getRegion('content').show(this.view);
            this.render();
        },

        // LOADING
        startLoading: function() {
            this.ui.loading.animate({ height: '50px', opacity: 1 }, 300)
        },
        stopLoading: function() {
            this.ui.loading.animate({ height: '0px', opacity: 0 }, 100)
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