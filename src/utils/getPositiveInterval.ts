import NoteOne from '../notes/NoteOne'

export function getPositiveInterval(root: NoteOne, note: NoteOne): number {
  const primitiveRoot = root.getPrimitiveNumber()
  const primitiveNote = note.getPrimitiveNumber()

  if (primitiveNote >= primitiveRoot) return primitiveNote - primitiveRoot
  else return primitiveNote + 12 - primitiveRoot
}
