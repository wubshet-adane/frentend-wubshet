<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-xl shadow-sm p-8">

        <!-- Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-green-900 rounded-full mb-4">
            <UserPlusIcon class="w-8 h-8 text-white" />
          </div>
          <h2 class="text-3xl font-bold text-green-700">Create Account</h2>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5" novalidate>

          <!-- API Error -->
          <div
            v-if="apiError"
            class="rounded-md bg-red-50 border border-red-200 text-red-700 p-3 text-sm"
          >
            {{ apiError }}
          </div>

          <!-- Form Fields -->
          <FormInput
            v-for="field in formFields"
            :key="field.id"
            :id="field.id"
            :label="field.label"
            v-model="formData[field.id]"
            :type="field.type"
            :placeholder="field.placeholder"
            :error="errors[field.id]"
            :icon="field.icon"
            :show-toggle="field.showToggle"
            :toggle-icon="field.showToggle ? (field.isVisible ? EyeSlashIcon : EyeIcon) : undefined"
            :is-password-visible="field.showToggle ? field.isVisible : false"
            @blur="field.validate()"
            @input="errors[field.id] && field.validate()"
            @toggle="
              field.id === 'password'
                ? (showPassword = !showPassword)
                : (showConfirmPassword = !showConfirmPassword)
            "
          >
            <template
              v-if="field.id === 'password' && formData.password && !errors.password"
              #extra
            >
              <div class="mt-2 flex items-center gap-2">
                <div class="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    class="h-full transition-all duration-300"
                    :class="strength.color"
                    :style="{ width: strength.width }"
                  ></div>
                </div>
                <span class="text-xs font-medium" :class="strength.textColor">
                  {{ strength.label }}
                </span>
              </div>
            </template>
          </FormInput>

         

          <p v-if="errors.acceptTerms" class="-mt-3 text-sm text-red-600">
            {{ errors.acceptTerms }}
          </p>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="isLoading"
            :class="[
              'w-full px-4 py-3 font-semibold rounded-lg transition-all duration-200 flex items-center justify-center',
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-900 hover:bg-green-800 active:scale-[0.98] text-white'
            ]"
          >
            <svg
              v-if="isLoading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>

            {{ isLoading ? 'Creating account...' : 'Create Account' }}
          </button>

          <p class="text-center text-sm text-gray-600">
            Already have an account?
            <RouterLink to="/login" class="font-medium text-gray-900 hover:underline">
              Sign in
            </RouterLink>
          </p>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useFormValidation } from '@/composables/useFormValidation'
import FormInput from '@/components/FormInput.vue'

import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  IdentificationIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  UserPlusIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const { errors, getPasswordStrength } = useFormValidation()

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  business_name: '',
  tin: '',
  type: '',
  location: '',
  acceptTerms: true
})

const isLoading = ref(false)
const apiError = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

/* ---------- VALIDATION ---------- */
function validateField(field, value, minLength = 0) {
  if (!value || value.trim() === '') {
    errors[field] = `${field.replace('_', ' ')} is required`
    return false
  }
  if (minLength && value.length < minLength) {
    errors[field] = `Must be at least ${minLength} characters`
    return false
  }
  errors[field] = ''
  return true
}

function validateEmailField(value) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    errors.email = 'Please enter a valid email'
    return false
  }
  errors.email = ''
  return true
}

function validatePasswordField(value) {
  if (value.length < 8) {
    errors.password = 'Password must be at least 8 characters'
    return false
  }
  if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value)) {
    errors.password = 'Password must contain upper, lower and number'
    return false
  }
  errors.password = ''
  return true
}

const validateConfirmPassword = () => {
  if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = 'Passwords do not match'
    return false
  }
  errors.confirmPassword = ''
  return true
}

const validateTerms = () => {
  if (!formData.acceptTerms) {
    errors.acceptTerms = 'You must accept the terms'
    return false
  }
  errors.acceptTerms = ''
  return true
}

const strength = computed(() => getPasswordStrength(formData.password))

/* ---------- FORM FIELDS ---------- */
const formFields = computed(() => [
  {
    id: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Wubshet Adane',
    icon: UserIcon,
    validate: () => validateField('name', formData.name, 2)
  },
  {
    id: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'wubshet@example.com',
    icon: EnvelopeIcon,
    validate: () => validateEmailField(formData.email)
  },
  {
    id: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: '09xxxxxxxx',
    icon: PhoneIcon,
    validate: () => validateField('phone', formData.phone, 10)
  },
  {
    id: 'business_name',
    label: 'Business Name',
    type: 'text',
    placeholder: 'Wubshet Restaurant',
    icon: BuildingOfficeIcon,
    validate: () => validateField('business_name', formData.business_name, 2)
  },
  {
    id: 'tin',
    label: 'TIN',
    type: 'text',
    placeholder: '123452345',
    icon: IdentificationIcon,
    validate: () => validateField('tin', formData.tin, 5)
  },
  {
    id: 'type',
    label: 'Restaurant Type',
    type: 'text',
    placeholder: 'Muslim restaurant',
    icon: IdentificationIcon,
    validate: () => validateField('type', formData.type, 2)
  },
  {
    id: 'location',
    label: 'Restaurant Address',
    type: 'text',
    placeholder: 'Salite`mhret',
    icon: IdentificationIcon,
    validate: () => validateField('location', formData.location, 3)
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    icon: LockClosedIcon,
    showToggle: true,
    isVisible: showPassword.value,
    validate: () => validatePasswordField(formData.password)
  },
  {
    id: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: '••••••••',
    icon: LockClosedIcon,
    showToggle: true,
    isVisible: showConfirmPassword.value,
    validate: validateConfirmPassword
  }
])

/* ---------- SUBMIT ---------- */
const handleSubmit = async () => {
  apiError.value = ''
  Object.keys(errors).forEach((k) => (errors[k] = ''))

  const valid = formFields.value.every((f) => f.validate()) && validateTerms()
  if (!valid) return

  isLoading.value = true
  try {
    const result = await authStore.register({
      ...formData,
      password_confirmation: formData.password
    })

    if (!result.status) router.push('/')
    else apiError.value = result.message || 'Registration failed'
  } catch {
    apiError.value = 'Registration failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>
