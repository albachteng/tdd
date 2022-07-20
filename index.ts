export class Money { }

export class Dollar {
  constructor(amount: number) {
    this.amount = amount;
  }

  public times(multiplier: number): Dollar {
    return new Dollar(this.amount * multiplier);
  }

  public equals(toCompare: Dollar): boolean {
    return this.amount === toCompare.amount;
  }
}
