module signals {

    export class Signal {

        private _listeners : Array<SignalHandler> = [];

        add(listener: () => void, self: any) {
            if(!this.hasListener(listener, self)) {
                this._listeners.push(new SignalHandler(listener, self));
            }
        }

        private hasListener(listener: () => void, self: any) : boolean {
            for(var i = 0; i < this._listeners.length; i++) {
                if(this._listeners[i].equals(listener, self)) {
                    return true;
                }
            }
            return false;
        }

        remove(listener: () => void, self: any) {
            for(var i = 0; i < this._listeners.length; i++) {
                if(this._listeners[i].equals(listener, self)) {
                    this._listeners.splice(i, 1);
                    break;
                }
            }
        }

        removeAll() {
            this._listeners.length = 0;
        }

        dispatch() {
            this._listeners.forEach(handler => handler.apply());
        }
    }

    class SignalHandler {

        private _handler : () => void;

        private _self : any;

        constructor(handler: () => void, self : any) {
            this._handler = handler;
            this._self = self;
        }

        apply() {
            this._handler.apply(this._self);
        }

        equals(handler: () => void, self : any) : boolean {
            return this._handler == handler && this._self == self;
        }
    }

}