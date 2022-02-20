// Todo: Réfléchir à comment gérer les notes qui n'ont pas de temps (note tout court lol), ces notes étant une tonique ou autre, mais pas une note réellement jouée. Par contre la midiNote doit avoir une Note, un temps avant de sonner, ainsi qu'une durée.

// Todo: réfléchir au constructeur et comment on peut faire en sorte que le nom et la valeur midi soient concordantes.
// Todo: Si on veut partir du nom d'une note il faut le convertir en valeur midi et inversement.

import noteEngEnums from "./enums/noteEngEnums"

class Note {
  readonly name: string
  readonly midi: number

  constructor(name: string) {
    this.name = name
    this.midi = Note.noteNameToMidi(name)
  }
  /**
   * * A function to get the midi value from a note letter in string.
   * @param name the note name in string (eg. 'C', 'Ds')
   * @returns
   */
  private static noteLetterToMidiNumber(name: string): number {
    return noteEngEnums[name.toUpperCase() as keyof typeof noteEngEnums]
  }

  static noteNameToMidi(name: string): number {
    const octave = parseInt(name.slice(-1))
    const noteLetter = name.slice(0, -1).toUpperCase()
    return Note.noteLetterToMidiNumber(noteLetter) + 12 * (octave + 1)
  }
}