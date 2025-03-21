import { defineStore } from "pinia";

export const useMapStore = defineStore("mapStore",{
    state: () => ({
        is3D: false,
        peopleState: "happy",
        playing: true,
        windows: {
            lines: {
                visible: true,
                windows: {
                    li: false,
                    l2: false,
                    l3: false,
                    l4: false,
                    l5: false,
                    l9n: false,
                    l9s: false,
                    l10n: false,
                    l10s: false,
                    l11: false,
                    fm: false,
                }
            },
            trains: {
                visible: false
            },
            addStation: {
                visible: false,
                color: "#1FBC9C",
                name: "",
            },
            createLine: {
                visible: false,
                preview: {
                    shape: "square",
                    color: "#ed1b2d",
                    name: "Default Line",
                    iconName: "D1",
                },
                stations: [],
            },
            station: {
                visible: false,
                name: "",
                node: null,
                lines: [],
            },
        },
        loading: true,
        lineCreation: false,
        musicSettings: false,
        drawing: {
            isDrawing: false,
            drawPoint: false,
        },
        focus: false,
    }),
    actions:{
        toggle3D(){
            this.is3D = !this.is3D;
        },
        togglePeopleState(){
            this.peopleState = this.peopleState === "happy" ? "sad" : "happy";
        },
        togglePlaying(){
            this.playing = !this.playing;
            this.playSound(); // Play sound when the window is toggled
        },
        toggleWindow(name) {
            for (const window in this.windows) {
            if (window === name) {
                this.windows[window].visible = !this.windows[window].visible;
                this.playSound(); // Play sound when the window is toggled
            } else {
                this.windows[window].visible = false;
            }
            }
        },
        playSound() {
            const audio = new Audio('/walkman-button-272973.mp3');
            audio.currentTime = 0.6; // Skip the first 500ms
            audio.play();
        },
        toggleWindowLine(name) {
            this.windows.lines.windows[name] = !this.windows.lines.windows[name];
        },
        toggleMusicSettings(){
            this.musicSettings = !this.musicSettings;
        },
        toggleDrawing() {
            this.drawing.isDrawing = !this.drawing.isDrawing;
            this.playSound(); // Play sound when the window is toggled
          },
        startStationSelection() {
            if(this.windows.addStation.color && this.windows.addStation.name){
                this.focus = true;
                this.drawing.drawPoint = true;
            } else {
                console.log("Please select a color and name for the station");
            }
        },
        startLineCreation() {
            this.lineCreation = true;
            this.toggleWindow("createLine");
            this.focus = true;
        },
        addStationToLine(station) {
            const exists = this.windows.createLine.stations.some(s => s.id === station.id);
            if (!exists) {
                this.windows.createLine.stations.push(station);
            }
        },
        lineCreationConfirmed() {
            this.lineCreation = false;
            this.windows.createLine.preview.color = "";
            this.windows.createLine.preview.name = "";
            this.windows.createLine.preview.iconName = "";
            this.toggleWindow("createLine");
            this.focus = false;
            this.windows.createLine.stations = [];
        },
        stationConfirmed() {
            this.focus = false;
            this.drawing.drawPoint = false;
            this.windows.addStation.name = "";
            this.toggleWindow("addStation");
        },
    }
});
