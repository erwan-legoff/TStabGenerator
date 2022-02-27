export class NoteOneSilence implements NoteOneInterface{
    public getName(): string {
        return 'silence'
    }
    public getMidi(): number {
        return -1
    }
}