type ButtonType = "operation" | "number";
type ButtonCallback = () => void;

export default class Button {
    type: ButtonType;
    elongated?: boolean = false;
    callback: ButtonCallback;
    symbol: string

    constructor({type, elongated = false, symbol, callback} : {type: ButtonType, elongated?: boolean, symbol: string, callback: ButtonCallback}) {
        this.type = type;
        this.elongated = elongated;
        this.callback = callback;
        this.symbol = symbol;
    }
}