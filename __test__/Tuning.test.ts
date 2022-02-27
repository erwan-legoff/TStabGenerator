import { StandardGuitarTuning } from "../src/tunings/StandardGuitarTuning"

describe("StandardGuitarTuning", () => {
  const tuning = new StandardGuitarTuning()
  it("should have the right string notes", () => {
    expect(tuning.getStringNote(0).getName()).toBe("E2")
    expect(tuning.getStringNote(1).getName()).toBe("A2")
    expect(tuning.getStringNote(2).getName()).toBe("D3")
    expect(tuning.getStringNote(3).getName()).toBe("G3")
    expect(tuning.getStringNote(4).getName()).toBe("B3")
    expect(tuning.getStringNote(5).getName()).toBe("E4")
  })
})