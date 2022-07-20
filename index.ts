export class Money {
  protected _amount: number;
  constructor(amount: number) {
    this._amount = amount;
  }

  protected times(multiplier: number): Dollar {
    return new Dollar(this._amount * multiplier);
  }
}

export class Dollar extends Money {
  constructor(amount: number) {
    super(amount);
  }

  public equals(toCompare: Dollar): boolean {
    return this._amount === toCompare._amount;
  }
}

export class Franc extends Money {
  constructor(amount: number) {
    super(amount);
  }

  public equals(toCompare: Franc): boolean {
    console.log(this._amount)
    return this._amount === toCompare._amount;
  }
}
