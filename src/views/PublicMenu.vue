<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center h-96">
      <svg
        class="animate-spin h-10 w-10 text-green-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center text-red-600 text-lg mt-10">
      {{ error }}
    </div>

    <!-- Business Not Found -->
    <div
      v-else-if="!business || Object.keys(business).length === 0"
      class="text-center text-gray-600 text-lg mt-10"
    >
      Business not found.
    </div>

    <!-- Menu -->
    <div v-else>
      <!-- Business Header -->
      <div class="bg-white shadow rounded-lg p-6 mb-6 flex items-center space-x-4">
        <img
          v-if="business.image"
          :src="business.image"
          alt="Business Image"
          class="w-24 h-24 object-cover rounded-lg"
        />
        <div>
          <h1 class="text-3xl font-bold text-green-700">Restaurant Name: {{ business.name }}</h1>
          <p class="text-gray-500">Email: {{ business.email || 'No email available' }}</p>
          <p class="mt-1 text-sm text-gray-400">Phone: {{ business.phone || 'Not specified' }}</p>
        </div>
      </div>

      <!-- Categories -->
      <div v-if="categories.length > 0">
        <div v-for="category in categories" :key="category.id" class="mb-8">
          <div class="flex items-center mb-3 space-x-3">
            <img
              v-if="category.image"
              :src="category.image"
              alt="Category Image"
              class="w-12 h-12 object-cover rounded-md border border-green-700"
            />
            <h2 class="text-xl font-semibold text-gray-800">{{ category.name }}</h2>
          </div>

          <div v-if="category.items && category.items.length > 0">
            <div
              v-for="item in category.items"
              :key="item.id"
              class="bg-white rounded-lg shadow max-w-100 p-4 gap-3 mb-3 flex justify-between items-center hover:shadow-lg transition-shadow"
            >
              <div class="flex items-center space-x-3">
                <img
                  v-if="item.photo"
                  :src="item.photo"
                  :alt="Item.photo"
                  class="w-16 h-16 object-cover rounded-md border border-gray-200"
                />
                <div>
                  <p class="font-medium text-gray-800">{{ item.item_name }}</p>
                  <p class="text-sm text-gray-500">Tax: {{ item.tax_percentage || 0 }}%</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-green-700">Total: {{ item.final_price }} ETB</p>
                <button
                  @click="orderItem(item)"
                  class="mt-1 text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition-colors"
                >
                  Order
                </button>
              </div>
            </div>
          </div>

          <!-- Category empty -->
          <p v-else class="text-gray-400 italic">No items available in this category.</p>
        </div>
      </div>

      <!-- No categories -->
      <p v-else class="text-gray-500 text-center italic mt-10">
        No categories found for this business.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const slug = route.params.serviceProviderSlug

const business = ref({})
const categories = ref([])
const loading = ref(false)
const error = ref('')

const fetchMenu = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await api.get(`/public-menu/${slug}`)
    if (!res.data || !res.data.provider) {
      error.value = 'Business not found'
    } else {
      business.value = res.data.provider
      categories.value = res.data.categories || []
    }
  } catch (e) {
    error.value = 'Failed to load menu. Please try again later.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMenu()
})

// Example order function
const orderItem = (item) => {
  alert(`You ordered: ${item.item_name}`)
}
</script>
