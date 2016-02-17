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
            this.fsMethod = fullScreenMethod();
            this.setAttribute('available', !!this.fsMethod);

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

        // find which fullscreen method is available
        function fullScreenMethod() {
            var el = document.body;
            var method;

            if(el.requestFullscreen) {
                method = 'requestFullscreen'
            } else if(el.mozRequestFullScreen) {
                method = 'mozRequestFullScreen';
            } else if(el.webkitRequestFullscreen) {
                method = 'webkitRequestFullscreen';
            } else if(el.msRequestFullscreen) {
                method = 'msRequestFullscreen';
            }

            return method
        }

        // launch into full screen
        function launchIntoFullscreen() {
            this.target[this.fsMethod]();
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
