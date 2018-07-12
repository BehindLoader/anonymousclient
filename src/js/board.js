define([
    'marionette'
], function(Mn) {
    'use strict';

    var View = Mn.View.extend({
        template: '<b>123</b>',

        onRender: function() {
            window.app.stopLoading();
        }
    });

    return View;
});