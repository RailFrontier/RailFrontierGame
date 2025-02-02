import {specNode} from "../Entities/SpecNode";

interface Route {
    name: string;
    start: specNode;
}

export const estaciones: specNode[] = [];

export const routes = {
    lines: [] as Route[]
}
