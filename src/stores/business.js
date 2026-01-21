import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useBusinessStore = defineStore('business', () => {
  const businesses = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchBusinesses = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/businesses?per_page=all')
      businesses.value = response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch businesses'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createBusiness = async (data) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.post('/businesses', data)
      await fetchBusinesses()
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to create business'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateBusiness = async (id, data) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.put(`/businesses/${id}`, data)
      await fetchBusinesses()
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update business'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteBusiness = async (id) => {
    loading.value = true
    error.value = null
    try {
      await api.delete(`/businesses/${id}`)
      await fetchBusinesses()
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete business'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    businesses,
    loading,
    error,
    fetchBusinesses,
    createBusiness,
    updateBusiness,
    deleteBusiness
  }
})
