<template>
  <div>
    <title-setter title="הדף לא נמצא"></title-setter>
    <div class="not-found">
      <h1>נראה שהניגון שחיפשת לא נמצא...</h1>
      <p>אבל אולי תנגן אותו בעצמך?</p>
      <div class="piano" dir="ltr">
        <div class="octave" v-for="octave in octaves" :key="octave">
          <div v-for="key in keys" :key="key + octave" class="key" :data-note="key + octave" @mousedown="startTone(key + octave)" @mouseup="stopTone" @contextmenu.prevent></div>
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
  data() {
    return {
      octaves: ['4', '5', '6'],
      keys: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      audioContext: null
    };
  },
  methods: {
    startTone(note) {
      const notes = {
        'C4': 261.63, 'C#4': 277.18, 'D4': 293.66,
        'D#4': 311.13, 'E4': 329.63, 'F4': 349.23,
        'F#4': 369.99, 'G4': 392.0, 'G#4': 415.3,
        'A4': 440.0, 'A#4': 466.16, 'B4': 493.88,
        'C5': 523.25, 'C#5': 554.37, 'D5': 587.33,
        'D#5': 622.25, 'E5': 659.25, 'F5': 698.46,
        'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61,
        'A5': 880.0, 'A#5': 932.33, 'B5': 987.77,
        'C6': 1046.5, 'C#6': 1108.73, 'D6': 1174.66,
        'D#6': 1244.51, 'E6': 1318.51, 'F6': 1396.91,
        'F#6': 1479.98, 'G6': 1567.98, 'G#6': 1661.22,
        'A6': 1760.0, 'A#6': 1864.66, 'B6': 1975.53
      };

      const frequency = notes[note];
      // if (!frequency) return;

      this.audioContext ||= new (window.AudioContext || window.webkitAudioContext)();

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, this.audioContext.currentTime + 5);

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      oscillator.start();

      this.gainNode = gainNode;
      this.oscillator = oscillator;
    },
    stopTone() {
      if (this.gainNode) {
        this.gainNode.gain.exponentialRampToValueAtTime(0.00001, this.audioContext.currentTime + 1.5);
      }
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