<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-6">
            <RouterLink
              to="/"
              class="text-2xl font-bold text-green-600 transition-colors"
            >
              Wubshet Menu site
            </RouterLink>
            <nav v-if="authStore.user" class="flex items-center gap-2">
              <RouterLink
                to="/categories"
                class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Categories
              </RouterLink>
              
              <RouterLink
                to="/menu-items"
                class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Menu Items
              </RouterLink>
            </nav>
          </div>
          <ProfileDropdown v-if="authStore.user" />
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-b from-gray-50 to-white pt-20 pb-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-3xl md:text-3xl font-bold text-green-900 mb-6 tracking-tight">
            wubshet menu site Restaurant management platform
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            our restaurants hub
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              class="px-8 py-4 border border-green-900 text-green-900 hover:text-white font-semibold rounded-lg hover:bg-green-800 transition-colors duration-200 shadow-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-24 bg-gray-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-green-900 mb-4">Features of our platform</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your restaurant efficiently and delight your customers
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Menu Management -->
          <div class="p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-200">
            <h3 class="text-xl font-semibold text-green-900 mb-3">
              Restaurant management Dashboard
            </h3>
            <p class="text-gray-600 leading-relaxed">
              Create and manage comprehensive menus with categories, pricing, and beautiful images.
              Update your offerings in real-time.
            </p>
          </div>

          <!-- Online Ordering -->
          <div class="p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-200">
            <h3 class="text-xl font-semibold text-green-900 mb-3">Category Mnagement</h3>
            <p class="text-gray-600 leading-relaxed">Manage your menu categories</p>
          </div>

          <!-- QR Code Menus -->
          <div class="p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-200">
            <h3 class="text-xl font-semibold text-green-900 mb-3">
              QR Code Generate for your restaurants
            </h3>
            <p class="text-gray-600 leading-relaxed">
              Generate QR codes for your restaurant as all in one menu ordering for customers
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <!-- Brand -->
          <div class="col-span-1">
            <h3 class="text-xl font-bold text-white mb-4">Wubshet menu site</h3>
            <p class="text-gray-600 text-sm">.</p>
          </div>

          <!-- Product -->
        </div>

        <!-- Copyright -->
        <div class="pt-8 border-t border-gray-200">
          <p class="text-center text-sm text-gray-500">
            © 2026 wubshet menu site. developed by wubshet adane
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import ProfileDropdown from '@/components/ProfileDropdown.vue'

const authStore = useAuthStore()
</script>
