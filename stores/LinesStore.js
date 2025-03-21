import { defineStore } from "pinia";

export const useLineStore = defineStore("lineStore", {
  state: () => ({
    lines: [
      {
        id: "l1",
        name: "Line 1",
        color: "#ed1b2d",
        logo: {
          shape: "square",
          iconName: "D1",
          color: "#ed1b2d",
        },
        Stations: [],
        actualTrains: [],
      },
    ],
    Stations: [],
  }),
  actions: {
    addLine(line) {
      this.lines.push(line);
    },
    addLineToStation(line, station) {
        console.log("test " + station);
        const Station = this.Stations.find((s) => s.properties.id === station);
        console.log(Station.lines);
        Station.lines.push(line);
    },
  },
});
