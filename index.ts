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
