<script setup>
import LineComp from "./components/lines/LineComp.vue";
import { useMapStore } from "./stores/useMapStore";
import { VSwatches } from 'vue3-swatches'
import 'vue3-swatches/dist/style.css'
const map = useMapStore();


</script>
<template>
    <div v-if="map.windows.addStation.visible" class="lineas">
      <div class="title">
        <img
          src="public/RailFrontier/station-svgrepo-com.svg"
          alt=""
          style="margin-right: 10px"
        />
        <h3 style="margin-top: 0 !important;">Create Station</h3>
      </div>
      <div class="content">
        <h3>Name</h3>
        <input type="text" v-model="map.windows.addStation.name"/>
        <h3>Color</h3>
        <VSwatches v-model="map.windows.addStation.color" class="custom-swatches"  />
        <button @click="map.startStationSelection()">Add</button>
      </div>
    </div>
</template>
<style lang="scss" scoped>
  .content {
    display: flex;
    flex-direction: column;
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
      font-family: "Roboto", sans-serif;
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
      width: 300px;
      height: 280px;
    }
</style>
