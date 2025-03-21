<script setup>
import LineComp from "./components/lines/LineComp.vue";
import { useMapStore } from "./stores/useMapStore";
import { VSwatches } from "vue3-swatches";
import "vue3-swatches/dist/style.css";
const map = useMapStore();

const lineas = [
  {
    url: "/TMB/L1_barcelona.svg",
  },
  {
    url: "/TMB/L2_barcelona.svg",
  },
  {
    url: "/TMB/L3_barcelona.svg",
  },
  {
    url: "/TMB/L4_barcelona.svg",
  },
  {
    url: "/TMB/L5_barcelona.svg",
  },
  {
    url: "/TMB/L9N_barcelona.svg",
  },
  {
    url: "/TMB/L9_Sud_barcelona.svg",
  },
  {
    url: "/TMB/L10_Nord_barcelona.svg",
  },
];
</script>
<template>
  <div v-if="map.windows.station.visible" class="lineas">
    <div class="title">

      <h3 style="margin-top: 0 !important">{{ map.windows.station.name  }}</h3>
    </div>
    <div class="image-wrapper"></div>
    <div class="content">
      <span>Lineas</span>
      <div class="line-wrapper">
        <img v-for="line in lineas" :src="line.url" :key="line" alt="" />
      </div>
      <div class="button-container">
        <button>Create Line</button>
        <button>Schedule</button>
        <button>Modify</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.lineas {
  padding: 0 !important;
}

.title {
  margin-top: 0 !important;
  border-bottom: 1px solid #323232;
  padding: 10px 20px;
  background: #1b1a1a;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-bottom: 0 !important;
}

.content {
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  margin-top: 5px;
}

.custom-swatches {
  margin-top: 20px;
  background: #262626;
}

h3 {
  margin-top: 10px !important;
  color: #dbdcdc;
  padding: 0;
  margin: 0;
  font-weight: 400;
  font-size: 1rem;
  font-family: Helvetica Neue, "Inter", Arial, Helvetica, sans-serif;
}
input {
  border: 1px solid #323232;
  background: #262626;
  border-radius: 5px;
  margin-top: 5px;
  outline: none;
  color: #dbdcdc;
  margin: 10px 0;
  font-size: 15px;
  padding: 5px;
}

button {
  background: #323232;
  border: 1px solid #323232;
  border-radius: 5px;
  color: #dbdcdc;
  padding: 5px 10px;
  margin-top: 10px;
  cursor: pointer;
  outline: none;
  font-family: Helvetica Neue, "Inter", Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 0.85rem;

  &:hover {
    background: #262626;
  }
}

.lineas {
  background: #262626;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 100;
  width: 240px;
  height: 370px;
}

.line-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

span {
  color: #dbdcdc !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
}

img {
  margin-top: 10px;
  width: 20px;
  height: 20px;
  margin-right: 5px;

  &:hover {
    cursor: pointer;
  }

  &:last-child {
    margin-right: 0;
  }
}

.button-container {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.button-container button {
  margin-top: 5px;
}

.button-container button:last-child {
  margin-bottom: 10px;
}

.button-container button:hover {
  background: #262626;
}

.image-wrapper {
  width: 100%;
  height: 120px;
    background-image: url("public/RailFrontier/pere-jurado-zbaUyml5QhU-unsplash.jpg");
    background-size: cover;
    background-position: center;
}


</style>
