<script setup>
import { useMapStore } from "./stores/useMapStore";

defineProps({
  line: String,
  name: String,
  img: String,
})

const map = useMapStore();
</script>
<template>
  <div @click="map.toggleWindowLine(line)" class="linea">
    <img :src="img" alt="" />
    <span
      >{{ name }}
      <img
        src="public/keyboard_arrow_down_24dp_DBDCDC_FILL0_wght400_GRAD0_opsz24.svg"
        alt=""
    /></span>
  </div>
</template>
