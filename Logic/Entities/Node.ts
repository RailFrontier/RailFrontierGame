export class NodeT {
    data: string;
    next: NodeT;
    coordinates: number[];
    id: string;
    geometry: { type: string };

    constructor() {
        this.geometry = { type: "" }; // Inicializar geometry
    }
}
