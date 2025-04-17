<template>
  <div class="calendar-container">
    <div class="calendar-controls">
      <button class="nav-button prev-button" @click="previousMonth">
        <span class="button-icon">❮</span>
      </button>
      <!-- <h2>{{ monthName }} {{ currentYear }}</h2>
      <button class="nav-button next-button" @click="nextMonth">
        <span class="button-icon">❯</span>
      </button> -->

      <div class="month-year-selector">
        <div class="current-date" @click="showDatePicker = !showDatePicker">
          <h2>{{ monthName }} {{ currentYear }}</h2>
          <span class="dropdown-icon">▼</span>
        </div>

        <div v-if="showDatePicker" class="date-picker-dropdown">
          <div class="year-selector">
            <button class="year-changer" @click="changeYear(-1)">←</button>
            <span>{{ currentYear }}</span>
            <button class="year-changer" @click="changeYear(1)">→</button>
          </div>

          <div class="month-grid">
            <div
              v-for="(month, index) in monthNames"
              :key="month"
              class="month-option"
              :class="{ selected: index === currentMonth }"
              @click="selectMonth(index)"
            >
              {{ month.substring(0, 3) }}
            </div>
          </div>
        </div>
      </div>

      <button class="nav-button next-button" @click="nextMonth">
        <span class="button-icon">❯</span>
      </button>
    </div>

    <div class="calendar-grid">
      <!-- Day headers-->
      <div
        v-for="(day, index) in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
        :key="`header-${index}`"
        class="day-header"
      >
        {{ day }}
      </div>

      <div
        v-for="(day, index) in days"
        :key="index"
        class="calendar-day"
        :class="{ 'empty-day': !day.day }"
      >
        <FlowerCard
          v-if="day.day"
          :day="day.day"
          :flowerName="day.flowerName"
          :flowerImage="day.flowerImage"
          :specialDate="day.specialDate"
          @flower-selected="showFlowerDetails(day)"
        />
        <template v-else>
          <!-- Empty cell for days not in this month -->
        </template>
      </div>
    </div>
    <FlowerDetail :flower="selectedFlower" @close="closeFlowerDetail" />
  </div>
</template>

<script>
import FlowerCard from './FlowerCard.vue'
import FlowerDetail from './FlowerDetail.vue'
import { getFlowersForMonth, getSeasonalFlowersForMonth } from '../flowerAssignemnt.js'
import '../assets/fonts.css'

export default {
  name: 'CalendarView',
  components: {
    FlowerCard,
    FlowerDetail,
  },
  data() {
    return {
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      days: [],
      monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      selectedFlower: null,
      specialDates: [
        // { date: '2025-02-15', type: 'anniversary', label: 'Our Anniverary' },
        { date: '2025-01-04', type: 'birthday', label: "Nimi's Bday" },
        { date: '2025-02-08', type: 'birthday', label: "Joe's Bday" },
      ],
      useSeasonalFlowers: true,

      showDatePicker: false,
    }
  },
  computed: {
    monthName() {
      return this.monthNames[this.currentMonth]
    },
  },
  methods: {
    generateCalendarDate() {
      this.days = []

      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate()

      let firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay()
      firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

      const monthFlowers = this.useSeasonalFlowers
        ? getSeasonalFlowersForMonth(this.currentYear, this.currentMonth)
        : getFlowersForMonth(this.currentYear, this.currentMonth)

      //const monthFlowers = getFlowersForMonth(this.currentYear, this.currentMonth)

      //Add empty slots for days from previous months
      for (let i = 0; i < firstDayOfMonth; i++) {
        this.days.push({
          day: null,
          hasFlower: false,
        })
      }
      //Add days of the current month
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

        const today = new Date()
        const isToday =
          today.getDate() === day &&
          today.getMonth() === this.currentMonth &&
          today.getFullYear() === this.currentYear

        const specialDate = this.specialDates.find((date) => date.date === dateStr)
        const flowerForDay = monthFlowers.find((flower) => flower.date === dateStr)
        this.days.push({
          day: day,
          hasFlower: !!flowerForDay,
          flowerName: flowerForDay ? flowerForDay.name : '',
          flowerImage: flowerForDay ? flowerForDay.image : '',
          date: dateStr,
          flower: flowerForDay,
          isToday: isToday,
          specialDate: specialDate,
        })
      }

      //Add empty slots for days from next months
      const totalDays = this.days.length
      const remainingSlots = 7 - (totalDays % 7)

      if (remainingSlots < 7) {
        for (let i = 0; i < remainingSlots; i++) {
          this.days.push({
            day: null,
            hasFlower: false,
          })
        }
      }
    },
    showFlowerDetails(dayInfo) {
      console.log('Showing flower details for:', dayInfo)
      if (dayInfo.flower) {
        this.selectedFlower = dayInfo.flower
      } else {
        this.selectedFlower = {
          name: 'No Flower Yet',
          date: dayInfo.date,
          description: 'This day does not have a flower assigned yet.',
        }
      }
    },
    previousMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11
        this.currentYear--
      } else {
        this.currentMonth--
      }
      this.generateCalendarDate()
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0
        this.currentYear++
      } else {
        this.currentMonth++
      }
      this.generateCalendarDate()
    },
    closeFlowerDetail() {
      this.selectedFlower = null
    },
    toggleAlgorithm() {
      console.log('Using seasonal flowers:', this.useSeasonalFlowers)
      this.generateCalendarDate()
    },
    handleKeyDown(e) {
      if (e.key === 'ArrowLeft') this.previousMonth()
      if (e.key === 'ArrowRight') this.nextMonth()
      if (e.key === 'Escape' && this.selectedFlower) this.closeFlowerDetail()
    },

    changeYear(delta) {
      this.currentYear += delta
      this.generateCalendarDate()
    },

    selectMonth(monthIndex) {
      this.currentMonth = monthIndex
      this.showDatePicker = false
      this.generateCalendarDate()
    },
  },
  mounted() {
    this.generateCalendarDate()
    window.addEventListener('keydown', this.handleKeyDown)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  },
}
</script>

