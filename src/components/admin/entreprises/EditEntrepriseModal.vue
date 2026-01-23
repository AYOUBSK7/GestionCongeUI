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
            Modifier l'Entreprise
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
            <input v-model="form.nom" type="text" class="ms-input" required />
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider"
              >Email</label
            >
            <input v-model="form.email" type="email" class="ms-input" required />
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider"
              >Téléphone</label
            >
            <input v-model="form.telephone" type="text" class="ms-input" required />
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider"
              >Adresse complète</label
            >
            <textarea v-model="form.adresse" class="ms-input min-h-[80px]" required></textarea>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
              Statut
            </label>

            <div class="flex items-center gap-4">
              <!-- Switch -->
              <button
                type="button"
                @click="form.statut = form.statut == 'Actif' ? 'Inactif' : 'Actif'"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300"
                :class="form.statut == 'Actif' ? 'bg-green-600' : 'bg-gray-300'"
              >
                <span
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300"
                  :class="form.statut == 'Actif' ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>

              <!-- Text -->
              <span
                class="text-xs font-semibold"
                :class="form.statut == 'Actif' ? 'text-green-600' : 'text-gray-500'"
              >
                {{ form.statut }}
              </span>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="$emit('close')" class="ms-button-secondary">
              Annuler
            </button>
            <button type="submit" :disabled="loading" class="ms-button">
              {{ loading ? 'Enregistrement...' : 'Enregistrer les modifications' }}
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
  entreprise: Object,
})

const emit = defineEmits(['close', 'submit'])

const form = reactive({
  nom: props.entreprise?.nom || '',
  adresse: props.entreprise?.adresse || '',
  telephone: props.entreprise?.telephone || '',
  email: props.entreprise?.email || '',
  statut: props.entreprise?.statut,
})

watch(
  () => props.entreprise,
  (newVal) => {
    if (newVal) {
      form.nom = newVal.nom || ''
      form.adresse = newVal.adresse || ''
      form.telephone = newVal.telephone || '' // FIX: était 'tel'
      form.email = newVal.email || ''
      form.statut = newVal.statut
    }
  },
  { immediate: true },
)

const handleSubmit = () => {
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
