import { Tab } from "./Tab";
import TabLine from "./TabLine";
import { TabLineGuitar } from "./TabLineGuitar";

class TabGuitar implements Tab{
  constructor(readonly name: string, private music: TabLineGuitar[]) { }
  getName(): string {
    return this.name
  }
  getMusic(): TabLine[] {
    return this.music
  }
}