<template>
  <div class="audio-controller">
    <div style="display: flex;">
        <div style="margin-right: 5px;">
        <p class="text-xl">Effects Volumen: {{ Math.round(volume * 100) }}%</p>
        <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            v-model="volume"
            @input="updateVolume"
        />
        </div>
        <div>
        <p class="text-xl">Music Volumen: {{ Math.round(musicVolume * 100) }}%</p>
        <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            v-model="musicVolume"
            @input="updateMusicVolume"
        />
        </div>
    </div>
  </div>
</template>

  <script setup>
import { useAudioStore } from "#imports";
import { useMusicStore } from "#imports";

// Usamos el store
const audioStore = useAudioStore();
const musicStore = useMusicStore();

// Volume es reactivo y se sincroniza con el store
const volume = computed({
  get: () => audioStore.volume,
  set: (value) => audioStore.setVolume(value),
});

const musicVolume = computed({
  get: () => musicStore.volume,
  set: (value) => musicStore.setVolume(value),
});

// Métodos
const updateVolume = () => {
  audioStore.setVolume(volume.value);
};

const updateMusicVolume = () => {
  musicStore.setVolume(musicVolume.value);
};
</script>

  <style scoped>
.audio-controller {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #dbdcdc;
  position: fixed;
  bottom: 5px;
  left: 5px;
}

.audio-controller {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #dbdcdc;
  position: fixed;
  bottom: 10px;
  left: 10px;
}
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  background: #6d6d6d;
  border-radius: 5px;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}

input[type="range"]:hover {
  opacity: 1;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  background: #e02434;
  cursor: pointer;
  border-radius: 50%;
}

input[type="range"]::-moz-range-thumb {
  width: 10px;
  height: 10px;
  background: #e02434;
  cursor: pointer;
  border-radius: 50%;
}

p {
  margin: 0;
  padding: 0;
  font-size: 0.7rem;
  font-weight: 400;
  margin-bottom: 5px;
  font-weight: 500;
}
</style>
