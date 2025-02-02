import {NodeT} from "./Node";
import {specNode} from "./SpecNode";
import {estaciones} from "../Data/Estaciones";

export class LInkedList {
    head: NodeT;

    addNode(data: string): void {
        let node = new NodeT();
        node.data = data;

        if (this.head == null) {
            this.head = node;
        } else {
            let actualNode = this.head;
            while (actualNode.next != null) {
                actualNode = actualNode.next;
            }
            actualNode.next = node;
        }
    }

    addTypeNode(data: specNode): void {
        if (this.head == null) {
            this.head = data;
        } else {
            let actualNode = this.head;
            while (actualNode.next != null) {
                actualNode = actualNode.next;
            }
            if (actualNode instanceof specNode){
                console.log("This track has start and finish!!! create a new conexion!")
            } else {
                actualNode.next = data;
            }
        }

        estaciones.push(data);
    }

    showNodes(): void {
        let actualNode = this.head;
        while (actualNode.next != null) {
            console.log("Actual Node: "+actualNode.data);
            actualNode = actualNode.next;
        }
        console.log("Actual Node: "+actualNode.data);
    }

    showStations(): void {
        let actualNode = this.head;
        while (actualNode.next != null) {
            if (actualNode instanceof specNode) {
                console.log("Estación: " + actualNode.data);
            }
            actualNode = actualNode.next;
        }
        if (actualNode instanceof specNode) {
            console.log("Estación: " + actualNode.data);
        }
    }

    addFirst(data: string): void {
        let node = new NodeT();
        node.data = data;
        node.next = this.head;
        this.head = node;
    }

    reverse(): void {
        let prev: NodeT = null;
        let actual: NodeT = this.head;
        let next: NodeT = null;
        while (actual != null) {
            next = actual.next;
            actual.next = prev;
            prev = actual;
            actual = next;
        }
        this.head = prev
    }
}
