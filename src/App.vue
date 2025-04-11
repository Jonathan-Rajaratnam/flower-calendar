<template>
  <div id="app">
    <!-- <div class="falling-flowers">
      <div v-for="n in 10" :key="n" class="flower" :style="randomFlower(n)">🌸</div>
      <div v-for="n in 8" :key="n + 10" class="flower" :style="randomFlower(n + 10)">🌹</div>
      <div v-for="n in 8" :key="n + 18" class="flower" :style="randomFlower(n + 18)">🌷</div>
    </div> -->
    <h1>Daily Flower</h1>
    <CalendarView />
  </div>
</template>

<script>
import CalendarView from './components/CalendarView.vue'

export default {
  name: 'App',
  components: {
    CalendarView,
  },
  methods: {
    randomFlower(n) {
      const size = 20 + Math.random() * 10
      const left = Math.random() * 100
      const animationDuration = 15 + Math.random() * 10
      const animationDelay = Math.random() * 15

      return {
        left: `${left}%`,
        fontSize: `${size}px`,
        animationDuration: `${animationDuration}s`,
        animationDelay: `${animationDelay}s`,
      }
    },
  },
}
</script>

<style>
/* Reset global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  width: 100%;
  background-color: #f7f7f7;
  font-family: 'Arial', sans-serif;
}

body {
  min-height: 100vh; /* Make sure body is at least full viewport height */
}

#app {
  min-height: 100vh; /* Make app container fill the viewport height */
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
  background-color: #f8d7d5; /* This should now extend the full height */
  display: flex;
  flex-direction: column;
}

.app-container {
  padding: 20px;
  background-color: #f8d7d5; /* Light coral background that matches your screenshot */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Enhance calendar component styles */
.calendar-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 900px;
}

h1 {
  text-align: center;
  color: #dd60b1;
  margin-bottom: 20px;
  font-size: 3rem;
}

.falling-flowers {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* So it doesn't interfere with clicking */
  z-index: 1;
  overflow: hidden;
}

.flower {
  position: absolute;
  top: -50px;
  animation: fall linear infinite;
  opacity: 0.7;
}

@keyframes fall {
  0% {
    transform: translateY(-20px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0.7;
  }
}
</style>
