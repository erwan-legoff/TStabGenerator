import MidiNote from "./MidiNote";
import TabLine from "./TabLine";
import TabNote from "./TabNote";

export class TabLineGuitar extends TabLine {
  constructor(tonic: MidiNote, melody: MidiNote[]) {
    super(tonic, melody, 21)
  }

}