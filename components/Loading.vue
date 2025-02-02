<script setup>
import { useMapStore } from "./stores/useMapStore";
import { useMusicStore } from "#imports";
import { useAudioStore } from "#imports";


const map = useMapStore();
const music = useMusicStore();
const audio = useAudioStore();
const pass = ref(false);

onMounted(() => {
  setInterval(() => {
    map.loading = false;
  }, 200);
});

const handlePass = () => {
  pass.value = true;
  music.play();
  audio.play();
}
</script>
<template>
  <div class="loading" v-if="map.loading || !pass">
    <div>
      <img
      class="logo-loading"
        draggable="false"
        src="public/RailFrontier/Rodalies_de_Catalunya_símbol.svg"
        alt="Cargando..."
      />
      <div v-if="map.loading" class="spinner"></div>
      <button v-if="!map.loading" @click="handlePass"><img src="public/play_arrow_24dp_DBDCDC_FILL0_wght400_GRAD0_opsz24.svg" alt=""></button>
    </div>
    <div class="info">
      <img src="public/settings_24dp_ED242D_FILL0_wght400_GRAD0_opsz24.svg" alt="">
      <img src="public/info_24dp_ED242D_FILL0_wght400_GRAD0_opsz24.svg" alt="">
    </div>
    <p>Made with love in Barcelona by CoderAnchel</p>
  </div>
</template>
<style lang="scss" scoped>

</style>
