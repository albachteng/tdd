export class Bank {
  private _rates: Map<string, number>;
  constructor() {
    this._rates = new Map<string, number>;
  }

  addRate(from: string, to: string, rate: number) {
    this._rates.set(from + to, rate);
    this._rates.set(to + from, 1/rate);
  }

  rate(from: string, to: string): number {
    if (from === to) return 1;
    return this._rates.get(from + to);
  }

  reduce(source: Expression, to: string): Money {
    return source.reduce(this, to);
  }
}

export interface Expression {
  reduce: (bank: Bank, to: string) => Money
  plus: (bank: Bank, to: string) => Expression
  times: (multiplier: number) => Expression
};

export abstract class Money implements Expression {
  private _amount: number;
  private _currency: string;

  constructor(amount: number, currency: string) {
    this._amount = amount;
    this._currency = currency;
  }

  protected currency(): string {
    return this._currency;
  }

  protected equals(toCompare: Money): boolean {
    return (this._amount === toCompare._amount
      && this.currency() === toCompare.currency())
  }

  public times(multiplier: number): Expression {
    return new Money(this._amount * multiplier, this.currency());
  }

  public plus(addend: Expression): Expression {
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
  public augend: Expression
  public addend: Expression

  constructor(augend: Expression, addend: Expression) {
    this.augend = augend;
    this.addend = addend;
  }

  public reduce(bank: Bank, to: string): Money {
    const amount = this.augend.reduce(bank, to)._amount + this.addend.reduce(bank, to)._amount;
    return new Money(amount, to);
  }

  public plus(addend: Expression): Expression {
    return new Sum(this, addend);
  }

  public times(multiplier: number): Expression {
    return new Sum(this.augend.times(multiplier), this.addend.times(multiplier));
  }
}

// class Pair {
//   private _from: string;
//   private _to: string;
//   constructor(from: string, to: string) {
//     this._from = from;
//     this._to = to;
//   }
//
//   public equals(compare: Pair): boolean {
//     return this._from === compare._from && this._to === compare._to;
//   }
//
//   public hashCode(): number {
//     return 0;
//   }
// }
