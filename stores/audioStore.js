import { defineStore } from 'pinia';

export const useAudioStore = defineStore('audio', {
  state: () => ({
    audio: null, // Referencia al objeto Audio
    playlist: [
      { src: '/Subway.mp3', title: 'Sounds of Metro' },
    ], // Lista de canciones
    currentIndex: 0, // Índice de la canción actual
    isPlaying: false,
    volume: 0.5, // Volumen inicial (50%)
  }),

  actions: {
    // Inicia la reproducción
    play() {
      if (!this.audio) {
        this.audio = new Audio(this.playlist[this.currentIndex].src);
        this.audio.volume = this.volume;

        // Detecta cuando termina la canción
        this.audio.addEventListener('ended', this.next);
      }

      this.audio.play();
      this.isPlaying = true;
    },

    // Pausa la reproducción
    pause() {
      if (this.audio) {
        this.audio.pause();
        this.isPlaying = false;
      }
    },

    // Reproduce la siguiente canción
    next() {
      this.pause();
      this.currentIndex = (this.currentIndex + 1) % this.playlist.length; // Siguiente canción en bucle
      this.audio = new Audio(this.playlist[this.currentIndex].src);
      this.audio.volume = this.volume;
      this.play();
    },

    // Ajusta el volumen
    setVolume(newVolume) {
      this.volume = newVolume;
      if (this.audio) {
        this.audio.volume = this.volume;
      }
    },
  },
});
