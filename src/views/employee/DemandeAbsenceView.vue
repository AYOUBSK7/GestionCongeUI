<template>
  <div class="space-y-6">
    <!-- Partie 1 : Déclarer une Absence -->
    <div
      class="bg-white shadow-sm border border-gray-200 p-5 rounded-sm hover:shadow-md transition-shadow"
    >
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Déclarer une Absence</h2>

      <div class="space-y-4">
        <div>
          <label class="text-xs text-gray-500 block mb-2 font-medium"> Date d'absence * </label>
          <input
            type="date"
            v-model="formData.date"
            class="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#0078d4] focus:border-[#0078d4]"
          />
        </div>

        <div>
          <label class="text-xs text-gray-500 block mb-2 font-medium"> Motif * </label>
          <textarea
            v-model="formData.motif"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#0078d4] focus:border-[#0078d4]"
            placeholder="Décrivez le motif de votre absence..."
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
            Soumettre la déclaration
          </button>
        </div>
      </div>
    </div>

    <!-- Partie 2 : Historique des absences personnelles -->
    <div
      class="bg-white shadow-sm border border-gray-200 rounded-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-800">Historique des Absences</h2>
        <span class="text-xs text-gray-500">{{ absences.length }} absences</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase border-b"
              >
                Date
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
              v-for="absence in absences"
              :key="absence.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="py-3 px-4 text-sm text-gray-800">{{ formatDate(absence.date) }}</td>
              <td class="py-3 px-4 text-sm text-gray-800">{{ absence.motif }}</td>
              <td class="py-3 px-4">
                <span
                  :class="[
                    'px-3 py-1 text-xs font-semibold rounded-full',
                    getStatusClass(absence.statut),
                  ]"
                >
                  {{ formatStatus(absence.statut) }}
                </span>
              </td>
              <td class="py-3 px-4">
                <button
                  v-if="isPending(absence.statut)"
                  @click="handleCancel(absence.id)"
                  class="px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
                >
                  Supprimer
                </button>
              </td>
            </tr>
            <tr v-if="absences.length === 0">
              <td colspan="4" class="py-8 text-center text-gray-500">Aucune absence déclarée</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Partie 3 : Demandes à approuver (pour responsables) -->
    <div
      v-if="demandesAApprouver.length > 0"
      class="bg-white shadow-sm border border-gray-200 rounded-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-800">Demandes d'Absence à Approuver</h2>
        <span class="text-xs text-gray-500">{{ demandesAApprouver.length }} demandes</span>
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
              v-for="demande in demandesAApprouver"
              :key="demande.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="py-3 px-4 text-sm text-gray-800">{{ demande.employeNom }}</td>
              <td class="py-3 px-4 text-sm text-gray-800">{{ formatDate(demande.date) }}</td>
              <td class="py-3 px-4 text-sm text-gray-800">{{ demande.motif }}</td>
              <td class="py-3 px-4">
                <span
                  :class="[
                    'px-3 py-1 text-xs font-semibold rounded-full',
                    getStatusClass(demande.statut),
                  ]"
                >
                  {{ formatStatus(demande.statut) }}
                </span>
              </td>
              <td class="py-3 px-4 flex gap-2">
                <button
                  @click="handleApprouver(demande.id)"
                  class="px-3 py-1 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded transition-colors"
                  :disabled="!isPending(demande.statut)"
                >
                  Approuver
                </button>
                <button
                  @click="handleRefuser(demande.id)"
                  class="px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
                  :disabled="!isPending(demande.statut)"
                >
                  Refuser
                </button>
              </td>
            </tr>
            <tr v-if="demandesAApprouver.length === 0">
              <td colspan="5" class="py-8 text-center text-gray-500">Aucune demande à approuver</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { authService } from '../../services/authService'

const absences = ref([])
const demandesAApprouver = ref([])

const formData = ref({ date: '', motif: '' })
const isFormValid = computed(() => formData.value.date && formData.value.motif?.trim())

const STATUS = {
  'en attente': { label: 'En attente', class: 'bg-yellow-100 text-yellow-800' },
  approuvée: { label: 'Approuvée', class: 'bg-green-100 text-green-800' },
  refusée: { label: 'Refusée', class: 'bg-red-100 text-red-800' },
}

const formatDate = (dateString) =>
  dateString ? new Date(dateString).toLocaleDateString('fr-FR') : 'N/A'
const formatStatus = (status) => STATUS[status?.toLowerCase()]?.label || status
const getStatusClass = (status) =>
  STATUS[status?.toLowerCase()]?.class || 'bg-gray-100 text-gray-800'
const isPending = (status) => status?.toLowerCase() === 'en attente'

const loadAbsences = async () => {
  absences.value = (await authService.getMesDemandesAbsences()) || []
}

const loadDemandesAApprouver = async () => {
  demandesAApprouver.value = (await authService.getAbsencesAApprouver()) || []
}

const handleSubmit = async () => {
  try {
    await authService.createAbsence({
      date: formData.value.date,
      motif: formData.value.motif.trim(),
    })
    await loadAbsences()
    alert('Absence déclarée avec succès')
    formData.value = { date: '', motif: '' }
  } catch (error) {
    alert(error.response?.data?.message || 'Erreur lors de la déclaration')
  }
}

const handleCancel = async (id) => {
  if (!confirm('Supprimer cette absence ?')) return
  try {
    await authService.deleteAbsence(id)
    await loadAbsences()
    alert('Absence supprimée')
  } catch {
    alert('Erreur lors de la suppression')
  }
}

const handleApprouver = async (id) => {
  try {
    await authService.approuverAbsence(id)
    await loadDemandesAApprouver()
    alert('Demande approuvée')
  } catch {
    alert("Erreur lors de l'approbation")
  }
}

const handleRefuser = async (id) => {
  const motif = prompt('Motif du refus :')
  if (!motif) return
  try {
    await authService.refuserAbsence(id, motif)
    await loadDemandesAApprouver()
    alert('Demande refusée')
  } catch {
    alert('Erreur lors du refus')
  }
}

onMounted(() => {
  loadAbsences()
  loadDemandesAApprouver()
})
</script>
