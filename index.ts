export class Bank {
  constructor() {}

  reduce(source: Expression, to: string): Money {
    return source.reduce(to);
  }
}

export interface Expression {
  reduce: (to: string) => Money
};

export abstract class Money implements Expression {
  private _amount: number;
  private _currency: string;

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
    return new Money(this._amount * multiplier, this.currency());
  }

  protected plus(addend: Money): Expression {
    return new Sum(this, addend);
  }

  protected reduce(to: string): Money {
    return this;
  }

  static dollar(amount: number): Money {
    return new Money(amount, "USD");
  }

  static franc(amount: number): Money {
    return new Money(amount, "CHF");
  }
}

export class Sum implements Expression {
  public augend: Money
  public addend: Money
  constructor(augend: Money, addend: Money) {
    this.augend = augend;
    this.addend = addend;
  }
  public reduce(to: string): Money {
    const amount = this.augend._amount + this.addend._amount;
    return new Money(amount, to);
  }
}
