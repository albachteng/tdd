import { Money, Dollar, Franc } from './index.ts';

describe("test Dollar", () => {

  it("times method multiplies dollar amounts correctly", () => {
    const five = Money.dollar(5);
    const ten = five.times(2);
    expect(ten).toEqual(Money.dollar(10));
    const fifteen = five.times(3);
    expect(fifteen).toEqual(Money.dollar(15));
  })

  it("equals method correctly evaluates equality", () =>{
    expect(Money.dollar(5)).toEqual(Money.dollar(5));
    expect(Money.dollar(5).equals(Money.dollar(5))).toBe(true);
    expect(Money.dollar(5).equals(Money.dollar(6))).toBe(false);
  })
})

describe("test Franc", () => {

  it("times method multiplies franc amounts correctly", () => {
    const five = Money.franc(5);
    const ten = five.times(2);
    expect(ten).toEqual(Money.franc(10));
    const fifteen = five.times(3);
    expect(fifteen).toEqual(Money.franc(15));
  })

  it("equals correctly evaluates equality", () =>{
    expect(Money.franc(5)).toEqual(Money.franc(5));
    expect(Money.franc(5).equals(Money.franc(5))).toBe(true);
    expect(Money.franc(5).equals(Money.franc(6))).toBe(false);
  })

})

describe("comparing dollars and francs", () => {
  it("does recognizes different currencies", () => {
    expect(Money.franc(5).equals(Money.dollar(5))).toBe(false);
  })
})

