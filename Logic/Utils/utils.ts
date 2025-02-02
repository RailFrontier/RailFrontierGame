import {specNode} from "../Entities/SpecNode";
import {estaciones} from "../Data/Estaciones";

export function runLine(line: string, startStation: specNode): void {
    let actual = startStation;
    console.log(startStation.data)
    while (true) {
        let nextStation = actual.runStationLine(line);
        if (nextStation != null) {
            console.log(nextStation.data)
            actual = nextStation;
        } else {
            console.log("END LINE 🔚");
            break;
        }
    }
}

export function showStations(): void {
    estaciones.forEach(estacion => {
        console.log(estacion.data);
    })
}
