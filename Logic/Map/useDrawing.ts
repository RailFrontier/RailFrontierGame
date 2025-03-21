import * as turf from "@turf/turf"; // Importamos Turf.js
import { listarCapasDelMapa } from "./utils/utils";
import { useMapStore } from "../../stores/useMapStore"; // Importar la tienda
import { useLineStore } from "../../stores/LinesStore";


export function useDrawing(map) {
    if (!map) {
        console.error("❌ Error: El objeto 'map' no está definido en useDrawing.");
        return;
    }

    const mapStore = useMapStore(); // Acceder a la tienda de Pinia
    const linesStore = useLineStore(); // Acceder a la tienda de líneas

    let drawing = false;
    let currentLineCoords = [];
    let lastMouseMove = 0;
    let tempPoint = null; // 🔥 Punto temporal para el mousemove
    let segmentos = []; // Almacena todos los segmentos dibujados
    let puntoIdCounter = 0; // Contador para IDs únicos

    function startDrawing(startCoords) {
        const StringToArray = mapStore.windows.createLine.preview.name.split(" ").join("");
        console.log(StringToArray);
        if (!startCoords) return;

        drawing = true;
        currentLineCoords = [startCoords]; // ✅ Fijar el primer punto en la estación
        tempPoint = startCoords; // Inicializar el punto temporal

        console.log("📍 Inicio en estación:", currentLineCoords);

        map.addSource(StringToArray, {
            type: "geojson",
            data: getGeoJson()
        });

        map.addLayer({
            id: StringToArray+"Layer",
            type: "line",
            source: StringToArray,
            paint: { "line-color": mapStore.windows.createLine.preview.color, "line-width": 3 }
        });

        map.on("mousemove", updateTemporaryLine);
        map.on("click", addPointToLine);
        window.addEventListener("keydown", confirmLineOnEnter);

        updateMap(); // 🔥 Renderizar inmediatamente la línea con el primer punto
    }

    function updateTemporaryLine(e) {
        if (!drawing) return;

        const now = performance.now();
        if (now - lastMouseMove < 30) return; // 🔥 Control de rendimiento
        lastMouseMove = now;

        requestAnimationFrame(() => {
            tempPoint = [e.lngLat.lng, e.lngLat.lat]; // Solo mover el punto temporal
            updateMap();
        });
    }

    function addPointToLine(e) {
        if (!drawing) return;

        const nuevoPunto = [e.lngLat.lng, e.lngLat.lat];
        const lineaId = mapStore.windows.createLine.preview.iconName; // ID de la línea (puedes pasarlo como parámetro)

        // Generar puntos densos para el nuevo segmento
        const start = currentLineCoords[currentLineCoords.length - 1]; // Último punto
        const end = nuevoPunto;
        const puntosDensos = generateDensePoints(start, end, lineaId, 100);

        // Guardar el segmento
        segmentos.push({
            puntos: puntosDensos,
            coordenadas: [start, end] // Coordenadas originales (opcional)
        });

        // Añadir el nuevo punto a la línea actual
        currentLineCoords.push(nuevoPunto);
        tempPoint = nuevoPunto; // Actualizar el punto temporal
        updateMap();
    }


    function addStationPointToLine(stationCords) {
        if (!drawing) return;

        const nuevoPunto = stationCords;
        const lineaId = mapStore.windows.createLine.preview.iconName; // ID de la línea (puedes pasarlo como parámetro)

        // Generar puntos densos para el nuevo segmento
        const start = currentLineCoords[currentLineCoords.length - 1]; // Último punto
        const end = nuevoPunto;
        const puntosDensos = generateDensePoints(start, end, lineaId, 100);

        // Guardar el segmento
        segmentos.push({
            puntos: puntosDensos,
            coordenadas: [start, end] // Coordenadas originales (opcional)
        });

        // Añadir el nuevo punto a la línea actual
        currentLineCoords.push(nuevoPunto);
        tempPoint = nuevoPunto; // Actualizar el punto temporal
        updateMap();
    }

    function generateDensePoints(start, end, lineaId, puntosPorSegmento = 100) {
        const puntos = [];
        const [lon1, lat1] = start;
        const [lon2, lat2] = end;

        for (let i = 0; i < puntosPorSegmento; i++) {
            const fraccion = i / (puntosPorSegmento - 1);
            const lon = lon1 + (lon2 - lon1) * fraccion;
            const lat = lat1 + (lat2 - lat1) * fraccion;

            puntos.push({
                type: "Feature",
                geometry: { type: "Point", coordinates: [lon, lat] },
                properties: {
                    id: `${lineaId}-${puntoIdCounter++}`, // ID único: R1-0, R1-1, R1-2...
                    linea: lineaId,
                    orden: i
                }
            });
        }
        return puntos;
    }

    function confirmLineOnEnter(e) {
        if (e.key === "Enter") {
            confirmLine();
        }
    }

    function confirmLine() {
        if (!drawing) return;
        const StringToArray = mapStore.windows.createLine.preview.name.split(" ").join("");

        drawing = false;
        console.log("✅ Línea finalizada. Segmentos:", segmentos);

        map.off("mousemove", updateTemporaryLine);
        map.off("click", addPointToLine);
        window.removeEventListener("keydown", confirmLineOnEnter);

        const line = {
            id: StringToArray+"Layer",
            name: mapStore.windows.createLine.preview.name,
            color: mapStore.windows.createLine.preview.color,
            logo: {
                shape: mapStore.windows.createLine.preview.shape,
                iconName: mapStore.windows.createLine.preview.iconName,
                color: mapStore.windows.createLine.preview.color,
            },
            Stations: mapStore.windows.createLine.stations,
            actualTrains: [],
        };

        linesStore.addLine(line);

        // No eliminar la capa ni la fuente para conservar la línea
        // map.removeLayer("drawingLineLayer");
        // map.removeSource("drawingLine");

        // Añadir listener para detectar clics en la línea
        map.on("click", handleLineClick);
        listarCapasDelMapa(map);
         // Llamar a lineCreationConfirmed desde la tienda
         mapStore.lineCreationConfirmed();
    }

    function handleLineClick(e) {
        const clickedPoint = [e.lngLat.lng, e.lngLat.lat];

        // Encontrar el segmento más cercano al punto clicado
        let segmentoCercano = null;
        let puntoCercano = null;
        let distanciaMinima = Infinity;

        for (const segmento of segmentos) {
            for (const punto of segmento.puntos) {
                const distancia = turf.distance(clickedPoint, punto.geometry.coordinates);
                if (distancia < distanciaMinima) {
                    distanciaMinima = distancia;
                    segmentoCercano = segmento;
                    puntoCercano = punto;
                }
            }
        }

        if (segmentoCercano && puntoCercano) {
            console.log("📍 Punto clicado:", puntoCercano);
            console.log("📏 Segmento más cercano:", segmentoCercano);
        }
    }

    function updateMap() {
        if (!map.getSource(mapStore.windows.createLine.preview.name.split(" ").join(""))) return;

        // Crear un GeoJSON con todos los segmentos y la línea temporal
        const features = segmentos.flatMap(segmento => segmento.puntos);

        // Añadir la línea temporal (último segmento en progreso)
        if (tempPoint) {
            features.push({
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: [...currentLineCoords, tempPoint]
                }
            });
        }

        map.getSource(mapStore.windows.createLine.preview.name.split(" ").join("")).setData({
            type: "FeatureCollection",
            features: features
        });
    }

    function getGeoJson() {
        return {
            type: "FeatureCollection",
            features: [{
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: [...currentLineCoords, tempPoint] // 🔥 Mantiene el punto temporal sin modificar el original
                }
            }]
        };
    }

    return { startDrawing, addStationPointToLine };
}
