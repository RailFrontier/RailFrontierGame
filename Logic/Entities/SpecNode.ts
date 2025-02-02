import {NodeT} from "./Node";
import {LInkedList} from "./TrackList";

export class specNode extends NodeT {
    typeT: string;
    connections: { linea: string, tramos: LInkedList }[] = [];
    constructor() {
        super();
        this.connections = []; // 🔹 Inicializar el array
    };

    runStationLine(line: string): specNode {
        const connection = this.connections.find(conn => conn.linea === line);

        if (connection == null) {
            return null;
        }

        // Obtener el último nodo de la lista de tramos
        let current = connection.tramos.head;

        while (current && current.next) {
            current = current.next; // Recorrer hasta el último nodo
        }

        // Verificar si el último nodo es una estación
        if (current instanceof specNode) {
            return current; // Retornar la siguiente estación
        } else {
            console.log("⚠️ El último nodo no es una estación.");
            return null;
        }
    }
}