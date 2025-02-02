<script setup>
import LineComp from "./components/lines/LineComp.vue";

import { useMapStore } from "./stores/useMapStore";

const map = useMapStore();
</script>
<template>
  <div v-if="map.windows.createLine.visible" class="lineas">
    <div class="content">
      <div class="preview">
        <div
          v-if="map.windows.createLine.preview.shape == 'square'"
          class="logo2-square"
          :style="{ backgroundColor: map.windows.createLine.preview.color }"
        >
          <span>{{ map.windows.createLine.preview.iconName }}</span>
        </div>
        <div
          v-if="map.windows.createLine.preview.shape == 'circle'"
          class="logo2-circle"
          :style="{ backgroundColor: map.windows.createLine.preview.color }"
        >
          <span>{{ map.windows.createLine.preview.iconName }}</span>
        </div>
        <span>{{ map.windows.createLine.preview.name }}</span>
      </div>
      <span>Name</span>
      <input
        type="text"
        v-model="map.windows.createLine.preview.name"
        maxlength="16"
      />
      <span>Short Icon Name</span>
      <input
        type="text"
        maxlength="3"
        v-model="map.windows.createLine.preview.iconName"
      />
      <span>Color</span>
      <VSwatches
        v-model="map.windows.createLine.preview.color"
        class="custom-swatches"
      />
      <span>Logo Shapes</span>
      <div class="shapes-container">
        <div @click="map.windows.createLine.preview.shape = 'square'"  class="square"></div>
        <div @click="map.windows.createLine.preview.shape = 'circle'" class="circle"></div>
        <div class="triangle"></div>
      </div>
    </div>
    <button @click="map.startLineCreation()">Select Station</button>
  </div>
</template>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;

  .preview {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .logo2-square {
      width: 50px;
      height: 50px;
      background: #262626;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;

      span {
        color: #dbdcdc;
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 8px;
      }
    }

    .logo2-circle {
      width: 50px;
      height: 50px;
      background: #262626;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;

      span {
        color: #dbdcdc;
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 8px;
      }
    }
  }

  span {
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
    width: 90%;
  }

  .shapes-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .square {
    width: 50px;
    height: 50px;
    background: #262626;
    border-radius: 5px;
    border: 1px solid #dbdcdc;

    &:hover {
      background: #323232;
      cursor: pointer;
    }
  }

  .circle {
    width: 50px;
    height: 50px;
    background: #262626;
    border-radius: 50%;
    border: 1px solid #dbdcdc;

    &:hover {
      background: #323232;
      cursor: pointer;
    }
  }

  .triangle {
    width: 0;
    height: 0;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
  }

  .custom-swatches {
    margin-top: 20px;
    background: #262626;
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
}

.title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  img {
    margin-right: 10px;
  }
  h2 {
    margin: 0;
    padding: 0;
    color: #dbdcdc;
    font-size: 1.1rem;
  }
}

button {
  background: #3c3c3c;
  color: #dbdcdc;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  width: 100%;
  font-size: 15px;
  font-weight: 600 !important;
  border: 1px solid #3c3c3c;

  &:hover {
    background: #262626;
    border: 1px solid #6b6b6b;
  }
}
</style>
