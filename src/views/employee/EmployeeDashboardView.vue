<template>
  <div class="space-y-8">
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm text-gray-500 mb-1">Solde congé</p>
            <p class="text-2xl font-bold text-gray-800">{{ soldeCongeCount }}</p>
            <p class="text-xs text-gray-500 mt-1">jours restants</p>
          </div>
          <div class="bg-blue-50 text-[#0078d4] p-3 rounded-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm text-gray-500 mb-1">Demandes d'avance</p>
            <p class="text-2xl font-bold text-gray-800">{{ avanceCount }}</p>
            <div class="flex justify-between text-xs mt-2">
              <span class="text-green-600">{{ approvedAvancesCount }} approuvées</span>
              <span class="text-yellow-600">{{ pendingAvancesCount }} en attente</span>
            </div>
          </div>
          <div class="bg-purple-50 text-purple-600 p-3 rounded-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm text-gray-500 mb-1">Absences ce mois</p>
            <p class="text-2xl font-bold text-gray-800">{{ absenceCount }}</p>
            <p class="text-xs text-gray-500 mt-1">jours d'absence ce mois</p>
          </div>
          <div class="bg-orange-50 text-orange-600 p-3 rounded-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm text-gray-500 mb-1">Congés approuvés</p>
            <p class="text-2xl font-bold text-gray-800">{{ congeCount }}</p>
            <div class="flex justify-between text-xs mt-2">
              <span class="text-green-600">{{ congeCount }} validés</span>
              <span class="text-yellow-600">{{ pendingCongesCount }} en attente</span>
            </div>
          </div>
          <div class="bg-green-50 text-green-600 p-3 rounded-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Section des activités récentes -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Avances récentes -->
      <div class="bg-white rounded-sm shadow-sm border border-gray-200 p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-gray-700">Dernières demandes d'avance</h3>
        </div>
        <div v-if="recentAvances.length > 0" class="space-y-2">
          <div
            v-for="avance in recentAvances"
            :key="avance.id"
            class="flex items-center justify-between p-3 hover:bg-gray-50 rounded border border-gray-100"
          >
            <div>
              <p class="text-sm font-medium text-gray-800">
                {{ formatCurrency(avance.montant) }}
              </p>
              <p class="text-xs text-gray-500 truncate max-w-[200px]">
                {{ avance.motif || 'Sans motif' }}
              </p>
            </div>
            <div class="flex flex-col items-end">
              <span class="text-xs text-gray-500">{{ formatDate(avance.date) }}</span>
              <span
                :class="[
                  'mt-1 px-2 py-1 text-xs font-semibold rounded-full',
                  getStatusClass(avance.statut),
                ]"
              >
                {{ formatStatus(avance.statut) }}
              </span>
            </div>
          </div>
        </div>
        <p v-else class="text-sm text-gray-500 text-center py-8">Aucune demande d'avance récente</p>
        <router-link
          to="/employee/demande-avance"
          class="mt-4 block text-center text-[#0078d4] hover:underline text-sm font-medium"
        >
          Voir toutes les avances
        </router-link>
      </div>

      <!-- Congés récents -->
      <div class="bg-white rounded-sm shadow-sm border border-gray-200 p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-gray-700">Dernières demandes de congé</h3>
        </div>
        <div v-if="recentConges.length > 0" class="space-y-2">
          <div
            v-for="conge in recentConges"
            :key="conge.id"
            class="flex items-center justify-between p-3 hover:bg-gray-50 rounded border border-gray-100"
          >
            <div>
              <p class="text-sm font-medium text-gray-800">
                {{ conge.motif || 'Congé' }}
              </p>
              <p class="text-xs text-gray-500">
                Du {{ formatDate(conge.dateDebut) }} au {{ formatDate(conge.dateFin) }}
              </p>
            </div>
            <div>
              <span
                :class="[
                  'px-2 py-1 text-xs font-semibold rounded-full',
                  getStatusClass(conge.statut),
                ]"
              >
                {{ formatStatus(conge.statut) }}
              </span>
            </div>
          </div>
        </div>
        <p v-else class="text-sm text-gray-500 text-center py-8">Aucune demande de congé récente</p>
        <router-link
          to="/employee/demande-conge"
          class="mt-4 block text-center text-[#0078d4] hover:underline text-sm font-medium"
        >
          Voir tous les congés
        </router-link>
      </div>

      <!-- Absences récentes -->
      <div class="bg-white rounded-sm shadow-sm border border-gray-200 p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-gray-700">Dernières absences</h3>
        </div>
        <div v-if="recentAbsences.length > 0" class="space-y-2">
          <div
            v-for="absence in recentAbsences"
            :key="absence.id"
            class="flex items-center justify-between p-3 hover:bg-gray-50 rounded border border-gray-100"
          >
            <div>
              <p class="text-sm font-medium text-gray-800">
                {{ formatDate(absence.date) }}
              </p>
              <p class="text-xs text-gray-500 truncate max-w-[200px]">
                {{ absence.motif || 'Sans motif' }}
              </p>
            </div>
            <div>
              <span
                :class="[
                  'px-2 py-1 text-xs font-semibold rounded-full',
                  getStatusClass(absence.statut),
                ]"
              >
                {{ formatStatus(absence.statut) }}
              </span>
            </div>
          </div>
        </div>
        <p v-else class="text-sm text-gray-500 text-center py-8">Aucune absence récente</p>
        <router-link
          to="/employee/demande-absence"
          class="mt-4 block text-center text-[#0078d4] hover:underline text-sm font-medium"
        >
          Voir toutes les absences
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import {authService} from '../../services/authService'

