// Sample flower data for testing
export const sampleFlowers = [
  {
    id: 1,
    date: '2025-04-01',
    name: 'Cherry Blossom',
    image:
      'https://images.unsplash.com/photo-1522383225653-ed111181a951?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description:
      'Cherry blossoms are the flowers of several trees of genus Prunus, particularly the Japanese cherry, Prunus serrulata.',
    symbolism: 'Symbolizes the fragility and beauty of life. Associated with renewal and spring.',
    message: 'Life is short but beautiful. Cherish each moment.',
  },
  {
    id: 2,
    date: '2025-04-02',
    name: 'Sunflower',
    image:
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description:
      'Sunflowers are known for their tall stems and bright yellow blooms that resemble the sun.',
    symbolism: 'Symbolizes adoration, loyalty and longevity.',
    message: 'Always turn your face to the sunshine.',
  },
  {
    id: 3,
    date: '2025-04-03',
    name: 'Lavender',
    image:
      'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description:
      'Lavender is a flowering plant in the mint family known for its beauty and sweet floral fragrance.',
    symbolism: 'Symbolizes purity, silence, devotion, serenity, grace, and calmness.',
    message: 'Find peace in the little moments.',
  },
  {
    id: 4,
    date: '2025-05-03',
    name: 'Lavender',
    image:
      'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description:
      'Lavender is a flowering plant in the mint family known for its beauty and sweet floral fragrance.',
    symbolism: 'Symbolizes purity, silence, devotion, serenity, grace, and calmness.',
    message: 'Find peace in the little moments.',
  },
  // Add more flowers as needed
]

// Function to get a flower by date
export function getFlowerByDate(dateString) {
  return sampleFlowers.find((flower) => flower.date === dateString)
}

// Function to get all flowers for a specific month
export function getFlowersForMonth(year, month) {
  // Month is 0-indexed (0 = January, 11 = December)
  const monthStr = (month + 1).toString().padStart(2, '0')
  const yearStr = year.toString()

  return sampleFlowers.filter((flower) => {
    if (!flower.date) return false
    return flower.date.startsWith(`${yearStr}-${monthStr}`)
  })
}
