export function listarCapasDelMapa(map) {
    if (!map) {
        console.error("❌ Error: El objeto 'map' no está definido.");
        return;
    }

    // Obtener todas las capas del mapa
    const capas = map.getStyle().layers;

    // Mostrar los nombres de las capas en la consola
    console.log("📂 Capas en el mapa:");
    capas.forEach((capa, index) => {
        console.log(`${index + 1}. ${capa.id}`);
    });
}
