import { NoteInterface } from "notes/NoteInterface"

export class NoteOneSilence implements NoteInterface {
  public getName(): string {
    return 'silence'
  }
  public getMidi(): number {
    return -1
  }
}
