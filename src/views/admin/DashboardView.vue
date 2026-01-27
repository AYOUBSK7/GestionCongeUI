<template>
  <div class="h-screen bg-[#f3f2f1] flex flex-col overflow-hidden">
    <!-- Top Navbar -->
    <nav
      class="bg-[#0078d4] text-white px-4 h-12 flex items-center justify-between shadow-sm z-30 shrink-0"
    >
      <div class="flex items-center space-x-4">
        <button
          @click="sidebarOpen = !sidebarOpen"
          class="p-1 hover:bg-azure-hover rounded transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <span class="font-semibold tracking-tight">RH Platform</span>
        <span class="text-azure-300 hidden md:inline">|</span>
        <span class="text-sm hidden md:inline">Portail RH Multi-entreprises</span>
      </div>
      <div class="flex items-center space-x-4 text-sm">
        <div
          class="flex items-center space-x-2 px-2 py-1 hover:bg-azure-hover cursor-pointer rounded"
        >
          <div
            class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center font-bold text-xs"
          >
            {{ authStore.user?.prenom?.[0] || '' }}{{ authStore.user?.nom?.[0] || '' }}
          </div>
          <span class="hidden sm:inline"
            >{{ authStore.user?.prenom || '' }} {{ authStore.user?.nom || '' }}</span
          >
        </div>
        <button @click="handleLogout" class="p-1 hover:bg-azure-hover rounded" title="Déconnexion">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>
        </button>
      </div>
    </nav>

    <div class="flex flex-1 overflow-hidden relative">
      <!-- Overlay for mobile -->
      <div
        v-if="sidebarOpen"
        @click="sidebarOpen = false"
        class="fixed inset-0 bg-black/20 z-10 md:hidden"
      ></div>

      <!-- Sidebar -->
      <aside
        :class="[
          'bg-white border-r border-gray-200 flex flex-col z-20 transition-all duration-300 ease-in-out h-full shrink-0 overflow-hidden',
          sidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:w-0 md:translate-x-0',
        ]"
      >
        <div class="w-64 flex flex-col h-full">
          <div class="p-4 border-b border-gray-100 shrink-0">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation</p>
          </div>
          <nav class="flex-1 overflow-y-auto py-2">
            <router-link
              to="/admin/dashboard"
              class="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 text-gray-700 border-l-4 border-transparent"
              active-class="bg-[#f3f2f1] !text-[#0078d4] !border-[#0078d4]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              <span class="text-sm font-medium">Vue d'ensemble</span>
            </router-link>
            <router-link
              to="/admin/entreprises"
              class="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 text-gray-700 border-l-4 border-transparent"
              active-class="bg-[#f3f2f1] !text-[#0078d4] !border-[#0078d4]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
              <span class="text-sm font-medium">Entreprises</span>
            </router-link>
          </nav>
          <div class="p-4 bg-gray-50 border-t border-gray-100 shrink-0">
            <div class="bg-blue-50 p-3 rounded-lg">
              <p class="text-xs text-[#0078d4] font-medium">Besoin d'aide ?</p>
              <p class="text-[10px] text-gray-600 mt-1">
                Consultez la documentation ou contactez le support.
              </p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto bg-[#f3f2f1] p-4 md:p-8">
        <div class="max-w-6xl mx-auto">
          <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <nav class="flex text-xs text-gray-500 mb-2 space-x-2">
                <span>Accueil</span>
                <span>/</span>
                <span class="text-gray-800 font-medium">Tableau de bord</span>
              </nav>
              <h1 class="text-2xl font-semibold text-gray-800">Tableau de bord</h1>
              <p class="text-sm text-gray-600">Bienvenue, voici un aperçu de vos activités RH.</p>
            </div>
            <div class="mt-4 md:mt-0 flex space-x-3">
              <button
                class="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 flex items-center space-x-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  ></path>
                </svg>
                <span>Exporter</span>
              </button>
              <router-link
                to="/admin/entreprises"
                class="ms-button text-sm flex items-center space-x-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                <span>Ajouter entreprise</span>
              </router-link>
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div
              class="bg-white shadow-sm border border-gray-200 p-5 rounded-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div class="flex items-center justify-between mb-4">
                <span class="text-gray-500 text-xs font-semibold uppercase">Entreprises</span>
                <div class="p-2 bg-blue-50 text-[#0078d4] rounded-lg">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    ></path>
                  </svg>
                </div>
              </div>
              <p class="text-3xl font-light text-gray-800">{{ entreprises.length }}</p>
              <p class="text-xs text-blue-600 mt-2 flex items-center">
                Total des entreprises
              </p>
            </div>

            <div
              class="bg-white shadow-sm border border-gray-200 p-5 rounded-sm hover:shadow-md transition-shadow"
            >
              <div class="flex items-center justify-between mb-4">
                <span class="text-gray-500 text-xs font-semibold uppercase">Employés</span>
                <div class="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </div>
              </div>
              <p class="text-3xl font-light text-gray-800">{{ totalEmployesCount }}</p>
              <p class="text-xs text-purple-600 mt-2">Total des employés</p>
            </div>

            <div
              class="bg-white shadow-sm border border-gray-200 p-5 rounded-sm hover:shadow-md transition-shadow"
            >
              <div class="flex items-center justify-between mb-4">
                <span class="text-gray-500 text-xs font-semibold uppercase">Alertes Contrats</span>
                <div class="p-2 bg-red-50 text-red-600 rounded-lg">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
              </div>
              <p class="text-3xl font-light text-gray-800">{{ alertesContrats.length }}</p>
              <p class="text-xs text-red-600 mt-2">Fin de contrat proche</p>
            </div>

            <div
              class="bg-white shadow-sm border border-gray-200 p-5 rounded-sm hover:shadow-md transition-shadow"
            >
              <div class="flex items-center justify-between mb-4">
                <span class="text-gray-500 text-xs font-semibold uppercase">Alertes Postes</span>
                <div class="p-2 bg-orange-50 text-orange-600 rounded-lg">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    ></path>
                  </svg>
                </div>
              </div>
              <p class="text-3xl font-light text-gray-800">{{ alertesPostes.length }}</p>
              <p class="text-xs text-orange-600 mt-2">Fin de mission proche</p>
            </div>
          </div>

          <!-- Secondary Section -->
          <div class="grid grid-cols-1 gap-6">
            <!-- Alerts Detail Panel -->
            <div
              v-if="alertesContrats.length > 0 || alertesPostes.length > 0"
              class="bg-white shadow-sm border border-gray-200 p-5 rounded-sm"
            >
              <div class="flex items-center justify-between mb-6">
                <h3 class="font-semibold text-gray-800">Détails des alertes critiques</h3>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-if="alertesContrats.length > 0" class="space-y-2">
                  <h4 class="text-xs font-bold text-red-600 uppercase tracking-wider">Contrats expirant bientôt</h4>
                  <div v-for="(alerte, index) in alertesContrats" :key="'contrat-' + index" class="p-3 bg-red-50 border border-red-100 rounded-lg flex justify-between items-center">
                    <div>
                      <p class="text-sm font-medium text-gray-800">{{ alerte.employeNom }}</p>
                      <p class="text-[10px] text-gray-500">{{ alerte.typeContrat }} - {{ alerte.entrepriseNom }}</p>
                    </div>
                    <span class="text-xs font-semibold text-red-700">{{ new Date(alerte.dateFin).toLocaleDateString() }}</span>
                  </div>
                </div>
                <div v-if="alertesPostes.length > 0" class="space-y-2">
                  <h4 class="text-xs font-bold text-orange-600 uppercase tracking-wider">Postes expirant bientôt</h4>
                  <div v-for="(alerte, index) in alertesPostes" :key="'poste-' + index" class="p-3 bg-orange-50 border border-orange-100 rounded-lg flex justify-between items-center">
                    <div>
                      <p class="text-sm font-medium text-gray-800">{{ alerte.employeNom }}</p>
                      <p class="text-[10px] text-gray-500">{{ alerte.titrePoste }} - {{ alerte.entrepriseNom }}</p>
                    </div>
                    <span class="text-xs font-semibold text-orange-700">{{ new Date(alerte.dateFin).toLocaleDateString() }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-white shadow-sm border border-gray-200 p-5 rounded-sm hover:shadow-md transition-shadow"
            >
              <div class="flex items-center justify-between mb-6">
                <h3 class="font-semibold text-gray-800">Entreprises récentes</h3>
                <router-link
                  to="/admin/entreprises"
                  class="text-xs text-[#0078d4] hover:underline font-medium"
                  >Voir tout</router-link
                >
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  v-for="ent in recentEntreprises"
                  :key="ent.id"
                  :class="[
                    'flex items-center justify-between p-3 rounded-lg border transition-all relative bg-gray-50 border-transparent hover:border-gray-100',
                  ]"
                >
                  <div class="flex items-center space-x-3">
                    <div
                      :class="[
                        'w-10 h-10 rounded flex items-center justify-center bg-gray-100 text-[#0078d4]',
                      ]"
                    >
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <p :class="['text-sm font-medium text-gray-800']">
                        {{ ent.nom }}
                      </p>
                      <p class="text-[10px] text-gray-500">{{ ent.adresse }}</p>
                    </div>
                  </div>
                  <span
                    v-if="ent.statut === 'Actif'"
                    class="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-semibold rounded uppercase"
                    >{{ ent.statut }}</span
                  >
                  <span
                    v-else
                    class="px-2 py-1 bg-red-50 text-red-600 text-[10px] font-semibold rounded uppercase"
                    >{{ ent.statut }}</span
                  >
                </div>
              </div>
              <div
                v-if="recentEntreprises.length === 0"
                class="text-center text-gray-500 text-sm py-4"
              >
                Aucune entreprise
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { authService } from '../../services/authService'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const sidebarOpen = ref(true)
const entreprises = ref([])
const totalEmployesCount = ref(0)
const loading = ref(true)
const alertesContrats = ref([])
const alertesPostes = ref([])

const recentEntreprises = computed(() => {
  return entreprises.value.slice(0, 5)
})

const loadStats = async () => {
  if (!authStore.user?.id) return

  try {
    const adminId = authStore.user.id
    entreprises.value = await authService.getEntreprises(adminId)

    try {
      const data = await authService.getExpirations(adminId)
      alertesContrats.value = data.contrats || []
      alertesPostes.value = data.postes || []
    } catch (err) {
      console.error('Error loading expiration details:', err)
    }

    let totalEmps = 0
    for (const ent of entreprises.value) {
      const emps = await authService.getEmployes(adminId, ent.id)
      totalEmps += emps.length
    }

    totalEmployesCount.value = totalEmps

  } catch (error) {
    console.error('Error loading dashboard stats:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (!authStore.user) {
    await authStore.fetchUser()
  }
  loadStats()
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
