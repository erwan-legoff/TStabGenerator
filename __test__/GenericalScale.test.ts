import NoteOne from '../src/notes/NoteOne'
import { ChromaticScale } from '../src/scales/ChromaticScale'
import { PentatonicScale } from '../src/scales/PentatonicScale'

describe('chromatic scale', () => {
  const Eroot = NoteOne.noteNameToNote('E4')
  const chromaticScale = new ChromaticScale()
  const chromaticResult = chromaticScale.getNotes(Eroot)
  const expectedChromaticResult = [
    NoteOne.noteNameToNote('E4'),
    NoteOne.noteNameToNote('F4'),
    NoteOne.noteNameToNote('F#4'),
    NoteOne.noteNameToNote('G4'),
    NoteOne.noteNameToNote('G#4'),
    NoteOne.noteNameToNote('A4'),
    NoteOne.noteNameToNote('A#4'),
    NoteOne.noteNameToNote('B4'),
    NoteOne.noteNameToNote('C5'),
    NoteOne.noteNameToNote('C#5'),
    NoteOne.noteNameToNote('D5'),
    NoteOne.noteNameToNote('D#5'),
  ]
  it('should have the good number of chromatic notes', () => {
    expect(chromaticResult).toHaveLength(12)
  })
  it('should have the good root', () => {
    expect(chromaticResult[0].getName()).toBe(Eroot.getName())
    expect(chromaticResult[0].getName()).toBe('E4')
  })
  it('should have the good seconde note', () => {
    expect(chromaticResult[1].getName()).toBe('F4')
  })

  it('should have all the same note', () => {
    expect(chromaticResult).toEqual(expectedChromaticResult)
  })
})


describe('pentatonic scale', () => {
  const Aroot = NoteOne.noteNameToNote('A4')
  const pentatonicScale = new PentatonicScale()
  const pentatonicResult = pentatonicScale.getNotes(Aroot)
  const expectedPentatonicResult = [
    NoteOne.noteNameToNote('A4'),
    NoteOne.noteNameToNote('C5'),
    NoteOne.noteNameToNote('D5'),
    NoteOne.noteNameToNote('E5'),
    NoteOne.noteNameToNote('G5'),
  ]
  it('should have the good number of pentatonic notes', () => {
    expect(pentatonicResult).toHaveLength(5)
  })
  it('should have the good root', () => {
    expect(pentatonicResult[0].getName()).toBe('A4')
  })
  it('should have all the good notes', () => {
    expect(pentatonicResult).toEqual(expectedPentatonicResult)
  })
})


describe('Get Next Note', () => {
  const Eroot = NoteOne.noteNameToNote('E4')
  const chromaticScale = new ChromaticScale()

  it('should have the F4 after the E4 (root)', () => {
    expect(chromaticScale.getNextNote(Eroot, Eroot).getName()).toBe('F4')
  })
  it('should have the F#4 after the F4', () => {
    expect(
      chromaticScale.getNextNote(NoteOne.noteNameToNote('F4'), Eroot).getName()
    ).toBe('F#4')
  })
})
