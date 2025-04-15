<template>
  <div
    class="flower-card"
    @click="showDetails"
    :class="{ 'special-date': specialDate, 'has-flower': flowerImage }"
    :style="flowerImage ? { backgroundImage: `url(${flowerImage})` } : {}"
  >
    <img
      v-if="flowerImage"
      :src="flowerImage"
      @error="handleImageError"
      style="display: none"
      alt=""
    />

    <div class="card-content">
      <!-- Special date indicator at the top -->
      <div v-if="specialDate" class="special-date-indicator">
        <span :class="specialDate.type">{{ specialDate.label }}</span>
      </div>

      <!-- Day number featured prominently in center -->
      <div class="day-number-center">
        {{ day }}
      </div>

      <!-- Flower name at bottom -->
      <div class="flower-name-container" v-if="flowerName">
        <div class="flower-name">{{ flowerName }}</div>
      </div>

      <!-- Default placeholder if no flower image -->
      <div v-if="!flowerImage" class="flower-placeholder">
        <span v-if="specialDate" class="special-flower-placeholder">
          {{ specialDate.type === 'anniversary' ? '💐' : '🎂' }}
        </span>
        <span v-else>🌸</span>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/fonts.css'
import '../assets/images'
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
  data() {
    return {
      imageLoadFailed: false,
      fallbackImages: [' ../assets/images/ixora.jpg'],
    }
  },
  computed: {
    displayImage() {
      if (!this.flowerImage || this.imageLoadFailed) {
        // If no image provided or loading failed, use fallback
        if (this.day && this.fallbackImages.length > 0) {
          // Use day number to select different fallback images if you have multiple
          const index = (this.day - 1) % this.fallbackImages.length
          return this.fallbackImages[index]
        }
        return '' // No fallback available
      }
      return this.flowerImage
    },
  },
  methods: {
    handleImageError() {
      console.log(`Failed to load image: ${this.flowerImage}`)
      this.imageLoadFailed = true
    },
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
  border-radius: 8px;
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
/* It makes the date and flower name more visible* */
.has-flower::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.225);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(2px);
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
  justify-content: space-between;
  align-items: center;
}

.day-number-center {
  font-size: 3.5rem;
  font-family: 'Goodland Bold';
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.flower-name-container {
  margin-top: auto;
  text-align: center;
  width: 100%;
  height: 55px;
  padding: 5px;
}

.flower-name {
  font-size: 19px;
  font-weight: bold;
  font-family: 'Goodland Bold';
  color: white;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.1;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  margin-top: 5px;
}

.flower-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  opacity: 0.3;
  z-index: 0;
}

.special-date {
  background-color: rgba(255, 192, 203, 0.2);
  box-shadow: 0 0 8px rgba(221, 96, 177, 0.4);
}

.special-date-indicator {
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  padding: 3px 6px;
  margin-top: 5px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  align-self: center;
  z-index: 3;
}

.anniversary {
  color: #e91e63;
}

.birthday {
  color: #9c27b0;
}

.special-flower-placeholder {
  font-size: 48px;
  animation: pulse 2s infinite;
}

@media (max-width: 768px) {
  .day-number-center {
    font-size: 2.5rem;
    width: 40px;
    height: 40px;
  }

  .flower-name {
    font-size: 16px;
    -webkit-line-clamp: 1; /* Show only 1 line on mobile */
  }

  .flower-name-container {
    height: 40px;
  }
}

/* Small mobile devices */
@media (max-width: 480px) {
  .day-number-center {
    font-size: 2rem;
    width: 35px;
    height: 35px;
  }
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
