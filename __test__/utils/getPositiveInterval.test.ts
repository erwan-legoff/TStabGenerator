import NoteOne from "../../src/notes/NoteOne"
import { getPositiveInterval } from "../../src/utils/getPositiveInterval"

describe('getPositiveInterval', () => {
  it('should return 2 if the root is 2 below ', () => {
    const root = new NoteOne(0)
    const note = new NoteOne(2)
    expect(getPositiveInterval(root, note)).toBe(2)
  })
  it('should return 10 if the root is 2 above ', () => {
    const root = new NoteOne(2)
    const note = new NoteOne(0)
    expect(getPositiveInterval(root, note)).toBe(10)
  })
  it('should return 0 if they are the same ', () => {
    const root = new NoteOne(0)
    const note = new NoteOne(0)
    expect(getPositiveInterval(root, note)).toBe(0)
  })
})