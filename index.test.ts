import { Money, Sum, Bank, Expression} from './index.ts';

describe("times method", () => {

  it("multiplies currency amounts correctly", () => {
    const five = Money.dollar(5);
    const ten = five.times(2);
    expect(ten).toEqual(Money.dollar(10));
    const fifteen = five.times(3);
    expect(fifteen).toEqual(Money.dollar(15));
  })

})

describe("equals method", () => {
  it("correctly evaluates equality for the same currency", () =>{
    expect(Money.dollar(5)).toEqual(Money.dollar(5));
    expect(Money.dollar(5).equals(Money.dollar(5))).toBe(true);
    expect(Money.dollar(5).equals(Money.dollar(6))).toBe(false);
  })
})

describe("comparing dollars and francs", () => {
  it("recognizes different currencies are not equivalent", () => {
    expect(Money.franc(5).equals(Money.dollar(5))).toBe(false);
  })
})

describe("currency method", () => {
  it("returns the correct currency string for each type", () => {
    expect(Money.dollar(1).currency()).toEqual("USD");
    expect(Money.franc(1).currency()).toEqual("CHF");
  });
})

describe("plus method", () => {
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
  it("reduce sum", () => {
    const sum = new Sum(Money.dollar(3), Money.dollar(4));
    const bank = new Bank();
    const result = bank.reduce(sum, "USD");
    expect(result).toEqual(Money.dollar(7));
  })
  it("reduce with money", () => {
    const bank = new Bank();
    const result = bank.reduce(Money.dollar(1), "USD");
    expect(result).toEqual(Money.dollar(1));
  })
  it("can convert francs from dollars", () => {
    const bank = new Bank();
    bank.addRate("CHF", "USD", 2);
    console.log(bank.rate("CHF", "USD"))
    const result = bank.reduce(Money.franc(2), "USD");
    expect(result).toEqual(Money.dollar(1));
  });
  it("sets rate to 1 as the identity rate", () => {
    expect(new Bank().rate("USD", "USD")).toEqual(1)
  })
})

describe("mixed rates", () => {
  it("can add different currencies when given an exchange rate", () => {
    const fiveDollars = Money.dollar(5);
    const tenFrancs = Money.franc(10);
    const bank = new Bank();
    bank.addRate("CHF", "USD", 2);
    const result = bank.reduce(fiveDollars.plus(tenFrancs), "USD");
    // 10 francs / 2 = 5USD, therefore 5USD+5USD
    expect(result).toEqual(Money.dollar(10));
  })
})
