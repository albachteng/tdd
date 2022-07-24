export abstract class Money {
  protected _amount: number;
  constructor(amount: number) {
    this._amount = amount;
  }

  protected times(multiplier: number): Money {
    return new Dollar(this._amount * multiplier);
  }

  protected equals(toCompare: Money): boolean {
    return (this._amount === toCompare._amount
      // closest analogue to "getClass() in Java"
      && this.constructor.name === toCompare.constructor.name)
  }

  static dollar(amount: number) {
    return new Dollar(amount);
  }

  static franc(amount: number) {
    return new Franc(amount);
  }
}

export class Dollar extends Money {
  constructor(amount: number) {
    super(amount);
  }
}

export class Franc extends Money {
  constructor(amount: number) {
    super(amount);
  }
}
