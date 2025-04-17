import flowerLibrary from './flowerData.js'

export const sampleFlowers = []

function getFlowerForDate(year, month, day) {
  // Create a unique but deterministic seed from the date
  // Year isnt included so that flowers will be the same across years
  const dateSeed = month * 100 + day

  // Use the seed to select a flower from the library
  // This ensures the same flower is consistently assigned to the same date
  const flowerIndex = dateSeed % flowerLibrary.length

  // Deep clone the flower object to avoid modifying the original
  const flower = JSON.parse(JSON.stringify(flowerLibrary[flowerIndex]))

  // Format the date string consistently
  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  // Add the date to the flower object
  flower.date = dateStr
  flower.id = `${year}${String(month + 1).padStart(2, '0')}${String(day).padStart(2, '0')}`

  return flower
}

// This function gets all flowers for a specific month
export function getFlowersForMonth(year, month) {
  // First check if we have manually specified flowers for this month
  const monthStr = (month + 1).toString().padStart(2, '0')
  const yearStr = year.toString()

  // If you have a sampleFlowers array with manual overrides
  if (typeof sampleFlowers !== 'undefined') {
    const manualFlowers = sampleFlowers.filter((flower) => {
      if (!flower.date) return false
      return flower.date.startsWith(`${yearStr}-${monthStr}`)
    })

    // If we have some manual flowers for this month, return them
    if (manualFlowers.length > 0) {
      return manualFlowers
    }
  }

  // Otherwise, generate flowers for this month
  return generateFlowersForMonth(year, month)
}

// Generate flowers for a specific month using the deterministic algorithm
function generateFlowersForMonth(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const flowers = []

  // Generate a flower for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const flower = getFlowerForDate(year, month, day)
    flowers.push(flower)
  }

  return flowers
}

// Function to get a specific flower by date string (YYYY-MM-DD)
export function getFlowerByDate(dateString) {
  // First check if we have a manually specified flower for this date
  if (typeof sampleFlowers !== 'undefined') {
    const manualFlower = sampleFlowers.find((flower) => flower.date === dateString)
    if (manualFlower) return manualFlower
  }

  // If not, generate a flower
  if (!dateString) return null

  const [year, month, day] = dateString.split('-').map((num) => parseInt(num, 10))
  return getFlowerForDate(year, month - 1, day) // Adjust month to be 0-indexed
}

// Optional: Add seasonal weighting to favor certain flowers by season
export function getSeasonalFlowersForMonth(year, month) {
  // Define seasonal flower categories
  const seasons = {
    winter: ['Snowdrop', 'Holly', 'Winter Jasmine', 'Hellebore', 'Crocus', 'Camellia', 'Cyclamen'],
    spring: ['Daffodil', 'Tulip', 'Hyacinth', 'Cherry Blossom', 'Forsythia', 'Magnolia', 'Lilac'],
    summer: ['Rose', 'Lavender', 'Poppy', 'Iris', 'Sunflower', 'Dahlia', 'Lily', 'Geranium'],
    autumn: ['Chrysanthemum', 'Aster', 'Marigold', 'Cosmos', 'Dahlia', 'Zinnia'],
  }

  // Determine which season this month belongs to
  let currentSeason
  if ([11, 0, 1].includes(month))
    currentSeason = 'winter' // Dec-Feb
  else if ([2, 3, 4].includes(month))
    currentSeason = 'spring' // Mar-May
  else if ([5, 6, 7].includes(month))
    currentSeason = 'summer' // Jun-Aug
  else currentSeason = 'autumn' // Sep-Nov

  // Get standard flowers for the month
  const standardFlowers = generateFlowersForMonth(year, month)

  // Filter flowers to find seasonal matches based on name
  const seasonalFlowerNames = seasons[currentSeason]

  // Update flower information with seasonal data for debugging
  return standardFlowers.map((flower) => {
    // Create a new copy of the flower
    const newFlower = { ...flower }

    // Is this flower seasonally appropriate?
    const isSeasonalFlower = seasonalFlowerNames.some((seasonalName) =>
      flower.name.toLowerCase().includes(seasonalName.toLowerCase()),
    )

    // Add seasonal flag for debugging
    newFlower.isSeasonal = isSeasonalFlower
    newFlower.season = currentSeason

    return newFlower
  })
}

// Check for image loading issues
export function validateFlowerImages(monthFlowers) {
  // Return a promise that resolves when all images have been checked
  return Promise.all(
    monthFlowers.map((flower) => {
      return new Promise((resolve) => {
        if (!flower.image) {
          flower.imageError = true
          resolve(flower)
          return
        }

        // Create an image object to test loading
        const img = new Image()

        img.onload = () => {
          flower.imageError = false
          resolve(flower)
        }

        img.onerror = () => {
          console.warn(`Image failed to load: ${flower.image}`)
          flower.imageError = true
          flower.backupImage = '/images/flower-placeholder.jpg' // Fallback image path
          resolve(flower)
        }

        // Start loading the image
        img.src = flower.image
      })
    }),
  )
}
