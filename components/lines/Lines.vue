<script setup>
import LineComp from "./components/lines/LineComp.vue";

import { useMapStore } from "./stores/useMapStore";

const map = useMapStore();
</script>
<template>
  <div v-if="map.windows.lines.visible" class="lineas">
    <div class="title">
      <img
        src="public/signpost_24dp_DBDCDC_FILL0_wght400_GRAD0_opsz24.svg"
        alt=""
      />
      <h3>Línies</h3>
    </div>
    <div class="content">
      <LineComp
        line="l1"
        name="Línia 1 metro (Vermella)"
        img="/TMB/L1_barcelona.svg"
      />

      <div v-if="map.windows.lines.windows.l1" class="linea-content">
        <ul>
          <li><span class="dot"></span> Hospital de Bellvitge</li>
        </ul>
      </div>

      <LineComp
        line="l2"
        name="Línia 2 metro (Lila)"
        img="/TMB/L2_barcelona.svg"
      />

      <div v-if="map.windows.lines.windows.l2" class="linea-content">
        <ul>
          <li class="l2"><span class="dot"></span> Hospital de Bellvitge</li>
        </ul>
      </div>

      <LineComp
        line="l3"
        name="Línia 3 metro (Verda)"
        img="/TMB/L3_barcelona.svg"
      />

      <div v-if="map.windows.lines.windows.l3" class="linea-content">
        <ul>
          <li class="l3"><span class="dot"></span> Hospital de Bellvitge</li>
        </ul>
      </div>

      <LineComp
        line="l4"
        name="Línia 4 metro (Groga)"
        img="/TMB/L4_barcelona.svg"
      />

      <div v-if="map.windows.lines.windows.l4" class="linea-content">
        <ul>
          <li class="l4"><span class="dot"></span> Hospital de Bellvitge</li>
        </ul>
      </div>

      <LineComp
        line="l5"
        name="Línia 5 metro (Blava)"
        img="/TMB/L5_barcelona.svg"
      />

      <div v-if="map.windows.lines.windows.l5" class="linea-content">
        <ul>
          <li class="l5"><span class="dot"></span> Hospital de Bellvitge</li>
        </ul>
      </div>

      <LineComp
        line="l9n"
        name="Línia 9 Nord metro"
        img="/TMB/L9N_Barcelona.svg"
      />

      <div v-if="map.windows.lines.windows.l9n" class="linea-content">
        <ul>
          <li class="l9n"><span class="dot"></span> Hospital de Bellvitge</li>
        </ul>
      </div>

      <LineComp
        line="l9s"
        name="Línia 9 Sud metro"
        img="/TMB/L9_Sud_Barcelona.svg"
      />

      <div v-if="map.windows.lines.windows.l9s" class="linea-content">
        <ul>
          <li class="l9s"><span class="dot"></span> Hospital de Bellvitge</li>
        </ul>
      </div>

      <LineComp
        line="l10n"
        name="Línia 10 Nord metro"
        img="/TMB/L10_Nord_barcelona.svg"
      />

      <div v-if="map.windows.lines.windows.l10n" class="linea-content">
        <ul>
          <li class="l10n"><span class="dot"></span> Hospital de Bellvitge</li>
        </ul>
      </div>

      <LineComp
        line="l10s"
        name="Línia 10 Sud metro"
        img="/TMB/L10_Sud_barcelona.svg"
      />

      <div v-if="map.windows.lines.windows.l10s" class="linea-content">
        <ul>
          <li class="l10s"><span class="dot"></span> Hospital de Bellvitge</li>
        </ul>
      </div>

      <LineComp line="l11" name="Línia 11 metro" img="/TMB/L11_barcelona.svg" />

      <div v-if="map.windows.lines.windows.l11" class="linea-content">
        <ul>
          <li class="l11"><span class="dot"></span> Hospital de Bellvitge</li>
        </ul>
      </div>

      <LineComp
        line="fm"
        name="Funicular de Montjuïc"
        img="/TMB/Fmontjuic.svg"
      />

      <div v-if="map.windows.lines.windows.fm" class="linea-content">
        <ul>
          <li class="fm"><span class="dot"></span> Hospital de Bellvitge</li>
        </ul>
      </div>
    </div>
    <button @click="map.toggleWindow('createLine')">Create Line</button>
  </div>
</template>
<style lang="scss" scoped>
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
