///<reference path="../../../lib/jasmine-1.2.d.ts"/>
///<reference path="../../main/ts/Bindable.ts"/>

describe("Signal Test", function() {

    var TEST_STRING = "test_arg";
    var TEST_NUMBER = 321;

    it("constructor should set string value", function() {
        var bindable = new signals.Bindable<string>(TEST_STRING);
        expect(bindable.value).toBe(TEST_STRING);
    });

    it("constructor should set number value", function() {
        var bindable = new signals.Bindable<number>(TEST_NUMBER);
        expect(bindable.value).toBe(TEST_NUMBER);
    });

    it("setter should set string value", function() {
        var bindable = new signals.Bindable<string>();
        bindable.value = TEST_STRING;
        expect(bindable.value).toBe(TEST_STRING);
    });

    it("setter should set number value", function() {
        var bindable = new signals.Bindable<number>();
        bindable.value = TEST_NUMBER;
        expect(bindable.value).toBe(TEST_NUMBER);
    });

    it("bindTo() should set the value correctly in the target bindable after changing the source value", function() {
        var bindable = new signals.Bindable<number>(3465475);
        var bindableTarget = new signals.Bindable<number>(74435736);
        bindableTarget.bindTo(bindable);
        bindable.value = TEST_NUMBER;
        expect(bindableTarget.value).toBe(TEST_NUMBER);
    });

    it("bindTo() should set the value in the target value immediately", function() {
        var bindable = new signals.Bindable<number>(TEST_NUMBER);
        var bindableTarget = new signals.Bindable<number>(74435736);
        bindableTarget.bindTo(bindable);
        expect(bindableTarget.value).toBe(TEST_NUMBER);
    });

    it("unbind() should remove binding", function() {
        var bindable = new signals.Bindable<number>(TEST_NUMBER);
        var bindableTarget = new signals.Bindable<number>(74435736);
        bindableTarget.bindTo(bindable);
        bindableTarget.unbind(bindable);
        bindableTarget.value = 276876;
        bindable.value = TEST_NUMBER;
        expect(bindableTarget.value).not.toBe(TEST_NUMBER);
    });


});
