import { NoteInterface } from 'notes/NoteInterface'

export default class NoteAbc implements NoteInterface {
  private name: string
  private midi: number
  
  
  getName(): string {
    throw new Error('Method not implemented.')
  }
  getMidi(): number {
    throw new Error('Method not implemented.')
  }
}