const authStore = useAuthStore()

const soldeCongeCount = ref(0)
const avanceCount = ref(0)
const absenceCount = ref(0)
const congeCount = ref(0)
const approvedAvancesCount = ref(0)
const pendingAvancesCount = ref(0)
const pendingCongesCount = ref(0)
const recentAvances = ref([])
const recentConges = ref([])
const recentAbsences = ref([])

const formatCurrency = (amount) => {
  if (!amount) return '0,00 DT'
  return new Intl.NumberFormat('fr-TN', {
    style: 'currency',
    currency: 'TND',
    minimumFractionDigits: 2,
  }).format(amount)
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  } catch (error) {
    console.error('Erreur de formatage de la date:', error)
    return dateString
  }
}

const normalizeStatus = (status) => {
  if (!status) return null
  return status.toLowerCase()
}

const formatStatus = (status) => {
  const s = normalizeStatus(status)
  if (s === 'en attente') return 'En attente'
  if (s === 'approuvée') return 'Approuvée'
  if (s === 'refusée') return 'Refusée'
  return 'Inconnu'
}

const getStatusClass = (status) => {
  const s = normalizeStatus(status)
  switch (s) {
    case 'en attente':
      return 'bg-yellow-100 text-yellow-800'
    case 'approuvée':
      return 'bg-green-100 text-green-800'
    case 'refusée':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const loadStats = async () => {
  try {
    const id = authStore.user?.id
    if (!id) throw new Error('Utilisateur non connecté')

    const [userInfo, avances, conges, absences] = await Promise.all([
      authService.getCompte(id),
      authService.getAvances(id),
      authService.getConges(id),
      authService.getMesDemandesAbsences(),
    ])

    soldeCongeCount.value = userInfo.soldeConges || 0

    const avancesList = avances || []
    avanceCount.value = avancesList.length
    approvedAvancesCount.value = avancesList.filter(
      (a) => a.statut?.toLowerCase() === 'approuvée',
    ).length
    pendingAvancesCount.value = avancesList.filter(
      (a) => a.statut?.toLowerCase() === 'en attente',
    ).length
    recentAvances.value = avancesList.slice(0, 3).map((a) => ({
      ...a,
      date: a.dateDemande,
    }))

    const congesList = conges || []
    congeCount.value = congesList.filter((c) => c.statut?.toLowerCase() === 'approuvée').length
    pendingCongesCount.value = congesList.filter(
      (c) => c.statut?.toLowerCase() === 'en attente',
    ).length
    recentConges.value = congesList.slice(0, 3)

    const absencesList = absences || []
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    absenceCount.value = absencesList.filter((abs) => {
      const absDate = new Date(abs.date)
      return absDate.getMonth() === currentMonth && absDate.getFullYear() === currentYear
    }).length
    recentAbsences.value = absencesList.slice(0, 3)
  } catch (error) {
    console.error('Erreur lors du chargement des statistiques:', error)
  }
}

onMounted(async () => {
  await loadStats()
})
</script>
