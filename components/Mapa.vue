<template>
  <div id="map" class="map-container crosshair-cursor"></div>
</template>
<script setup>
import { onMounted } from "vue";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import * as turf from "@turf/turf"; // Importamos Turf.js
import { useMapStore } from "./stores/useMapStore";
import { PARETS } from "~/Logic/Utils/test";
import { estaciones } from "~/Logic/Data/Estaciones";
import { addStation } from "~/Logic/Main/main";
import {
  l1OriginalGeoJSON,
  l2OriginalGeoJSON,
  l3OriginalGeoJSON,
  l4OriginalGeoJSON,
  l5OriginalGeoJSON,
  l9sOriginalGeoJSON,
  l9nOriginalGeoJSON,
  l10sOriginalGeoJSON,
  l11OriginalGeoJSON,
  l10nOriginalGeoJSON,
  fmOriginalGeoJSON,
} from "../data/BCN_METRO";
import { showStations } from "~/Logic/Utils/utils";
import { useDrawing } from "~/Logic/Map/useDrawing"; // Importar useDrawing

const mapStore = useMapStore();
const Stations = ref([]);

onMounted(() => {
  const map = new maplibregl.Map({
    container: "map", // Div ID
    style:
      "https://api.maptiler.com/maps/e48be39b-30a1-4f47-94a6-82c5813cd238/style.json?key=c3uFqreXO4BrhVJbY8ax", // Estilo del mapa
    center: [1.5209, 41.5912], // Coordenadas ajustadas para centrar en Cataluña
    zoom: 8, // Nivel de zoom ajustado para abarcar toda Cataluña
    pitch: 45,
    bearing: -17.6,
    attributionControl: false, // Desactivar la marca de agua
  });

  const { startDrawing } = useDrawing(map); // Extraer la función startDrawing

  map.getCanvas().style.cursor = "crosshair";

  // Función para procesar líneas
  function processLine(originalGeoJSON, lineColor, lineId, pointId) {
    const originalLine = turf.lineString(
      originalGeoJSON.features[0].geometry.coordinates
    );
    const smoothedLine = turf.bezierSpline(originalLine);

    const adjustedStations =
      originalGeoJSON.features[0].geometry.coordinates.map((coord) => {
        const point = turf.point(coord);
        const nearestPoint = turf.nearestPointOnLine(smoothedLine, point);
        return nearestPoint.geometry.coordinates;
      });

    const smoothedGeoJSON = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: smoothedLine.geometry,
          properties: originalGeoJSON.features[0].properties,
        },
      ],
    };

    const pointsGeoJSON = {
      type: "FeatureCollection",
      features: adjustedStations.map((coord, index) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: coord,
        },
        properties: {
          station: `Estación ${index + 1}`,
        },
      })),
    };

    map.addSource(`${lineId}-line`, {
      type: "geojson",
      data: smoothedGeoJSON,
    });

    map.addLayer({
      id: `${lineId}-line`,
      type: "line",
      source: `${lineId}-line`,
      paint: {
        "line-color": lineColor,
        "line-width": 3,
      },
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
    });

    map.addSource(`${pointId}-points`, {
      type: "geojson",
      data: pointsGeoJSON,
    });

    map.addLayer({
      id: `${pointId}-points`,
      type: "circle",
      source: `${pointId}-points`,
      paint: {
        "circle-radius": 6,
        "circle-color": "#FFFFFF",
        "circle-stroke-width": 2,
        "circle-stroke-color": lineColor,
      },
    });
  }

  map.on("load", () => {
    // Inicializar la fuente y capa de estaciones
    map.addSource("stations", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: Stations.value,
      },
    });

    map.addLayer({
      id: "stations",
      type: "circle",
      source: "stations",
      paint: {
        "circle-radius": 6,
        "circle-color": "#FFFFFF",
        "circle-stroke-width": 2,
        "circle-stroke-color": "#FF0000",
      },
    });

    function addPoint(Feature) {
      const feature = {
        type: "Feature",
        properties: {
          id: Feature.id,
          type: Feature.typeT,
          nombre: Feature.data,
          node: Feature,
        },
        geometry: {
          type: Feature.geometry.type,
          coordinates: Feature.coordinates,
        },
      };

      Stations.value.push(feature);
      console.log(Stations.value);
      showStations();
    }

    function addPointToMap() {
      addPoint(PARETS);
      updateMapWithStations();
    }

    function updateMapWithStations() {
      const mapSource = map.getSource("stations");
      if (mapSource) {
        mapSource.setData({
          type: "FeatureCollection",
          features: Stations.value,
        });
      } else {
        map.addSource("stations", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: Stations.value,
          },
        });

        map.addLayer({
          id: "stations",
          type: "circle",
          source: "stations",
          paint: {
            "circle-radius": 6,
            "circle-color": "#FFFFFF",
            "circle-stroke-width": 2,
            "circle-stroke-color": "#FF0000",
          },
        });
      }
    }

    addPointToMap();

    // Agregar evento de clic en la capa de estaciones
    map.on("click", "stations", (e) => {
      if (mapStore.lineCreation) {
        const feature = e.features?.[0];
        if (feature) {
          startDrawing(feature.geometry.coordinates);
        }
      } else {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["stations"],
        });

        if (features.length) {
          const node = features[0].properties.node;
          console.log(node);
          mapStore.playSound();
          mapStore.windows.station.name = features[0].properties.nombre;
          mapStore.toggleWindow("station");
        }
      }
    });

    // Cambiar el cursor a un puntero cuando el ratón pasa sobre los puntos
    map.on("mouseenter", "stations", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    // Volver a cambiar el cursor cuando el ratón sale de los puntos
    map.on("mouseleave", "stations", () => {
      map.getCanvas().style.cursor = "crosshair";
    });

    // Capturar clics en el mapa en modo de selección
    map.on("click", (e) => {
      if (mapStore.drawing.drawPoint) {
        const coordinates = e.lngLat.toArray();
        const newStation = addStation(
          coordinates,
          mapStore.windows.addStation.name,
          estaciones
        );
        addPoint(newStation);
        updateMapWithStations();
        mapStore.stationConfirmed();
      }
    });

    watch(
      () => mapStore.is3D,
      (newVal) => {
        if (newVal) {
          map.setPitch(45);
          map.setBearing(0);
          map.addSource("buildings", {
            type: "vector",
            url: "https://api.maptiler.com/tiles/v3/tiles.json?key=c3uFqreXO4BrhVJbY8ax",
          });

          // Añadir edificios en 3D
          map.addLayer({
            id: "3d-buildings",
            source: "buildings",
            "source-layer": "building", // Nombre de la capa dentro de la fuente
            type: "fill-extrusion",
            filter: ["!=", ["get", "hide_3d"], true],
            paint: {
              "fill-extrusion-color": "#303030", // Cambiado a un gris (puedes ajustar el código hexadecimal)
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                10,
                0,
                16,
                ["get", "render_height"],
              ],
              "fill-extrusion-base": 0,
              "fill-extrusion-opacity": 0.5, // Opacidad ajustada para un efecto más suave
            },
          });
        } else {
          map.setPitch(0);
          if (map.getLayer("3d-buildings")) {
            map.removeLayer("3d-buildings");
          }
          if (map.getSource("buildings")) {
            map.removeSource("buildings");
          }
        }
      },
      { immediate: true }
    );

    processLine(l1OriginalGeoJSON, "#FF0000", "l1", "l1");
    processLine(l2OriginalGeoJSON, "#90278e", "l2", "l2");
    processLine(l3OriginalGeoJSON, "#067634", "l3", "l3");
    processLine(l4OriginalGeoJSON, "#ffc10e", "l4", "l4");
    processLine(l5OriginalGeoJSON, "#006b9d", "l5", "l5");
    processLine(l9nOriginalGeoJSON, "#df8d33", "l9n", "l9n");
    processLine(l9sOriginalGeoJSON, "#df8d70", "l9s", "l9s");
    processLine(l10nOriginalGeoJSON, "#31b8e0", "l10n", "l10n");
    processLine(l10sOriginalGeoJSON, "#31a8e0", "l10s", "l10s");
    processLine(l11OriginalGeoJSON, "#9ed84c", "l11", "l11");
    processLine(fmOriginalGeoJSON, "#0c7557", "fm", "fm");
  });

  map.setMaxBounds([
    [0.15, 40.5], // Suroeste de Cataluña
    [3.32, 42.9], // Noreste de Cataluña
  ]);

  map.setMinZoom(7);
  map.setMaxZoom(16);
});
</script>

  <style scoped>
.map-container {
  width: 100%;
  height: 100vh; /* Altura completa de la ventana */
}
</style>
