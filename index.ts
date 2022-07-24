export abstract class Money {
  protected _amount: number;
  protected _currency: string;

  constructor(amount: number, currency: string) {
    this._amount = amount;
    this._currency = currency;
  }

  protected currency() {
    return this._currency;
  }

  protected equals(toCompare: Money): boolean {
    return (this._amount === toCompare._amount
      && this.currency() === toCompare.currency())
  }

  protected times(multiplier: number): Money {
    return new Money(this._amount * multiplier, this._currency);
  }

  protected plus(addend: number) {
    return new Money(this._amount + addend._amount, this._currency);
  }

  static dollar(amount: number, currency: string) {
    return new Money(amount, "USD");
  }

  static franc(amount: number, currency: string) {
    return new Money(amount, "CHF");
  }
}

