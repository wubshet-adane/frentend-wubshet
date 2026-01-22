import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useMenuItemStore = defineStore('menuItem', () => {
  const menuItems = ref([])
  const businesses = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(1)
  const lastPage = ref(1)
  const total = ref(0)

  const fetchMenuItems = async (page = 1) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get(`/menu_items?page=${page}`)
      menuItems.value = response.data.menu_items
      currentPage.value = response.data.current_page
      lastPage.value = response.data.last_page
      total.value = response.data.total
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch menu items'
      throw err
    } finally {
      loading.value = false
    }
  }


  const createMenuItem = async (data) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.post('/menu_items/create', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      await fetchMenuItems(currentPage.value)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to create menu item'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateMenuItem = async (id, data) => {
    loading.value = true
    error.value = null
    try {
      data.append('_method', 'PUT')
      const response = await api.post(`/menu_items/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      await fetchMenuItems(currentPage.value)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update menu item'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteMenuItem = async (id) => {
    loading.value = true
    error.value = null
    try {
      await api.delete(`/menu_items/delete/${id}`)
      await fetchMenuItems(currentPage.value)
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete menu item'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    menuItems,
    businesses,
    loading,
    error,
    currentPage,
    lastPage,
    total,
    fetchMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
  }
})
