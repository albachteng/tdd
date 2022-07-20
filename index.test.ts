import { Dollar } from './index.ts';

describe("money example", () => {
  it("tests run", () => {
    expect(true).toBe(true);
  });

  it("multiplies dollar amounts correctly", () => {
    const five = new Dollar(5);
    const ten = five.times(2);
    expect(ten.amount).toEqual(10);
    const fifteen = five.times(3);
    expect(fifteen.amount).toEqual(15);
  })

  it("correctly evaluates equality", () =>{
    expect(new Dollar(5)).toEqual(new Dollar(5));
    expect(new Dollar(5).equals(new Dollar(5))).toBe(true);
    expect(new Dollar(5).equals(new Dollar(6))).toBe(false);
  })
})
