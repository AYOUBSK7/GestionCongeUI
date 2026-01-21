<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    >
      <div class="bg-white w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
        <div
          class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50"
        >
          <h3 class="text-sm font-bold text-gray-800 uppercase tracking-tight">
            Nouvelle Entreprise
          </h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="px-6 py-6 space-y-5">
          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider"
              >Nom de l'entreprise</label
            >
            <input
              v-model="form.nom"
              type="text"
              placeholder="ex: Tech Solutions"
              class="ms-input"
              required
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider"
              >Email</label
            >
            <input
              v-model="form.email"
              type="email"
              placeholder="ex: contact@tech.com"
              class="ms-input"
              required
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider"
              >Téléphone</label
            >
            <input
              v-model="form.telephone"
              type="text"
              placeholder="ex: +216 71 000 000"
              class="ms-input"
              required
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider"
              >Adresse complète</label
            >
            <textarea
              v-model="form.adresse"
              placeholder="ex: 123 Rue de la Liberté, Tunis"
              class="ms-input min-h-[80px]"
              required
            ></textarea>
          </div>

          <div class="flex justify-end gap-3 pt-2">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="ms-button text-xs font-semibold flex items-center gap-2"
            >
              <svg
                v-if="loading"
                class="animate-spin h-4 w-4 text-white"
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
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ loading ? 'Création...' : "Créer l'entreprise" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  loading: Boolean,
})

const emit = defineEmits(['close', 'submit'])

const form = reactive({
  nom: '',
  adresse: '',
  telephone: '',
  email: '',
})

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      form.nom = ''
      form.adresse = ''
      form.telephone = ''
      form.email = ''
    }
  },
)

const handleSubmit = () => {
  console.log('Submitting form:', { ...form })
  emit('submit', { ...form })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
