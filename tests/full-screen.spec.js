describe('WebNotification', function () {
    window.createFullScreen = window.createFullScreen || function () {};

    var fullScreenElement;

    beforeEach(function () {
        fullScreenElement = createFullScreen({
            target: '#hello-world'
        });
    });

    it('created element should match string representation', function () {
        var expectedEl = '<full-screen available="true" target="#hello-world"></full-screen>';

        var fullScreenWrapper = document.createElement('div');
        fullScreenWrapper.appendChild(fullScreenElement);

        expect(fullScreenWrapper.innerHTML).toBe(expectedEl);
    });
});