<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
  >
    <div class="bg-white w-full max-w-md shadow-2xl rounded-sm border border-gray-200">
      <div class="p-6">
        <div class="flex items-center space-x-3 text-orange-600 mb-4">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">
          {{ message }}
        </p>
      </div>
      <div class="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
        <button @click="$emit('close')" class="ms-button-secondary">Annuler</button>
        <button @click="$emit('confirm')" class="ms-button">Confirmer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String,
  message: String,
})

defineEmits(['close', 'confirm'])
</script>
