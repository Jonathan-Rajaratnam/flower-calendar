<template>
  <div class="flower-detail-overlay" v-if="flower" @click.self="close">
    <div class="flower-detail-card">
      <button class="close-button" @click="close">x</button>

      <div class="flower-image-container">
        <img v-if="flower.image" :src="flower.image" alt="Flower" class="flower-image" />
        <div v-else class="placeholder-image">🌸</div>
      </div>

      <h2 class="flower-title" :style="{ color: flowerColors.title }">{{ flower.name }}</h2>

      <div class="flower-date" :style="{ color: flowerColors.subtitle }">
        {{ formatDate(flower.date) }}
      </div>

      <div class="flower-description" :style="{ color: flowerColors.text }">
        {{ flower.description }}
      </div>

      <div class="flower-symbolism" v-if="flower.symbolism">
        <h3 :style="{ color: flowerColors.heading }">Symbolism</h3>
        <p :style="{ color: flowerColors.text }">{{ flower.symbolism }}</p>
      </div>

      <div class="special-message" v-if="flower.message">
        <h3 :style="{ color: flowerColors.heading }">Special Message</h3>
        <p :style="{ color: flowerColors.text }">{{ flower.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/fonts.css'

export default {
  name: 'FlowerDetail',
  props: {
    flower: {
      type: Object,
      default: null,
    },
  },
  computed: {
    flowerColors() {
      if (!this.flower) return {}

      const colorMap = {
        rose: {
          title: '#e91e63', // Pink
          heading: '#d81b60', // Darker pink
          subtitle: '#ec407a', // Lighter pink
          text: '#ad1457', // Deep pink
          background: '#fce4ec', // Very light pink
          border: '#f8bbd0', // Light pink border
        },
        tulip: {
          title: '#f44336', // Red
          heading: '#d32f2f', // Darker red
          subtitle: '#ef5350', // Lighter red
          text: '#b71c1c', // Deep red
          background: '#ffebee', // Very light red
          border: '#ffcdd2', // Light red border
        },
        daisy: {
          title: '#ffc107', // Amber/Yellow
          heading: '#ffa000', // Darker yellow
          subtitle: '#ffca28', // Lighter yellow
          text: '#ff8f00', // Deep amber
          background: '#fff8e1', // Very light yellow
          border: '#ffecb3', // Light yellow border
        },
        lily: {
          title: '#9c27b0', // Purple
          heading: '#8e24aa', // Darker purple
          subtitle: '#ab47bc', // Lighter purple
          text: '#7b1fa2', // Deep purple
          background: '#f3e5f5', // Very light purple
          border: '#e1bee7', // Light purple border
        },
        sunflower: {
          title: '#ff9800', // Orange
          heading: '#f57c00', // Darker orange
          subtitle: '#ff9800', // Orange
          text: '#e65100', // Deep orange
          background: '#fff3e0', // Very light orange
          border: '#ffe0b2', // Light orange border
        },
        orchid: {
          title: '#9575cd', // Light purple
          heading: '#7e57c2', // Medium purple
          subtitle: '#b39ddb', // Lighter purple
          text: '#5e35b1', // Deep violet
          background: '#ede7f6', // Very light purple
          border: '#d1c4e9', // Light purple border
        },
        default: {
          title: '#dd60b1', // Flowery pink
          heading: '#c2185b', // Deep pink
          subtitle: '#e57373', // Light red
          text: '#880e4f', // Very dark pink
          background: '#fce4ec', // Very light pink
          border: '#f8bbd0', // Light pink border
        },
      }

      const flowerLower = this.flower.name.toLowerCase()
      let palette = colorMap.default

      // Check if the flower name contains any of our key flowers
      Object.keys(colorMap).forEach((key) => {
        if (flowerLower.includes(key) && key !== 'default') {
          palette = colorMap[key]
        }
      })

      return palette
    },

    cardStyle() {
      return {
        backgroundColor: this.flowerColors.background,
        borderLeft: `5px solid ${this.flowerColors.border}`,
        borderRight: `5px solid ${this.flowerColors.border}`,
      }
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
  },
}
</script>

<style scoped>
.flower-detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  animation: fadeIn 0.3s ease;
}

.flower-detail-card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideIn 0.3s ease;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  font-family: 'National Park';
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.close-button {
  position: absolute;
  padding: 10px;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.close-button:hover {
  transform: scale(1.2);
}

.flower-image-container {
  text-align: center;
  margin-bottom: 20px;
}

.flower-image {
  margin-top: 30px;
  width: 450px;
  height: 300px;
  object-fit: fill;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.placeholder-image {
  font-size: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
}

.flower-title {
  margin-bottom: 5px;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.flower-date {
  margin-bottom: 15px;
  font-style: italic;
}

.flower-description {
  margin-bottom: 20px;
  line-height: 1.5;
  font-size: 20px;
}

h3 {
  margin-top: 16px;
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: bold;
}

p {
  font-size: 18px;
}

.flower-symbolism,
.special-message {
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.7);
  margin-bottom: 12px;
  font-size: 16px;
}

@media (max-width: 768px) {
  .flower-detail-card {
    padding: 15px;
    width: 95%;
  }

  .flower-title {
    font-size: 20px;
  }

  .flower-image {
    margin-top: 15px;
    width: 100%;
    height: auto;
    max-height: 250px;
  }

  h3 {
    font-size: 18px;
  }

  .close-button {
    top: 5px;
    right: 5px;
    font-size: 20px;
  }
}

/* Small mobile devices */
@media (max-width: 480px) {
  .flower-detail-card {
    padding: 10px;
    width: 98%;
  }

  .flower-title {
    font-size: 18px;
  }

  .flower-image {
    margin-top: 10px;
    max-height: 200px;
  }

  .flower-description {
    font-size: 14px;
  }
}
</style>
