<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-6">
            <RouterLink
              to="/"
              class="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors"
            >
              Wubshet Menu Site
            </RouterLink>
            <nav class="flex items-center gap-2">
              <RouterLink
                to="/categories"
                class="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg"
              >
                Categories
              </RouterLink>
              <RouterLink
                to="/restaurants"
                class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Restaurants
              </RouterLink>
              <RouterLink
                to="/menu-items"
                class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Menu Items
              </RouterLink>
            </nav>
          </div>
          <ProfileDropdown />
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Actions Bar -->
      <div class="mb-6 flex justify-between items-center">
        <div class="flex-1 max-w-md">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search categories..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <button
          @click="showCreateModal = true"
          class="text-green-600 px-4 py-2 border border-green-700 rounded-lg hover:text-green-700 flex items-center gap-2"
        >
          <PlusIcon class="w-5 h-5" />
          Add Category
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="categoryStore.isLoading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-900"
        ></div>
        <p class="mt-4 text-gray-600">Loading categories...</p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="categoryStore.error"
        class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"
      >
        {{ categoryStore.error }}
      </div>

      <!-- Empty State -->
      <div
        v-else-if="filteredCategories.length === 0"
        class="text-center py-12 bg-white rounded-lg border border-gray-200"
      >
        <FolderIcon class="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
        <p class="text-gray-600 mb-4">Get started by creating your first category</p>
        <button
          @click="showCreateModal = true"
          class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
        >
          Create Category
        </button>
      </div>

      <!-- Categories Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="category in filteredCategories"
          :key="category.id"
          class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div v-if="category.image" class="h-48 bg-gray-200 relative group">
            <img
              :src="getImageUrl(category.image)"
              :alt="category.name"
              class="w-full h-full object-cover"
              @error="handleImageError"
            />
            <button
              @click.stop="viewImage(category)"
              type="button"
              class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
            >
              <EyeIcon class="w-8 h-8 text-white" />
            </button>
          </div>
          <div v-else class="h-48 bg-gray-100 flex items-center justify-center">
            <PhotoIcon class="w-16 h-16 text-gray-400" />
          </div>

          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ category.name }}</h3>
            <p v-if="category.description" class="text-sm text-gray-600 mb-4 line-clamp-2">
              {{ category.description }}
            </p>

            <div class="flex gap-2">
              <button
                @click="editCategory(category)"
                class="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
              >
                <PencilIcon class="w-4 h-4" />
                Edit
              </button>
              <button
                @click="confirmDelete(category)"
                class="flex-1 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center justify-center gap-2"
              >
                <TrashIcon class="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div
        v-if="categoryStore.pagination.last_page > 1"
        class="mt-8 flex justify-center items-center gap-2"
      >
        <button
          @click="changePage(categoryStore.pagination.current_page - 1)"
          :disabled="categoryStore.pagination.current_page === 1"
          class="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Previous
        </button>
        <span class="px-4 py-2 text-gray-700">
          Page {{ categoryStore.pagination.current_page }} of
          {{ categoryStore.pagination.last_page }}
        </span>
        <button
          @click="changePage(categoryStore.pagination.current_page + 1)"
          :disabled="categoryStore.pagination.current_page === categoryStore.pagination.last_page"
          class="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </main>

    <!-- Create/Edit Modal -->
    <CategoryFormModal
      v-if="showCreateModal || showEditModal"
      :category="editingCategory"
      @close="closeModals"
      @success="handleSuccess"
    />

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      :is-open="showDeleteModal"
      title="Delete Category"
      message="Are you sure you want to delete this category? This action cannot be undone."
      @confirm="handleDelete"
      @cancel="showDeleteModal = false"
    />

    <!-- Image Preview Modal -->
    <Teleport to="body">
      <div
        v-if="viewingImage"
        class="fixed inset-0 z-[60] overflow-y-auto"
        @click.self="viewingImage = null"
      >
        <div class="flex min-h-screen items-center justify-center px-4">
          <div
            class="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
            @click="viewingImage = null"
          ></div>

          <div class="relative max-w-4xl w-full z-10" @click.stop>
            <button
              @click="viewingImage = null"
              type="button"
              class="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <XMarkIcon class="w-8 h-8" />
            </button>
            <img
              v-if="viewingImage.image"
              :src="getImageUrl(viewingImage.image)"
              :alt="viewingImage.name"
              class="w-full h-auto rounded-lg shadow-2xl"
            />
            <div class="mt-4 text-center">
              <h3 class="text-xl font-semibold text-white">{{ viewingImage.name }}</h3>
              <p v-if="viewingImage.description" class="text-gray-300 mt-2">
                {{ viewingImage.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCategoryStore } from '@/stores/category'
import CategoryFormModal from '@/components/CategoryFormModal.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import ProfileDropdown from '@/components/ProfileDropdown.vue'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PhotoIcon,
  FolderIcon,
  EyeIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

// Pinia store
const categoryStore = useCategoryStore()

// State
const searchQuery = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const editingCategory = ref(null)
const deletingCategory = ref(null)
const viewingImage = ref(null)

// Get full image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  return `http://127.0.0.1:8000/api/${imagePath}`
}

// Filtered categories for search
const filteredCategories = computed(() => {
  if (!searchQuery.value) return categoryStore.categories

  const query = searchQuery.value.toLowerCase()
  return categoryStore.categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(query) ||
      (cat.description && cat.description.toLowerCase().includes(query))
  )
})

// Pagination
const changePage = (page) => {
  categoryStore.fetchCategories(page)
}

// Modals
const editCategory = (category) => {
  editingCategory.value = category
  showEditModal.value = true
}

const confirmDelete = (category) => {
  deletingCategory.value = category
  showDeleteModal.value = true
}

const viewImage = (category) => {
  viewingImage.value = category
}

// Image error fallback
const handleImageError = (event) => {
  const img = event.target
  const currentSrc = img.src

  if (currentSrc.includes('http://127.0.0.1:8000/api') && !currentSrc.includes('/storage/')) {
    const imagePath = currentSrc.split('http://127.0.0.1:8000/api/')[1]
    img.src = `http://127.0.0.1:8000/api/storage/${imagePath}`
  } else if (currentSrc.includes('http://127.0.0.1:8000/api')) {
    const parts = currentSrc.split('.com/')
    if (parts[1]) {
      const imagePath = parts[1].replace('storage/', '')
      img.src = `http://127.0.0.1:8000/api/${imagePath}`
    }
  }
}

// Delete category
const handleDelete = async () => {
  if (!deletingCategory.value) return

  const result = await categoryStore.deleteCategory(deletingCategory.value.id)
  if (result.success) {
    showDeleteModal.value = false
    deletingCategory.value = null
  }
}

// Close create/edit modals
const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingCategory.value = null
}

// After successful create/update
const handleSuccess = () => {
  closeModals()
  categoryStore.fetchCategories(categoryStore.pagination.current_page)
}

// Fetch categories on mount
onMounted(() => {
  categoryStore.fetchCategories()
})
</script>
