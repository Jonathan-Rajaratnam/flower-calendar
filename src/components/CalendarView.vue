<template>
  <div class="calendar-container">
    <div class="calendar-controls">
      <button class="nav-button prev-button" @click="previousMonth">
        <span class="button-icon">❮</span>
      </button>
      <h2>{{ monthName }} {{ currentYear }}</h2>
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
import { getFlowersForMonth } from '../flowerData.js'
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
        { date: '2025-02-15', type: 'anniversary', label: 'Our Anniverary' },
        { date: '2025-01-04', type: 'birthday', label: "Nimi's Anniverary" },
        { date: '2025-04-01', type: 'birthday', label: "Jojo's Anniverary" },
      ],
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

      const monthFlowers = getFlowersForMonth(this.currentYear, this.currentMonth)

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
  },
  mounted() {
    this.generateCalendarDate()
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
  min-height: 100px;
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

.calendar-controls button {
  padding: 8px 16px;
  background-color: #f0f8ff;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.calendar-controls button:hover {
  background-color: #e6f2ff;
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
</style>
