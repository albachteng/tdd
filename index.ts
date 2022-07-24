export class Bank {
  private _rates: Map<Pair, number>;
  constructor() {
    this._rates = new Map<Pair, number>;
  }

  addRate(from: string, to: string, rate: number) {
    return this._rates.set(new Pair(from, to), rate);
  }

  rate(from: string, to: string): number {
    return this._rates.get(new Pair(from, to));
  }

  rate(from: string, to: string) {
    return from === "CHF" && to === "USD" ? 2 : 1;
  }

  reduce(source: Expression, to: string): Money {
    return source.reduce(this, to);
  }
}

export interface Expression {
  reduce: (bank: Bank, to: string) => Money
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

  protected reduce(bank: Bank, to: string): Money {
    const rate = bank.rate(this.currency(), to);
    return new Money(this._amount / rate, to);
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

  public reduce(bank: Bank, to: string): Money {
    const amount = this.augend._amount + this.addend._amount;
    return new Money(amount, to);
  }
}

class Pair {
  private _from: string;
  private _to: string;
  constructor(from: string, to: string) {
    this._from = from;
    this._to = to;
  }

  public equals(compare: Pair): boolean {
    return this._from === compare._from && this._to === compare._to;
  }

  public hashCode(): number {
    return 0;
  }
}
