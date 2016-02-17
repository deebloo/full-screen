(function () {

    expose('createFullScreen', register, factory);

    /**
     * Exposes the new component to the window or to a module
     *
     * @param {string} name - the factory name to expose
     * @param {function} definition - the definition of your web component. registers to the document
     * @param {function} factory - method for programmatically creating web component
     */
    function expose(name, definition, factory) {
        var Component = definition();

        if (typeof exports === 'object') {
            if (typeof module === 'object' && typeof module.exports === 'object') {
                module.exports = exposeFactory;
            }

            exports[name] = exposeFactory;

            return exposeFactory;
        }

        this[name] = exposeFactory;

        function exposeFactory(opts) {
            return factory(Component, opts);
        }

        return exposeFactory;
    }

    /**
     * Create and register component with the document
     */
    function register() {
        var fsProto = Object.create(HTMLElement.prototype);

        fsProto.createdCallback = function () {
            var targetAttr = this.getAttribute('target');

            if(targetAttr) {
                this.target = document.querySelector(this.getAttribute('target'));
            } else {
                this.target = document.body;
            }

            this.addEventListener('click', launchIntoFullscreen.bind(this));
        };

        fsProto.detachedCallback = function () {
            this.removeEventListener('click', launchIntoFullscreen);
        };

        // check which fullscreen api should be called
        function launchIntoFullscreen() {
            var el = this.target;

            if(el.requestFullscreen) {
                el.requestFullscreen();
            } else if(el.mozRequestFullScreen) {
                el.mozRequestFullScreen();
            } else if(el.webkitRequestFullscreen) {
                el.webkitRequestFullscreen();
            } else if(el.msRequestFullscreen) {
                el.msRequestFullscreen();
            }
        }

        return document.registerElement('full-screen', {
            prototype: fsProto
        });
    }

    /**
     * create a new instance of the registered component
     *
     * @param {function} Component - the registered component Constructor/class
     * @param {object} options - a map of attributes to attach to the new component instance
     *
     * @return {*}
     */
    function factory(Component, options) {
        var newEl = new Component();

        for(var option in options) {
            if(options.hasOwnProperty(option)) {
                newEl.setAttribute(option, options[option]);
            }
        }

        return newEl;
    }

})();
