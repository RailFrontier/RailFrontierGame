<script setup>
import LineComp from "./components/lines/LineComp.vue";
import Lines from "./components/lines/Lines.vue";
import ToolBar from "./components/tools/ToolBar.vue";
import Loading from "./components/Loading.vue";
import { useAudioStore } from "#imports";
import { test } from "./Logic/Utils/test";
import CreateStation from "./components/stations/CreateStation.vue";
import CreateLine from "./components/lines/CreateLine.vue";
import Station from "./components/stations/Station.vue";

useHead({
  title: "RailFrontier",
  meta: [
    {
      name: "description",
      content: "Mapa interactivo del metro de Barcelona",
    },
  ],
});

import Mapa from "./components/Mapa.vue";
import { useMapStore } from "./stores/useMapStore";

const map = useMapStore();
const audio = useAudioStore();

const handleClick = () => {
  map.is3D = !map.is3D;
};

const toggleDrawing = () => {
  map.toggleDrawing();

};

onMounted(() => {
  test();
});
</script>
<template>
  <div>
    <Loading />
    <img
      draggable="false"
      class="logo"
      src="public/RailFrontier/Rodalies_de_Catalunya_símbol.svg"
      alt="Logo del metro de Barcelona"
    />
    <div v-if="!map.focus" class="people">
      <img
        draggable="false"
        v-if="map.peopleState == 'happy'"
        src="public/sentiment_satisfied_24dp_73FF70_FILL0_wght400_GRAD0_opsz24.svg"
        alt=""
      />
      <img
        draggable="false"
        v-if="map.peopleState == 'angry'"
        src="public/sentiment_dissatisfied_24dp_ED1B2D_FILL0_wght400_GRAD0_opsz24.svg"
        alt=""
      />
      <span>546.268</span>
    </div>
    <div v-if="!map.focus" class="people2">
      <img
        draggable="false"
        v-if="map.peopleState == 'happy'"
        src="public/paid_24dp_B89230_FILL0_wght400_GRAD0_opsz24.svg"
        alt=""
      />
      <span>6.000.000€</span>
    </div>
    <div v-if="!map.focus" class="optionsPanel2">
      <img
        draggable="false"
        @click="map.togglePlaying"
        v-if="map.playing"
        src="public/play_arrow_24dp_DBDCDC_FILL0_wght400_GRAD0_opsz24.svg"
        alt=""
      />
      <img
        draggable="false"
        @click="map.togglePlaying"
        v-if="!map.playing"
        src="public/stop_24dp_DBDCDC_FILL0_wght400_GRAD0_opsz24.svg"
        alt=""
      />
      <img
        draggable="false"
        src="public/fast_forward_24dp_DBDCDC_FILL0_wght400_GRAD0_opsz24.svg"
        alt=""
      />
      <span style="border-right: 1px solid #4b4b4b">Dia 326</span>
      <span style="border-right: none; font-family: 'Space Grotesk'"
        >00:09:44</span
      >
    </div>
    <Lines v-if="!map.focus" />
    <Mapa />
    <div v-if="!map.focus" class="optionsPanel">
      <img
        draggable="false"
        src="public/visibility_24dp_262626_FILL0_wght400_GRAD0_opsz24.svg"
        alt=""
      />
      <img
        @click="toggleDrawing"
        draggable="false"
        src="public/construction_24dp_DBDCDC_FILL0_wght400_GRAD0_opsz24.svg"
        alt=""
      />
      <img
        @click="map.toggleWindow('lines')"
        draggable="false"
        src="public/signpost_24dp_DBDCDC_FILL0_wght400_GRAD0_opsz24.svg"
        alt=""
      />
      <img
        draggable="false"
        src="public/train_24dp_DBDCDC_FILL0_wght400_GRAD0_opsz24.svg"
        alt=""
      />
      <img
        draggable="false"
        src="public/RailFrontier/station-svgrepo-com.svg"
        alt=""
      />
      <img
        draggable="false"
        src="public/RailFrontier/contract_edit_24dp_DBDCDC_FILL0_wght400_GRAD0_opsz24.svg"
        alt=""
      />
      <img
        draggable="false"
        src="public/RailFrontier/finance_24dp_DBDCDC_FILL0_wght400_GRAD0_opsz24.svg"
        alt=""
      />
      <img
        draggable="false"
        src="public/RailFrontier/all_inbox_24dp_DBDCDC_FILL0_wght400_GRAD0_opsz24.svg"
        alt=""
      />
      <img
        @click="map.toggleMusicSettings"
        draggable="false"
        src="public/volume_up_24dp_DBDCDC_FILL0_wght400_GRAD0_opsz24.svg"
        alt=""
      />
      <img
        draggable="false"
        src="public/RailFrontier/settings_24dp_DBDCDC_FILL0_wght400_GRAD0_opsz24 (2).svg"
        alt=""
      />
    </div>
    <div class="d-container-3d">
      <button @click="handleClick">3D</button>
    </div>
    <AudioController v-if="map.musicSettings" />
    <ToolBar v-if="map.drawing.isDrawing" />
    <CreateStation v-if="!map.focus" />
    <Station />
    <CreateLine />

    <p class="tip" v-if="map.focus && !map.lineCreation">Click to add the new Station!</p>
    <p class="tip" v-if="map.focus && map.lineCreation">Click a Station to start drawing!</p>
  </div>
