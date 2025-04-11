<template>
  <div
    class="flower-card"
    @click="showDetails"
    :class="{ 'special-date': specialDate, 'has-flower': flowerImage }"
    :style="flowerImage ? { backgroundImage: `url(${flowerImage})` } : {}"
  >
    <div class="card-content">
      <div class="day-number" :class="{ 'special-date-number': specialDate }">{{ day }}</div>

      <div v-if="specialDate" class="special-date-indicator">
        <span :class="specialDate.type">{{ specialDate.label }}</span>
      </div>

      <div v-if="!flowerImage" class="flower-placeholder">
        <span v-if="specialDate" class="special-flower-placeholder">
          {{ specialDate.type === 'anniversary' ? '💐' : '🎂' }}
        </span>
        <span v-else>🌸</span>
      </div>

      <div class="flower-name-container" v-if="flowerName">
        <div class="flower-name">{{ flowerName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlowerCard',
  props: {
    day: {
      type: Number,
      required: true,
    },
    flowerName: {
      type: String,
      default: '',
    },
    flowerImage: {
      type: String,
      default: '',
    },
    specialDate: {
      type: Object,
      default: null,
    },
  },
  methods: {
    showDetails() {
      this.$emit('flower-selected')
    },
  },
}
</script>

<style scoped>
.flower-card {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  background-size: cover;
  background-position: center;
}

.flower-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.has-flower {
  background-color: transparent;
}

/* Semi-transparent overlay to make text more readable */
.has-flower::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7); /* Adjust opacity as needed */
  z-index: 1;
  border-radius: inherit;
}

.card-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
}

.day-number {
  align-self: flex-end;
  font-weight: bold;
  padding: 2px 5px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 3px;
  min-width: 25px;
  text-align: center;
}

.flower-name-container {
  margin-top: auto;
  text-align: center;
  width: 100%;
  padding: 5px;
}

.flower-name {
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 4px;
  padding: 3px 5px;
  font-size: 12px;
  font-weight: bold;
  color: #dd60b1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: inline-block;
}

.flower-placeholder {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

.special-date {
  background-color: rgba(255, 192, 203, 0.2);
  box-shadow: 0 0 8px rgba(221, 96, 177, 0.4);
}

.special-date-number {
  color: #dd60b1;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.9);
}

.special-date-indicator {
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  padding: 2px;
  margin-top: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  align-self: center;
}

.anniversary {
  color: #e91e63;
}

.birthday {
  color: #9c27b0;
}

.special-flower-placeholder {
  font-size: 28px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
