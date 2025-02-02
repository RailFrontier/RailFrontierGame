import {LInkedList} from "../Entities/TrackList";
import {specNode} from "../Entities/SpecNode";
import {estaciones, routes} from "../Data/Estaciones";
import {runLine, showStations} from "./utils";

export const PARETS = new specNode();
PARETS.typeT = "ESTACION";
PARETS.data = "Parets del Valles";
PARETS.id = "parets1";
PARETS.coordinates = [2.226140204107391, 41.55622948219521];
PARETS.geometry.type = "Point";

export function test(): void {
    const linkedList = new LInkedList();
    const linkedList2 = new LInkedList();
    const linkedList3 = new LInkedList();
    const parets = new specNode();
    parets.typeT = "ESTACION";
    parets.data = "Parets del Valles";

    const granollers = new specNode();
    granollers.typeT = "ESTACION";
    granollers.data = "Granollers";

    const vic = new specNode();
    vic.typeT = "VIC";
    vic.data = "VIC";

    const mollet = new specNode();
    mollet.typeT = "ESTACION";
    mollet.data = "Mollet del Valles";

    mollet.connections.push( {linea: "R3", tramos: linkedList} );
    parets.connections.push( {linea: "R2", tramos: linkedList2} );
    parets.connections.push( {linea: "R3", tramos: linkedList3} );
    routes.lines.push( { name: "R3", start: mollet } );
    routes.lines.push( { name: "R2", start: parets } );


    //R3 MOLLET PARETS
    linkedList.addNode("nodo1");
    linkedList.addNode("nodo2");
    linkedList.addNode("nodo3");
    linkedList.addNode("nodo4");
    linkedList.addNode("nodo5");
    linkedList.addNode("nodo6");
    linkedList.addNode("nodo7");
    linkedList.addNode("nodo8");
    linkedList.addNode("nodo9");
    //agrregamos estacion de conexion
    linkedList.addTypeNode(parets);

    //R3 PARETS GRANOLLERS
    linkedList3.addNode("nodo1");
    linkedList3.addNode("nodo2");
    linkedList3.addNode("nodo3");
    linkedList3.addNode("nodo4");
    linkedList3.addNode("nodo5");
    linkedList3.addNode("nodo6");
    linkedList3.addNode("nodo7");
    linkedList3.addNode("nodo8");
    linkedList3.addNode("nodo9");
    //agrregamos estacion de conexion
    linkedList3.addTypeNode(granollers);


    //R2 PARETS VIC
    linkedList2.addNode("nodo1");
    linkedList2.addNode("nodo2");
    linkedList2.addNode("nodo3");
    linkedList2.addNode("nodo4");
    linkedList2.addNode("nodo5");
    linkedList2.addNode("nodo6");
    linkedList2.addNode("nodo7");
    linkedList2.addNode("nodo8");
    linkedList2.addNode("nodo9");
    //agrregamos estacion de conexion
    linkedList2.addTypeNode(vic);

    runLine("R3", mollet);


    linkedList.showNodes();
    console.log("vamos a mostrar estaciones");
    linkedList.showStations();

    console.log("Estaciones deesde el apuntador global: ");
    console.log(estaciones);
}


