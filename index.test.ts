import { Dollar, Franc } from './index.ts';

describe("test Dollar", () => {

  it("multiplies dollar amounts correctly", () => {
    const five = new Dollar(5);
    const ten = five.times(2);
    expect(ten).toEqual(new Dollar(10));
    const fifteen = five.times(3);
    expect(fifteen).toEqual(new Dollar(15));
  })

  it("correctly evaluates equality", () =>{
    expect(new Dollar(5)).toEqual(new Dollar(5));
    expect(new Dollar(5).equals(new Dollar(5))).toBe(true);
    expect(new Dollar(5).equals(new Dollar(6))).toBe(false);
  })
})

describe("test Franc", () => {

  it("multiplies franc amounts correctly", () => {
    const five = new Franc(5);
    const ten = five.times(2);
    expect(ten).toEqual(new Franc(10));
    const fifteen = five.times(3);
    expect(fifteen).toEqual(new Franc(15));
  })

  it("correctly evaluates equality", () =>{
    expect(new Franc(5)).toEqual(new Franc(5));
    expect(new Franc(5).equals(new Franc(5))).toBe(true);
    expect(new Franc(5).equals(new Franc(6))).toBe(false);
  })

})

