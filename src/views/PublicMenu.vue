<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <h1 class="text-2xl font-bold mb-4">
      {{ business.name }} Menu
    </h1>

    <!-- Categories -->
    <div v-for="category in categories" :key="category.id" class="mb-6">
      <h2 class="text-lg font-semibold mb-2">
        {{ category.name }}
      </h2>

      <!-- Menu Items -->
      <div
        v-for="item in category.items"
        :key="item.id"
        class="bg-white p-3 rounded shadow mb-2 flex justify-between"
      >
        <div>
          <p class="font-medium">{{ item.name }}</p>
          <p class="text-sm text-gray-500">{{ item.description }}</p>
        </div>

        <div class="text-right">
          <p class="font-bold">{{ item.price }} ETB</p>
          <button
            class="text-sm bg-green-600 text-white px-3 py-1 rounded"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const slug = route.params.slug

const business = ref({})
const categories = ref([])

onMounted(async () => {
  const res = await api.get(`/public-menu/${slug}`)
  business.value = res.data.provider
  categories.value = res.data.categories
})
</script>
