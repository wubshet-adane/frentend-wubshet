<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
    </label>

    <div class="relative">
      <!-- Left Icon -->
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <component
          :is="icon"
          :class="['w-5 h-5', error ? 'text-red-500' : 'text-gray-400']"
        />
      </div>

      <!-- Input -->
      <input
        :id="id"
        :value="modelValue"
        @input="
          $emit('update:modelValue', $event.target.value);
          $emit('input', $event)
        "
        :type="inputType"
        @blur="$emit('blur')"
        :class="[
          'w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
          showToggle ? 'pr-12' : 'pr-4',
          error
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-gray-900 focus:border-transparent'
        ]"
        :placeholder="placeholder"
      />

      <!-- Toggle Button -->
      <button
        v-if="showToggle"
        type="button"
        @click="$emit('toggle')"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <component :is="toggleIcon" class="w-5 h-5" />
      </button>

      <!-- Error Icon -->
      <ExclamationCircleIcon
        v-else-if="error"
        class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500"
      />
    </div>

    <!-- Error Message -->
    <p v-if="error" class="mt-1 text-sm text-red-600">
      {{ error }}
    </p>

    <slot name="extra"></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  icon: {
    type: [Object, Function],
    required: true
  },
  showToggle: {
    type: Boolean,
    default: false
  },
  toggleIcon: {
    type: [Object, Function],
    default: null
  },
  isPasswordVisible: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue', 'blur', 'input', 'toggle'])

const inputType = computed(() => {
  if (props.type === 'password' && props.showToggle) {
    return props.isPasswordVisible ? 'text' : 'password'
  }
  return props.type
})
</script>
