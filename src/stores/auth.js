import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api.js'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(null)
  const slug = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)

  // Actions
  const register = async (data) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await api.post('/service-providers/register', data)
      
      // Store token and user data
      token.value = response.data.token
      user.value = response.data.service_provider
      slug.value = response.service_provider.slug

      
      // Save to localStorage
      localStorage.setItem('auth_token', token.value || '')
      localStorage.setItem('user', JSON.stringify(user.value))
      
      return { success: true, data: response.data }
    } catch (err) {
      const errorData = err.response?.data
      const errorMessage = errorData?.message || errorData?.error || 'Registration failed'
      error.value = errorMessage
      
      if (errorData?.errors) {
        return { 
          success: false, 
          errors: errorData.errors,
          message: errorMessage
        }
      }
      
      return { success: false, message: errorMessage }
    } finally {
      isLoading.value = false
    }
  }

  const login = async (data) => {
    isLoading.value = true
    error.value = null

    try {

      const response = await api.post('/service-providers/login', data)
      
      // Store token and user data
      token.value = response.data.token 
      user.value = response.data.service_provider
      slug.value = response.data.service_provider.slug
      
      // Save to localStorage
      localStorage.setItem('auth_token', token.value || '')
      localStorage.setItem('user', JSON.stringify(user.value))
      
      return { success: true, data: response.data }
    } catch (err) {
      const errorData = err.response?.data
      const errorMessage = errorData?.message || errorData?.error || 'Login failed'
      error.value = errorMessage
      
      return { success: false, message: errorMessage }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    // Clear state
    user.value = null
    token.value = null
    error.value = null
    
    // Clear localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  }

  const initializeAuth = () => {
    // Restore auth state from localStorage
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      token.value = storedToken
      try {
        user.value = JSON.parse(storedUser)
      } catch {
        // If parsing fails, clear invalid data
        logout()
      }
    }
  }

  return {
    // State
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
    initializeAuth
  }
})
