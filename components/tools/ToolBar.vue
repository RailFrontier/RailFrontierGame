<script setup>
import { useMapStore } from "./stores/useMapStore";

const map = useMapStore();
</script>
<template>
    <div v-if="!map.focus" class="toolbar">
        <ul>
            <div class="option">
                <span>1</span>
                <li><img src="public/RailFrontier/train-track-svgrepo-com (1).svg" /></li>
            </div>
            <div class="option">
                <span>2</span>
                <li><img src="public/RailFrontier/train-fence-svgrepo-com.svg" /></li>
            </div>
            <div class="option" @click="map.toggleWindow('addStation')">
                <span>3</span>
                <li><img src="public/RailFrontier/station-svgrepo-com.svg" /></li>
            </div>
            <div class="option">
                <span>4</span>
                <li><img src="public/RailFrontier/garage-svgrepo-com (1).svg" /></li>
            </div>
            <div class="option">
                <span>5</span>
                <li><img src="public/RailFrontier/AB-Tunnel.svg" /></li>
            </div>
            <div class="option">
                <span>6</span>
                <li><img src="public/RailFrontier/bridge-svgrepo-com.svg" /></li>
            </div>
            <div class="option">
                <span>7</span>
                <li><img src="public/RailFrontier/Speed_Limit_blank_sign.svg" /></li>
            </div>
            <div class="option">
                <span>8</span>
                <li><img src="public/RailFrontier/sign-730-svgrepo-com.svg" /></li>
            </div>
        </ul>
    </div>
</template>
