///<reference path="../../../lib/jasmine-1.2.d.ts"/>
///<reference path="../../main/ts/TypedSignal.ts"/>

class TypedHandler<T> {

    value : T;

    public handle(value : T) {
        this.value = value;
    }
}

describe("Typed Signal Test", function() {

    var TEST_VALUE = "test_arg";

    var signal : signals.TypedSignal<String>;
    var handlerMock : TypedHandler<string>;

    beforeEach(function() {
        signal = new signals.TypedSignal();
        handlerMock = jasmine.createSpyObj('handler', ['handle']);
        signal.add(handlerMock.handle, handlerMock);
    });

    afterEach(function() {
        signal = null;
        handlerMock = null;
    });

    it("handler should be called after dispatching the signal", function() {
        signal.dispatch(TEST_VALUE);
        expect(handlerMock.handle).toHaveBeenCalledWith(TEST_VALUE);
    });

    it("handler closure is resolved correctly", function() {
        var handler = new TypedHandler<String>();
        signal.add(handler.handle, handler);
        signal.dispatch(TEST_VALUE);
        expect(handler.value).toBe(TEST_VALUE);
    });

    it("signal supports more than 1 handler", function() {
        var handlerMock2 : TypedHandler<string> = jasmine.createSpyObj('handler', ['handle']);
        signal.add(handlerMock2.handle, handlerMock);
        signal.dispatch(TEST_VALUE);
        expect(handlerMock.handle).toHaveBeenCalledWith(TEST_VALUE);
        expect(handlerMock2.handle).toHaveBeenCalledWith(TEST_VALUE);
    });

    it("after calling remove() the handler is not called when dispatching the signal", function() {
        signal.remove(handlerMock.handle, handlerMock);
        signal.dispatch(TEST_VALUE);
        expect(handlerMock.handle).not.toHaveBeenCalled();
    });

    it("remove() has no effect when both arguments are not the same passed in add()", function() {
        signal.remove(handlerMock.handle, {});
        signal.dispatch(TEST_VALUE);
        expect(handlerMock.handle).toHaveBeenCalledWith(TEST_VALUE);
    });

    it("after calling remove() remaining handlers are called when dispatching the signal", function() {
        var handlerMock2 : TypedHandler<string> = jasmine.createSpyObj('handler', ['handle']);
        signal.add(handlerMock2.handle, handlerMock2);
        signal.remove(handlerMock.handle, handlerMock);
        signal.dispatch(TEST_VALUE);
        expect(handlerMock.handle).not.toHaveBeenCalled();
        expect(handlerMock2.handle).toHaveBeenCalledWith(TEST_VALUE);
    });

    it("after calling removeAll() all handlers are not called when dispatching the signal", function() {
        var handler2 : TypedHandler<string> = jasmine.createSpyObj('handler', ['handle']);
        signal.add(handler2.handle, handlerMock);
        signal.removeAll();
        signal.dispatch(TEST_VALUE);
        expect(handlerMock.handle).not.toHaveBeenCalled();
        expect(handler2.handle).not.toHaveBeenCalled();
    });

});
