<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-6 rounded-lg shadow space-y-4">

      <h2 class="text-xl font-bold text-center">
        {{ user.name }}
      </h2>

      <p><strong>Email:</strong> {{ user.email }}</p>

      <!-- Slug Link -->
      <p>
        <strong>Menu Link:</strong>
        <a
          :href="menuUrl"
          target="_blank"
          class="text-green-700 underline"
        >
          {{ menuUrl }}
        </a>
      </p>

      <!-- QR Code -->
      <div class="flex justify-center mt-4">
        <qrcode-vue
          :value="menuUrl"
          :size="180"
          level="H"
        />
      </div>

      <p class="text-center text-sm text-gray-500">
        Scan to view menu & order
      </p>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import QrcodeVue from 'qrcode.vue'

const authStore = useAuthStore()

const user = computed(() => authStore.user)

/**
 * Public menu URL using slug
 * Example: https://yourdomain.com/menu/wubshet-adane
 */
const menuUrl = computed(() => {
  return `${window.location.origin}/menu/${user.value.slug}`
})
</script>