</template>
<style lang="scss">

.tip {
  position: fixed;
  bottom: 10px;
  left: 42.5%;
  color: #dbdcdc;
  font-weight: 400;
  font-style: normal;
  font-size: 0.7rem;
}

.logo {
  width: 50px;
  margin: 0 auto;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.toolbar {
  position: fixed;
  bottom: 30px;
  left: 32%;
  z-index: 1000;
  border-radius: 7px;

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;

    .option {
      display: flex;
      flex-direction: column;

      &:hover {
        cursor: pointer;
        transition: all 0.2s;
        transform: scale(1.1);
        z-index: 2000;
      }

      span {
        margin-bottom: 5px;
      }

      li {
        display: flex !important;
        align-items: center !important;
        justify-content: center;
        background: #141414;
        border: 1px solid #323232;
        height: 40px;
        width: 40px;

        &:hover {
          background: #262626;
        }

        img {
          width: 25px;
          margin-right: 50%;
        }
      }

      li::after {
        content: none;
        position: absolute;
      }
    }
  }
}

.d-container-3d {
  position: fixed;
  bottom: 50px;
  right: 7px;
  z-index: 1000;

  button {
    background: #262626;
    border: 1px solid #323232;
    color: #dbdcdc;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
    font-weight: 500;
    font-size: 1.2rem;

    &:hover {
      background: #323232;
    }
  }

  button:focus {
    outline: none;
  }

  button:active {
    transform: scale(0.95);
  }
}

.people {
  position: fixed;
  height: 45px;
  top: 10px;
  left: 266px;
  z-index: 1000;
  background: #262626;
  border: 1px solid #323232;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 5px;

  img {
    width: 18px;
    margin-right: 8px;
  }

  span {
    color: #dbdcdc;
    font-family: "Space Grotesk", serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-size: 0.9rem;
  }
}

.people2 {
  position: fixed;
  height: 45px;
  top: 10px;
  left: 373px;
  z-index: 1000;
  background: #262626;
  border: 1px solid #323232;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 5px;

  img {
    width: 18px;
    margin-right: 8px;
  }

  span {
    color: #dbdcdc;
    font-family: "Space Grotesk", serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-size: 0.9rem;
  }
}

.optionsPanel {
  position: fixed;
  bottom: 100px;
  right: 7px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  background: #262626;
  border: 1px solid #323232;
  justify-content: center;
  border-radius: 5px;

  img {
    width: 27px;
    border-bottom: 1px solid #4b4b4b;
    padding: 9px;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: #323232;
      cursor: pointer;
    }
  }
}

.optionsPanel2 {
  position: fixed;
  top: 10px;
  left: 7px;
  z-index: 1000;
  display: flex;
  background: #262626;
  border: 1px solid #323232;
  align-items: center;
  border-radius: 5px;
  width: 255px;

  img {
    width: 27px;
    padding: 9px;

    &:last-child {
      border-left: none;
    }

    &:hover {
      background: #323232;
      cursor: pointer;
    }
  }

  span {
    padding: 9px;
  }
}

