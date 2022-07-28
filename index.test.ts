import { Money, Sum, Bank, Expression} from './index.ts';

describe("money times method", () => {
  it("multiplies currency amounts correctly", () => {
    const five = Money.dollar(5);
    const ten = five.times(2);
    expect(ten).toEqual(Money.dollar(10));
    const fifteen = five.times(3);
    expect(fifteen).toEqual(Money.dollar(15));
  })
})

describe("money equals method", () => {
  it("correctly evaluates equality for the same currency", () =>{
    expect(Money.dollar(5)).toEqual(Money.dollar(5));
    expect(Money.dollar(5).equals(Money.dollar(5))).toBe(true);
    expect(Money.dollar(5).equals(Money.dollar(6))).toBe(false);
  })
  it("recognizes different currencies are not equivalent", () => {
    expect(Money.franc(5).equals(Money.dollar(5))).toBe(false);
  })
})

describe("money currency method", () => {
  it("returns the correct currency string for each type", () => {
    expect(Money.dollar(1).currency()).toEqual("USD");
    expect(Money.franc(1).currency()).toEqual("CHF");
  });
})

describe("money plus method", () => {
  // it("correctly adds like currency together", () => {
  //   expect(Money.dollar(5).plus(Money.dollar(5))).toEqual(Money.dollar(10));
  // })
  it("returns a sum", () => {
    const five = Money.dollar(5);
    const result = five.plus(five);
    expect(result.augend).toEqual(five);
    expect(result.addend).toEqual(five);
  })
})

describe("bank reduce method", () => {
  it("returns a reduced value in the correct currency", () => {
    const bank = new Bank();
    const five = Money.dollar(5);
    const sum = five.plus(five);
    const reduced = bank.reduce(sum, "USD");
    expect(reduced).toEqual(Money.dollar(10));
  })
  it("can reduce sums", () => {
    const sum = new Sum(Money.dollar(3), Money.dollar(4));
    const bank = new Bank();
    const result = bank.reduce(sum, "USD");
    expect(result).toEqual(Money.dollar(7));
  })
  it("can reduce a money of its own currency type", () => {
    const bank = new Bank();
    const result = bank.reduce(Money.dollar(1), "USD");
    expect(result).toEqual(Money.dollar(1));
  })
  it("can convert to dollars from francs", () => {
    const bank = new Bank();
    bank.addRate("CHF", "USD", 2);
    console.log(bank.rate("CHF", "USD"))
    const result = bank.reduce(Money.franc(2), "USD");
    expect(result).toEqual(Money.dollar(1));
  });
  it("sets rate to 1 as the identity rate", () => {
    expect(new Bank().rate("USD", "USD")).toEqual(1)
  })
  it("can add different currencies when given an exchange rate", () => {
    const fiveDollars: Expression = Money.dollar(5);
    const tenFrancs: Expression = Money.franc(10);
    const bank = new Bank();
    bank.addRate("CHF", "USD", 2);
    const result = bank.reduce(fiveDollars.plus(tenFrancs), "USD");
    // 10 francs / 2 = 5USD, therefore 5USD+5USD
    expect(result).toEqual(Money.dollar(10));
  })
})

describe("sum plus", () => {
  it("can add different currencies", () => {
    const fiveBucks: Expression = Money.dollar(5);
    const tenFrancs: Expression = Money.franc(10);
    const bank = new Bank();
    bank.addRate("CHF", "USD", 2);
    const sum = new Sum(fiveBucks, tenFrancs).plus(fiveBucks);
    const result = bank.reduce(sum, "USD");
    expect(result).toEqual(Money.dollar(15));
  })
})

describe("sum times", () => {
  it("can multiply differenty currencies", () => {
    const fiveBucks: Expression = Money.dollar(5);
    const tenFrancs: Expression = Money.franc(10);
    const bank = new Bank();
    bank.addRate("CHF", "USD", 2);
    const sum = new Sum(fiveBucks, tenFrancs).times(2);
    const result = bank.reduce(sum, "USD");
    expect(result).toEqual(Money.dollar(20));
  })
})

