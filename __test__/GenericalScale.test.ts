import NoteOne from '../src/notes/noteOnes/NoteOne'
import { ChromaticScale, PentatonicScale } from '../src/scales/Scales'

describe('chromatic scale', () => {
  const E4 = NoteOne.noteNameToNote('E4')
  const chromaticScale = new ChromaticScale()
  const chromaticResult = chromaticScale.getNotes(E4, 12)
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
    expect(chromaticResult[0].getName()).toBe(E4.getName())
    expect(chromaticResult[0].getName()).toBe('E4')
  })
  it('should have the good seconde note', () => {
    expect(chromaticResult[1].getName()).toBe('F4')
  })

  it('should have all the same note', () => {
    expect(chromaticResult).toEqual(expectedChromaticResult)
  })

  it('should have an D5 note - another octave', () => {
    const C4 = NoteOne.noteNameToNote('C4')
    const C6 = NoteOne.noteNameToNote('C6')
    const chromaticResult = chromaticScale.getNotes(C4, 25)
    expect(chromaticResult[24].getName()).toBe(C6.getName())
  })
})

describe('pentatonic scale', () => {
  const Aroot = NoteOne.noteNameToNote('A4')
  const pentatonicScale = new PentatonicScale()
  const pentatonicResult = pentatonicScale.getNotes(Aroot, 5)
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
