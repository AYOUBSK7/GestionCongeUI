<template>
  <div class="space-y-6">
    <!-- Formulaire de demande -->
    <div
      class="bg-white shadow-sm border border-gray-200 p-5 rounded-sm hover:shadow-md transition-shadow"
    >
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Nouvelle Demande de Congé</h2>

      <div class="space-y-4">
        <!-- Dates -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-xs text-gray-500 block mb-2 font-medium">Date de début *</label>
            <input
              type="date"
              v-model="formData.dateDebut"
              :min="minDate"
              class="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#0078d4] focus:border-[#0078d4]"
            />
          </div>
          <div>
            <label class="text-xs text-gray-500 block mb-2 font-medium">Date de fin *</label>
            <input
              type="date"
              v-model="formData.dateFin"
              :min="formData.dateDebut || minDate"
              class="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#0078d4] focus:border-[#0078d4]"
            />
          </div>
        </div>

        <!-- Motif -->
        <div>
          <label class="text-xs text-gray-500 block mb-2 font-medium">Motif *</label>
          <textarea
            v-model="formData.motif"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#0078d4] focus:border-[#0078d4]"
            placeholder="Décrivez le motif de votre congé..."
          ></textarea>
        </div>

        <!-- Calcul de durée -->
        <div v-if="formData.dateDebut && formData.dateFin" class="bg-gray-50 p-3 rounded">
          <p class="text-xs text-gray-600">
            Durée estimée :
            <span class="font-medium">{{ calculatedDuration }} jour(s)</span>
            <span v-if="calculatedDuration > userSoldeConges" class="text-red-500 ml-2">
              (Solde insuffisant)
            </span>
          </p>
        </div>

        <!-- Bouton de soumission -->
        <div class="pt-2">
          <button
            @click="handleSubmit"
            :disabled="!isFormValid || calculatedDuration > userSoldeConges"
            :class="[
              'w-full px-4 py-3 text-sm font-medium rounded-sm transition-colors',
              isFormValid && calculatedDuration <= userSoldeConges
                ? 'bg-[#0078d4] text-white hover:bg-[#106ebe]'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed',
            ]"
          >
            Soumettre la demande
          </button>
        </div>
      </div>
    </div>

    <!-- Historique des congés -->
    <div class="mt-8">
      <div
        class="bg-white shadow-sm border border-gray-200 rounded-sm hover:shadow-md transition-shadow overflow-hidden"
      >
        <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-800">Historique des Congés</h2>
          <span class="text-xs text-gray-500">{{ allConges.length }} demandes</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b"
                >
                  Employé
                </th>
                <th
                  class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b"
                >
                  Date de début
                </th>
                <th
                  class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b"
                >
                  Date de fin
                </th>
                <th
                  class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b"
                >
                  Motif
                </th>
                <th
                  class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b"
                >
                  Durée
                </th>
                <th
                  class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b"
                >
                  Statut
                </th>
                <th
                  class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="conge in allConges"
                :key="conge.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="py-3 px-4 text-sm text-gray-800">{{ conge.employeNom }}</td>
                <td class="py-3 px-4 text-sm text-gray-800">{{ formatDate(conge.dateDebut) }}</td>
                <td class="py-3 px-4 text-sm text-gray-800">{{ formatDate(conge.dateFin) }}</td>
                <td class="py-3 px-4 text-sm text-gray-800">
                  <p class="max-w-[200px] truncate">{{ conge.motif }}</p>
                </td>
                <td class="py-3 px-4 text-sm text-gray-800">
                  {{ dayDiff(conge.dateDebut, conge.dateFin) }} jours
                </td>
                <td class="py-3 px-4">
                  <span
                    :class="[
                      'px-3 py-1 text-xs font-semibold rounded-full',
                      getStatusClass(conge.statut),
                    ]"
                  >
                    {{ formatStatus(conge.statut) }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <div class="flex space-x-2">
                    <!-- MA DEMANDE : Supprimer si en attente -->
                    <button
                      v-if="isMyDemande(conge) && isPending(conge.statut)"
                      @click="handleCancel(conge.id)"
                      class="px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
                    >
                      Supprimer
                    </button>

                    <!-- DEMANDE AUTRE EMPLOYÉ : Approuver / Refuser si en attente et permission -->
                    <button
                      v-if="!isMyDemande(conge) && canManageConge && isPending(conge.statut)"
                      @click="handleApprove(conge.id)"
                      class="px-3 py-1 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded transition-colors"
                    >
                      Approuver
                    </button>
                    <button
                      v-if="!isMyDemande(conge) && canManageConge && isPending(conge.statut)"
                      @click="handleRefuse(conge.id)"
                      class="px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
                    >
                      Refuser
                    </button>

                    <!-- Statut fixe -->
                    <span v-if="isApproved(conge.statut)" class="text-xs text-gray-500 italic"
                      >Approuvé</span
                    >
                    <span v-if="isRejected(conge.statut)" class="text-xs text-gray-500 italic"
                      >Refusé</span
                    >
                  </div>
                </td>
              </tr>
              <tr v-if="allConges.length === 0">
                <td colspan="7" class="py-8 text-center text-gray-500">
                  Aucun historique de congés disponible
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { authService } from '../../services/authService'

const authStore = useAuthStore()

// États
const conges = ref([])
const demandesAApprouver = ref([])
const userInfo = ref(null)
const userSoldeConges = ref(0)
const formData = ref({ dateDebut: '', dateFin: '', motif: '' })

const minDate = new Date().toISOString().split('T')[0]

// Permissions
const hasPermission = (perm) => userInfo.value?.permissions?.some((p) => p.nomPermission === perm)
const canManageConge = computed(() => hasPermission('GERER_CONGE'))

// Helpers dates & statuts
const dayDiff = (startDate, endDate) =>
  !startDate || !endDate
    ? 0
    : Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : 'N/A'

const STATUS = {
  'en attente': { label: 'En attente', class: 'bg-yellow-100 text-yellow-800', type: 'pending' },
  approuvée: { label: 'Approuvée', class: 'bg-green-100 text-green-800', type: 'approved' },
  refusée: { label: 'Refusée', class: 'bg-red-100 text-red-800', type: 'rejected' },
}

const getStatus = (status) => STATUS[status?.toLowerCase()?.trim()] || null
const formatStatus = (status) => getStatus(status)?.label || 'Inconnu'
const getStatusClass = (status) => getStatus(status)?.class || 'bg-gray-100 text-gray-800'
const isPending = (status) => getStatus(status)?.type === 'pending'
const isApproved = (status) => getStatus(status)?.type === 'approved'
const isRejected = (status) => getStatus(status)?.type === 'rejected'

// Durée & validation
const calculatedDuration = computed(() => dayDiff(formData.value.dateDebut, formData.value.dateFin))
const isFormValid = computed(
  () => formData.value.dateDebut && formData.value.dateFin && formData.value.motif?.trim(),
)

// Gestion des congés
const allConges = computed(() => {
  const myId = userInfo.value?.id
  const myConges = conges.value.map((c) => ({ ...c, employeNom: 'Ma demande', isMine: true }))
  const autresConges = demandesAApprouver.value
    .filter((c) => c.employeId !== myId)
    .map((c) => ({ ...c, isMine: false }))
  return [...myConges, ...autresConges]
})

const isMyDemande = (c) => c.isMine

// API Calls
const fetchUser = async () => {
  userInfo.value = await authService.getCompte(authStore.user.id)
  userSoldeConges.value = userInfo.value?.soldeConges || 0
}

const loadConges = async () => {
  conges.value = (await authService.getConges(authStore.user.id)) || []
}
const loadDemandesAApprouver = async () => {
  demandesAApprouver.value = (await authService.getDemandesCongesAApprouver()) || []
}

// Actions
const handleSubmit = async () => {
  if (calculatedDuration.value > userSoldeConges.value)
    return alert(`Solde insuffisant (${userSoldeConges.value} jours)`)

  await authService.SubmitDemandeConge({
    dateDebut: new Date(formData.value.dateDebut).toISOString(),
    dateFin: new Date(formData.value.dateFin).toISOString(),
    motif: formData.value.motif.trim(),
  })
  await Promise.all([loadConges(), fetchUser(), loadDemandesAApprouver()])
  alert('Demande de congé soumise avec succès!')
  formData.value = { dateDebut: '', dateFin: '', motif: '' }
}

const handleCancel = async (id) => {
  if (!confirm('Voulez-vous vraiment supprimer cette demande ?')) return
  await authService.AnnulerDemandeConge(id)
  await Promise.all([loadConges(), fetchUser(), loadDemandesAApprouver()])
  alert('Demande supprimée !')
}

const handleApprove = async (id) => {
  await authService.approuverDemandeConge(id)
  await loadDemandesAApprouver()
}

const handleRefuse = async (id) => {
  const motif = prompt('Veuillez fournir un motif pour le refus :')
  if (!motif) {
    alert('Le motif est obligatoire pour refuser une demande.')
    return
  }
  await authService.refuserDemandeConge(id, motif)
  await loadDemandesAApprouver()
}

// Mounted
onMounted(async () => {
  await Promise.all([fetchUser(), loadConges(), loadDemandesAApprouver()])
})
</script>
