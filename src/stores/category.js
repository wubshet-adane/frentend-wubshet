import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([])
  const currentCategory = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0
  })

  const fetchCategories = async (page = 1) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await api.get(`/categories?page=${page}`)

      if (response.data.data) {
        categories.value = response.data.data
        if (response.data.meta) {
          pagination.value = response.data.meta
        } else if (response.data.current_page) {
          pagination.value = {
            current_page: response.data.current_page,
            last_page: response.data.last_page,
            per_page: response.data.per_page,
            total: response.data.total
          }
        }
      } else {
        categories.value = response.data
      }

      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch categories'
      return { success: false, message: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const createCategory = async (data) => {
    isLoading.value = true
    error.value = null

    try {
      const formData = new FormData()
      formData.append('name', data.name)
      if (data.description) formData.append('description', data.description)
      if (data.image instanceof File) formData.append('image', data.image)

      const response = await api.post('/categories/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      return { success: true, data: response.data }
    } catch (err) {
      const data = err.response?.data
      error.value = data?.message || 'Failed to create category'

      if (data?.errors) {
        return { success: false, errors: data.errors, message: error.value }
      }
      return { success: false, message: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const updateCategory = async (id, data) => {
    isLoading.value = true
    error.value = null

    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('_method', 'PUT')
      if (data.description) formData.append('description', data.description)
      if (data.image instanceof File) formData.append('image', data.image)

      const response = await api.post(`/categories/edit/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      return { success: true, data: response.data }
    } catch (err) {
      const data = err.response?.data
      error.value = data?.message || 'Failed to update category'

      if (data?.errors) {
        return { success: false, errors: data.errors, message: error.value }
      }
      return { success: false, message: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const deleteCategory = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      await api.delete(`/categories/delete/${id}`)
      categories.value = categories.value.filter(cat => cat.id !== id)
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete category'
      return { success: false, message: error.value }
    } finally {
      isLoading.value = false
    }
  }

  return {
    categories,
    currentCategory,
    isLoading,
    error,
    pagination,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  }
})
