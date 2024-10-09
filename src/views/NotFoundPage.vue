<template>
  <div>
    <title-setter title="הדף לא נמצא"></title-setter>
    <div class="not-found">
      <h1>הניגון שחיפשת לא נמצא...</h1>
      <p>אבל אולי תנגן אותו בעצמך?</p>
      <div class="piano" dir="ltr">
        <div class="octave" v-for="octave in octaves" :key="octave">
          <div v-for="key in keys" :key="key + octave" class="key" :data-note="key + octave" @mousedown="startTone(key, octave)" @mouseup="stopTone" @contextmenu.prevent></div>
        </div>
      </div>
      <router-link to="/">חזרה לדף הבית</router-link>
    </div>
  </div>
</template>

<script>
import TitleSetter from './TitleSetter.vue';

export default {
  components: {
    TitleSetter
  },
  data: () => ({
    octaves: ['4', '5', '6'],
    keys: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    audioContext: new (AudioContext || webkitAudioContext)()
  }),
  methods: {
    startTone(key, octave) {
      const freq = 27.5 * 2 ** ((this.keys.indexOf(key) - 9 + octave * 12) / 12);
      
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
      gain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, this.audioContext.currentTime + 5);

      osc.connect(gain).connect(this.audioContext.destination);
      osc.start();

      this.oscillator = osc;
      this.gainNode = gain;
    },
    stopTone() {
      this.gainNode?.gain.exponentialRampToValueAtTime(0.00001, this.audioContext.currentTime + 1.5);
    }
  }
};
</script>

<style scoped>
.not-found {
  text-align: center;
}

.not-found h1 {
  font-size: 3em;
  color: #333;
}

.not-found p {
  font-size: 1.5em;
  color: #666;
}

.piano {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 0;
}

.octave {
  display: flex;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
}

.key {
  width: 40px;
  height: 180px;
  margin: 0 -1px;
  border: 1px solid #333;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.2s;
}

.key[data-note*="#"] {
  background-color: #333;
  height: 120px;
  width: 25px;
  margin: 0 -13px;
  z-index: 1;
}

.key:active {
  background-color: #ddd;
}

.key[data-note*="#"]:active {
  background-color: #555;
}

.not-found a {
  display: inline-block;
  margin-top: 30px;
  padding: 10px 20px;
  background-color: #0066cc;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.2em;
  transition: background-color 0.3s ease;
}

.not-found a:hover {
  background-color: #004c99;
}
</style>