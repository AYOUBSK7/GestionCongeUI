<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    >
      <div
        class="bg-white w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200 rounded-sm overflow-hidden"
      >
        <div
          class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50"
        >
          <h3 class="text-sm font-bold text-gray-800 uppercase tracking-tight">Nouvel Employé</h3>
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

        <form @submit.prevent="handleSubmit" class="px-6 py-6 overflow-y-auto max-h-[80vh]">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <!-- Informations personnelles -->
            <div class="space-y-4">
              <h4 class="text-xs font-bold text-[#0078d4] uppercase">Infos Personnelles</h4>

              <div>
                <label class="block text-[10px] font-semibold text-gray-500 mb-1 uppercase"
                  >Nom</label
                >
                <input v-model="form.nom" type="text" class="ms-input text-sm" required />
              </div>

              <div>
                <label class="block text-[10px] font-semibold text-gray-500 mb-1 uppercase"
                  >Prénom</label
                >
                <input v-model="form.prenom" type="text" class="ms-input text-sm" required />
              </div>

              <div>
                <label class="block text-[10px] font-semibold text-gray-500 mb-1 uppercase"
                  >Email</label
                >
                <input v-model="form.email" type="email" class="ms-input text-sm" required />
              </div>

              <div>
                <label class="block text-[10px] font-semibold text-gray-500 mb-1 uppercase"
                  >Adresse</label
                >
                <input v-model="form.adresse" type="text" class="ms-input text-sm" />
              </div>

              <!-- 🔹 AJOUT -->
              <div>
                <label class="block text-[10px] font-semibold text-gray-500 mb-1 uppercase">
                  Téléphone principal
                </label>
                <input v-model="form.telephonePrincipal" type="tel" class="ms-input text-sm" />
              </div>

              <div>
                <label class="block text-[10px] font-semibold text-gray-500 mb-1 uppercase">
                  Téléphone secondaire
                </label>
                <input v-model="form.telephoneSecondaire" type="tel" class="ms-input text-sm" />
              </div>
            </div>

            <!-- Compte et Poste -->
            <div class="space-y-4">
              <h4 class="text-xs font-bold text-[#0078d4] uppercase">Compte & RH</h4>

              <div>
                <label class="block text-[10px] font-semibold text-gray-500 mb-1 uppercase">
                  Nom d'utilisateur
                </label>
                <input
                  v-model="form.nomUtilisateur"
                  type="text"
                  class="ms-input text-sm"
                  required
                />
              </div>

              <div>
                <label class="block text-[10px] font-semibold text-gray-500 mb-1 uppercase">
                  Mot de passe
                </label>
                <input
                  v-model="form.motDePasse"
                  type="password"
                  class="ms-input text-sm"
                  required
                />
              </div>

              <div>
                <label class="block text-[10px] font-semibold text-gray-500 mb-1 uppercase">
                  Identifiant interne
                </label>
                <input v-model="form.identifiant" type="text" class="ms-input text-sm" required />
              </div>

              <div>
                <label class="block text-[10px] font-semibold text-gray-500 mb-1 uppercase">
                  Solde congés (jours)
                </label>
                <input
                  v-model.number="form.soldeConge"
                  type="number"
                  class="ms-input text-sm"
                  required
                />
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50"
            >
              Annuler
            </button>

            <button type="submit" :disabled="loading" class="ms-button text-xs font-semibold px-6">
              {{ loading ? 'Création...' : "Créer l'employé" }}
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
  nomUtilisateur: '',
  email: '',
  motDePasse: '',
  prenom: '',
  nom: '',
  adresse: '',
  telephonePrincipal: '',
  telephoneSecondaire: '',
  identifiant: '',
  soldeConge: 0,
})

// FIX: Reset form when modal opens
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      form.nomUtilisateur = ''
      form.email = ''
      form.motDePasse = ''
      form.prenom = ''
      form.nom = ''
      form.adresse = ''
      form.telephonePrincipal = ''
      form.telephoneSecondaire = ''
      form.identifiant = ''
      form.soldeConge = 0
    }
  },
)

const handleSubmit = () => {
  console.log('Submitting employee form:', form)
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
