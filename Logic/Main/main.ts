import { estaciones } from '../Data/Estaciones';
import { specNode } from "../Entities/SpecNode";

export function addStation(coordinates: number[], name: string, estaciones: specNode[]): specNode {
    const Station: specNode = new specNode();

    Station.coordinates = coordinates;
    Station.data = name;
    Station.typeT = "ESTACION";
    Station.id = Station.data + estaciones.length.toString();
    Station.geometry.type = "Point";

    estaciones.push(Station);

    return Station;
}
