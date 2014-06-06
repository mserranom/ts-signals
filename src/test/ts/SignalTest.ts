///<reference path="../../../lib/jasmine-1.2.d.ts"/>
///<reference path="../../main/ts/Signal.ts"/>

class Handler {

    value : number = 0;

    public handle() {
        this.value = 7;
    }
}

describe("Signal Test", function() {

    var signal : signals.Signal;
    var handlerMock : Handler;

    beforeEach(function() {
        signal = new signals.Signal();
        handlerMock = jasmine.createSpyObj('handler', ['handle']);
        signal.add(handlerMock.handle, handlerMock);
    });

    afterEach(function() {
        signal = null;
        handlerMock = null;
    });

    it("handler should be called after dispatching the signal", function() {
        signal.dispatch();
        expect(handlerMock.handle).toHaveBeenCalled();
    });

    it("handler added once shouldn't be called more than once", function() {
        var onceSignal = new signals.Signal();
        var onceHandlerMock = jasmine.createSpyObj('handler', ['handle']);
        onceSignal.addOnce(onceHandlerMock.handle, onceHandlerMock);
        onceSignal.dispatch();
        onceSignal.dispatch();
        expect(onceHandlerMock.handle.callCount).toBe(1);
    });

    it("handler closure is resolved correctly", function() {
        var handler = new Handler();
        signal.add(handler.handle, handler);
        signal.dispatch();
        expect(handler.value).toBe(7);
    });

    it("signal should support more than 1 handler", function() {
        var handlerMock2 : Handler = jasmine.createSpyObj('handler', ['handle']);
        signal.add(handlerMock2.handle, handlerMock);
        signal.dispatch();
        expect(handlerMock.handle).toHaveBeenCalled();
        expect(handlerMock2.handle).toHaveBeenCalled();
    });

    it("handler shouldn't be called after removing it", function() {
        signal.remove(handlerMock.handle, handlerMock);
        signal.dispatch();
        expect(handlerMock.handle).not.toHaveBeenCalled();
    });

    it("remove() shouldn't have any effect when both arguments are not the same passed in add()", function() {
        signal.remove(handlerMock.handle, {});
        signal.dispatch();
        expect(handlerMock.handle).toHaveBeenCalled();
    });

    it("after calling remove() remaining handlers should be dispatched", function() {
        var handlerMock2 : Handler = jasmine.createSpyObj('handler', ['handle']);
        signal.add(handlerMock2.handle, handlerMock2);
        signal.remove(handlerMock.handle, handlerMock);
        signal.dispatch();
        expect(handlerMock.handle).not.toHaveBeenCalled();
        expect(handlerMock2.handle).toHaveBeenCalled();
    });

    it("after calling removeAll() all handlers shouldn't be dispatched", function() {
        var handler2 : Handler = jasmine.createSpyObj('handler', ['handle']);
        signal.add(handler2.handle, handlerMock);
        signal.removeAll();
        signal.dispatch();
        expect(handlerMock.handle).not.toHaveBeenCalled();
        expect(handler2.handle).not.toHaveBeenCalled();
    });

});
