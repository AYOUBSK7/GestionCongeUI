<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    >
      <div
        class="bg-white w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200 rounded-sm overflow-hidden"
      >
        <div
          class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50"
        >
          <h3 class="text-sm font-bold text-gray-800 uppercase tracking-tight">
            Détails de l'employé
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

        <div v-if="employe" class="px-6 py-6 space-y-6 overflow-y-auto max-h-[80vh]">
          <div class="flex items-center space-x-4">
            <div
              class="w-16 h-16 bg-blue-50 text-[#0078d4] rounded flex items-center justify-center font-bold text-xl border border-blue-100 uppercase"
            >
              {{ employe.prenom?.[0] || '?' }}{{ employe.nom?.[0] || '?' }}
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-800">
                {{ employe.prenom }} {{ employe.nom }}
              </h2>
              <p class="text-sm text-gray-500">
                {{ employe.poste?.titrePoste || 'Poste non défini' }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 p-3 rounded-sm">
              <p class="text-[10px] font-bold text-gray-400 uppercase mb-1">Email</p>
              <p class="text-sm text-gray-700">{{ employe.email }}</p>
            </div>
            <div class="bg-gray-50 p-3 rounded-sm">
              <p class="text-[10px] font-bold text-gray-400 uppercase mb-1">Identifiant</p>
              <p class="text-sm text-gray-700">{{ employe.identifiant }}</p>
            </div>
            <div class="bg-gray-50 p-3 rounded-sm">
              <p class="text-[10px] font-bold text-gray-400 uppercase mb-1">Contrat</p>
              <p class="text-sm text-gray-700">
                {{ employe.contrat?.typeContrat || 'N/A' }}
              </p>
            </div>
            <div class="bg-gray-50 p-3 rounded-sm">
              <p class="text-[10px] font-bold text-gray-400 uppercase mb-1">Solde Congés</p>
              <p class="text-sm font-bold text-green-600">{{ employe.soldeConges }} Jours</p>
            </div>
          </div>

          <!-- FIX: Affichage de l'adresse si disponible -->
          <div v-if="employe.adresse" class="bg-gray-50 p-3 rounded-sm">
            <p class="text-[10px] font-bold text-gray-400 uppercase mb-1">Adresse</p>
            <p class="text-sm text-gray-700">{{ employe.adresse }}</p>
          </div>

          <!-- FIX: Affichage des téléphones si disponibles -->
          <div
            v-if="employe.telephonePrincipal || employe.telephoneSecondaire"
            class="grid grid-cols-2 gap-4"
          >
            <div v-if="employe.telephonePrincipal" class="bg-gray-50 p-3 rounded-sm">
              <p class="text-[10px] font-bold text-gray-400 uppercase mb-1">Téléphone Principal</p>
              <p class="text-sm text-gray-700">{{ employe.telephonePrincipal }}</p>
            </div>
            <div v-if="employe.telephoneSecondaire" class="bg-gray-50 p-3 rounded-sm">
              <p class="text-[10px] font-bold text-gray-400 uppercase mb-1">Téléphone Secondaire</p>
              <p class="text-sm text-gray-700">{{ employe.telephoneSecondaire }}</p>
            </div>
          </div>

          <!-- FIX: Affichage des permissions -->
          <div
            v-if="employe.permissions && employe.permissions.length > 0"
            class="border-t border-gray-100 pt-4"
          >
            <h4 class="text-xs font-bold text-gray-800 uppercase mb-3">Permissions</h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(perm, index) in employe.permissions"
                :key="index"
                class="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100"
              >
                {{ perm.nomPermission }}
              </span>
            </div>
          </div>

          <div class="border-t border-gray-100 pt-4">
            <h4 class="text-xs font-bold text-gray-800 uppercase mb-3">Historique des Salaires</h4>
            <div v-if="employe.salaires && employe.salaires.length > 0" class="space-y-2">
              <div
                v-for="(s, index) in employe.salaires"
                :key="index"
                class="flex justify-between items-center text-sm p-2 hover:bg-gray-50 border-b border-gray-50 last:border-0"
              >
                <span class="text-gray-600">
                  {{ formatDate(s.dateDebut) }}
                  <span v-if="s.dateFin"> - {{ formatDate(s.dateFin) }}</span>
                </span>
                <span class="font-bold text-gray-800">{{ s.montantSalaire }} TND</span>
              </div>
            </div>
            <p v-else class="text-sm text-gray-400 italic">Aucun historique de salaire</p>
          </div>
        </div>
        <div v-else class="p-12 text-center text-gray-500">Chargement...</div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  employe: Object,
})

console.log(props.employe)

defineEmits(['close'])

const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('fr-FR')
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
