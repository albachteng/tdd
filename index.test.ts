import { Money } from './index.ts';

describe("test times", () => {

  it("multiplies currency amounts correctly", () => {
    const five = Money.dollar(5);
    const ten = five.times(2);
    expect(ten).toEqual(Money.dollar(10));
    const fifteen = five.times(3);
    expect(fifteen).toEqual(Money.dollar(15));
  })

})

describe("test equals", () => {
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

describe("test currency", () => {
  it("has the correct currency string for each type", () => {
    expect(Money.dollar(1).currency()).toEqual("USD");
    expect(Money.franc(1).currency()).toEqual("CHF");
  });
})

