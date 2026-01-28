<template>
  <div class="space-y-6">
    <!-- Nouvelle demande d'avance -->
    <div
      class="bg-white shadow-sm border border-gray-200 p-5 rounded-sm hover:shadow-md transition-shadow"
    >
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Nouvelle Demande d'Avance</h2>

      <div class="space-y-6">
        <div>
          <label class="text-xs text-gray-500 block mb-2 font-medium">Montant (DT) *</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 text-sm">DT</span>
            </div>
            <input
              type="number"
              v-model="formData.montant"
              min="0.01"
              step="0.01"
              class="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#0078d4] focus:border-[#0078d4]"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label class="text-xs text-gray-500 block mb-2 font-medium">Motif *</label>
          <textarea
            v-model="formData.motif"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#0078d4] focus:border-[#0078d4]"
            placeholder="Décrivez le motif de votre demande d'avance..."
          ></textarea>
        </div>

        <div class="pt-2">
          <button
            @click="handleSubmit"
            :disabled="!isFormValid"
            :class="[
              'w-full px-4 py-3 text-sm font-medium rounded-sm transition-colors',
              isFormValid
                ? 'bg-[#0078d4] text-white hover:bg-[#106ebe]'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed',
            ]"
          >
            Soumettre la demande
          </button>
        </div>
      </div>
    </div>

    <!-- Historique + approbation -->
    <div
      class="bg-white shadow-sm border border-gray-200 rounded-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-800">Historique des Avances</h2>
        <span class="text-xs text-gray-500">{{ allAvances.length }} demandes</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase border-b"
              >
                Employé
              </th>
              <th
                class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase border-b"
              >
                Date
              </th>
              <th
                class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase border-b"
              >
                Montant
              </th>
              <th
                class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase border-b"
              >
                Motif
              </th>
              <th
                class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase border-b"
              >
                Statut
              </th>
              <th
                class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase border-b"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="avance in allAvances"
              :key="avance.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="py-3 px-4 text-sm text-gray-800">
                {{ avance.isMine ? 'Ma demande' : avance.employeNom }}
              </td>
              <td class="py-3 px-4 text-sm text-gray-800">
                {{ formatDate(avance.dateDemande) }}
              </td>
              <td class="py-3 px-4 text-sm font-semibold text-gray-800">
                {{ formatCurrency(avance.montant) }}
              </td>
              <td class="py-3 px-4 text-sm text-gray-800">
                <p class="max-w-[200px] truncate">{{ avance.motif }}</p>
              </td>
              <td class="py-3 px-4">
                <span
                  :class="[
                    'px-3 py-1 text-xs font-semibold rounded-full',
                    getStatusClass(avance.statut),
                  ]"
                >
                  {{ formatStatus(avance.statut) }}
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="flex space-x-2">
                  <!-- Supprimer -->
                  <button
                    v-if="avance.isMine && isPending(avance.statut)"
                    @click="handleCancel(avance.id)"
                    class="px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded"
                  >
                    Supprimer
                  </button>

                  <!-- Approuver / Refuser -->
                  <button
                    v-if="!avance.isMine && canManageAvance && isPending(avance.statut)"
                    @click="handleApprove(avance.id)"
                    class="px-3 py-1 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded"
                  >
                    Approuver
                  </button>
                  <button
                    v-if="!avance.isMine && canManageAvance && isPending(avance.statut)"
                    @click="handleRefuse(avance.id)"
                    class="px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded"
                  >
                    Refuser
                  </button>

                  <span v-if="isApproved(avance.statut)" class="text-xs text-gray-500 italic">
                    Approuvée
                  </span>
                  <span v-if="isRejected(avance.statut)" class="text-xs text-gray-500 italic">
                    Refusée
                  </span>
                </div>
              </td>
            </tr>

            <tr v-if="allAvances.length === 0">
              <td colspan="6" class="py-8 text-center text-gray-500">
                Aucun historique d'avances disponible
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { authService } from '../../services/authService'

const authStore = useAuthStore()

const avances = ref([])
const demandesAApprouver = ref([])
const userInfo = ref(null)

const formData = ref({ montant: '', motif: '' })

// Permissions
const hasPermission = (perm) => userInfo.value?.permissions?.some((p) => p.nomPermission === perm)
const canManageAvance = computed(() => hasPermission('GERER_AVANCE'))

// Validation
const isFormValid = computed(() => formData.value.montant > 0 && formData.value.motif?.trim())

// Statuts
const STATUS = {
  'en attente': { label: 'En attente', class: 'bg-yellow-100 text-yellow-800', type: 'pending' },
  approuvée: { label: 'Approuvée', class: 'bg-green-100 text-green-800', type: 'approved' },
  refusée: { label: 'Refusée', class: 'bg-red-100 text-red-800', type: 'rejected' },
}

const getStatus = (s) => STATUS[s?.toLowerCase()] || null
const formatStatus = (s) => getStatus(s)?.label || 'Inconnu'
const getStatusClass = (s) => getStatus(s)?.class || 'bg-gray-100 text-gray-800'
const isPending = (s) => getStatus(s)?.type === 'pending'
const isApproved = (s) => getStatus(s)?.type === 'approved'
const isRejected = (s) => getStatus(s)?.type === 'rejected'

// Helpers
const formatCurrency = (v) =>
  new Intl.NumberFormat('fr-TN', { style: 'currency', currency: 'TND' }).format(v || 0)
const formatDate = (d) => (d ? new Date(d).toLocaleDateString('fr-FR') : 'N/A')

// Fusion données
const allAvances = computed(() => {
  const myId = userInfo.value?.id
  return [
    ...avances.value.map((a) => ({ ...a, isMine: true })),
    ...demandesAApprouver.value
      .filter((a) => a.employeId !== myId)
      .map((a) => ({ ...a, isMine: false })),
  ]
})

// API
const fetchUser = async () => {
  userInfo.value = await authService.getCompte(authStore.user.id)
}
const loadAvances = async () => {
  avances.value = (await authService.getAvances()) || []
}
const loadDemandesAApprouver = async () => {
  demandesAApprouver.value = (await authService.getDemandesAvancesAApprouver()) || []
}

// Actions
const handleSubmit = async () => {
  await authService.SubmitDemandeAvance(formData.value)
  await Promise.all([loadAvances(), loadDemandesAApprouver()])
  alert('Demande envoyée')
  formData.value = { montant: '', motif: '' }
}

const handleCancel = async (id) => {
  if (!confirm('Supprimer cette demande ?')) return
  await authService.AnnulerDemandeAvance(id)
  await Promise.all([loadAvances(), loadDemandesAApprouver()])
}

const handleApprove = async (id) => {
  await authService.approuverDemandeAvance(id)
  await loadDemandesAApprouver()
}

const handleRefuse = async (id) => {
  const motif = prompt('Motif du refus :')
  if (!motif) return
  await authService.refuserDemandeAvance(id, motif)
  await loadDemandesAApprouver()
}

onMounted(async () => {
  await Promise.all([fetchUser(), loadAvances(), loadDemandesAApprouver()])
})
</script>