.lineas {
  box-sizing: border-box;
  position: fixed;
  top: 60px;
  left: 7px;
  z-index: 1000;
  background: #262626;
  border: 1px solid #323232;
  border-radius: 5px;
  width: 245px;
  padding: 10px;
  width: 255px;

  .title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    img {
      width: 20px;
      padding: 0;
    }

    h3 {
      color: #dbdcdc;
      padding: 0;
      margin: 0;
      font-weight: 500;
      font-size: 1.1rem;
    }
  }

  .content {
    height: 320px;
    overflow-y: auto;
    padding-bottom: 10px;

    /* Custom scrollbar styles */
    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-track {
      background: #262626;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background: #4b4b4b;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #323232;
    }

    .linea {
      display: flex;
      align-items: center;
      padding: 7px 0;
      margin-bottom: 5px;
      border-radius: 5px;

      &:hover {
        background: #323232;
        cursor: pointer;
        transition: all 0.2s;

        span {
          color: #c2c2c2;

          img {
            transform: rotate(180deg);
          }
        }
      }

      img {
        width: 20px;
        padding: 0;
        margin-right: 10px;
      }

      span {
        color: #dbdcdc;
        padding: 0;
        margin: 0;
        font-weight: 400;
        font-size: 1rem;
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
    }
  }
}
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #141414, #1f1f1f);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 40000;

  .info {
    display: flex !important;
    flex-direction: row;
    position: fixed;
    top: 20px;
    right: 10px;
    z-index: 1000;

    img {
      width: 27px;
      padding: 0 3px;
      margin: 0 !important;

      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
    }
  }

  p {
    position: fixed;
    bottom: 10px;
    left: 42.5%;
    color: #dbdcdc;
    font-weight: 400;
    font-style: normal;
    font-size: 0.7rem;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 160px;
      margin-bottom: 10px;

      &:hover {
        cursor: pointer;
      }
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e02434;
      color: #dbdcdc;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      margin-top: 20px;
      border: 1px solid #000000;
      font-weight: bold;
      transition: all 0.3s ease;
      padding: 10px;

      img {
        width: 50px;
        margin: 0;
      }

      &:hover {
        color: #e02434;
        transform: scale(1.1);

        .logo-loading {
          rotate: 3600deg !important;
          transition: all 0.3s !important;
        }
      }

      &:active {
        transform: scale(0.95);
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
    }

    span {
      color: #dbdcdc;
      font-weight: 400;
      font-style: normal;
      font-size: 1.2rem;
      margin-top: 10px;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 3px solid #dbdcdc;
      border-top: 3px solid #262626;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-top: 10px;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}

.linea-content {
  font-family: Arial, sans-serif;
  max-width: 100%; /* Asegúrate de que no exceda el ancho del contenedor padre */
  margin: 0 auto;
  overflow-x: hidden; /* Oculta cualquier contenido que exceda el ancho horizontal */
  font-weight: 600 !important;
  font-size: 0.9rem !important;
  color: #c4c3c3;
}

ul {
  padding-left: 20px;
  width: 100%;
}

li {
  position: relative;
  padding-left: 25px;
  line-height: 2.5; /* Ajustar la distancia entre estaciones */
  list-style: none;
  width: 100%;
}

li .dot {
  position: absolute;
  left: 0;
  top: 50%;
  width: 10px;
  height: 10px;
  background-color: #e02434; /* Puedes cambiar el color */
  border-radius: 50%;
  transform: translateY(-50%); /* Centra el punto verticalmente */
}

/* Opcional, para crear una línea */
li::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: red; /* Igual que el color del punto */
  transform: translateY(10px); /* Ajusta según el espacio entre puntos */
}

.l2::after {
  background-color: #8e24aa;
}

.l2 .dot {
  background-color: #8e24aa;
}

.l3::after {
  background-color: #37aa3c;
}

.l3 .dot {
  background-color: #37aa3c;
}

.l4::after {
  background-color: #fcbf00;
}

.l4 .dot {
  background-color: #fcbf00;
}

.l5::after {
  background-color: #0177bc;
}

.l5 .dot {
  background-color: #0177bc;
}

.l9n::after {
  background-color: #df8d33;
}

.l9n .dot {
  background-color: #df8d33;
}

.l9s::after {
  background-color: #df8d33;
}

.l9s .dot {
  background-color: #df8d33;
}

.l10n::after {
  background-color: #31a8e0;
}

.l10n .dot {
  background-color: #31a8e0;
}

.l10s::after {
  background-color: #31a8e0;
}

.l10s .dot {
  background-color: #31a8e0;
}

.l11::after {
  background-color: #9ed84c;
}

.l11 .dot {
  background-color: #9ed84c;
}

.fm::after {
  background-color: #0c7557;
}

.fm .dot {
  background-color: #0c7557;
}
</style>