<style scoped>
h2 {
  text-align: center;
  color: #f29ec8;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 4rem;
  font-family: 'Goodland Bold';
}
.calendar-container {
  max-width: 1200px;
  min-width: 1200px;
  max-height: 100%;
  margin: 0 auto;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  margin-top: 25px;
}

.day-header {
  font-family: 'Goodland Bold';
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  background-color: #f0f8ff;
  color: #fc94af;
  border-radius: 5px;
}

.calendar-day {
  min-height: 110px;
  min-width: 105px;
  border: 1px solid #ccc;
  padding: 0; /* Removed padding to allow flower card to fill the entire cell */
  position: relative;
  color: palevioletred;
  border-radius: 8px; /* Increased border radius for a softer look */
  overflow: hidden; /* Important for background images */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out;
}

.calendar-day:hover {
  transform: scale(1.02);
}

.empty-day {
  min-height: 110px;
  min-width: 105px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px dashed #e0e0e0;
}

.day-number {
  position: absolute;
  top: 5px;
  right: 5px;
  font-weight: bold;
}

.flower-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.calendar-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.button-icon {
  font-size: 1.5rem;
  color: #f29ec8;
}

.calendar-controls button {
  padding: 8px 16px;
  background-color: #f0f8ff;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar-controls button:hover {
  background-color: #e6f2ff;
}

.year-changer {
  font-size: 20px;
  color: #fc94af;
  font-family: 'Goodland Bold';
}

.calendar-day,
.flower-card,
.nav-button {
  transition: all 0.2s ease-in-out;
}

/* Month transition animation */
.calendar-grid {
  transition: opacity 0.5s ease;
}

.today {
  padding: 3px;
  box-shadow: 0 0 8px rgba(133, 134, 133, 0.4);
  border-radius: 4px;
}

.month-year-selector {
  position: relative;
}

.current-date {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.dropdown-icon {
  margin-left: 8px;
  font-size: 0.8rem;
  color: #f29ec8;
}

.date-picker-dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 16px;
  z-index: 100;
  margin-top: 8px;
  width: 300px;
}

.year-selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  color: #f29ec8;
  font-family: 'Goodland Bold';
  font-size: 1.5rem;
}

.year-selector button {
  background: #f0f8ff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
}

.month-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.month-option {
  text-align: center;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #f29ec8;
  font-family: 'Goodland Bold';
  font-size: 20px;
}

.month-option:hover {
  background-color: #f0f8ff;
}

.month-option.selected {
  background-color: #f29ec8;
  color: white;
}

@media (max-width: 768px) {
  .calendar-container {
    max-width: 100%;
    min-width: auto;
    padding: 10px;
  }
  .calendar-title {
    font-size: 2.7rem;
    margin-top: 10px;
  }

  .calendar-grid {
    gap: 5px;
  }

  .day-header {
    font-size: 1rem;
    padding: 5px;
  }

  .calendar-day {
    min-height: 80px;
    min-width: auto;
  }

  .empty-day {
    min-height: 80px;
    min-width: auto;
  }

  .calendar-controls {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .calendar-controls button {
    width: 35px;
    padding: 5px;
    height: 35px; /* Set explicit height */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .year-changer {
    font-size: 14px;
    color: #fc94af;
  }

  .button-icon {
    font-size: 1.3rem;
    margin-top: -4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h2 {
    font-size: 2.3rem;
    margin-bottom: 10px;
  }
}

/* Small mobile devices */
@media (max-width: 480px) {
  .calendar-title {
    font-size: 2rem;
  }

  .day-header {
    font-size: 0.8rem;
    padding: 3px;
  }

  .calendar-day {
    min-height: 60px;
  }

  .empty-day {
    min-height: 60px;
  }
}
</style>
