<template>
  <div class="h-screen bg-[#f3f2f1] flex flex-col overflow-hidden">
    <!-- Top Navbar -->
    <nav
      class="bg-[#0078d4] text-white px-4 h-12 flex items-center justify-between shadow-sm z-30 shrink-0"
    >
      <div class="flex items-center space-x-4">
        <button
          @click="sidebarOpen = !sidebarOpen"
          class="p-1 hover:bg-[#005a9e] rounded transition-colors"
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
        <router-link to="/admin/entreprises" class="p-1 hover:bg-[#005a9e] rounded">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
        </router-link>
        <span class="font-semibold tracking-tight">RH Platform</span>
        <span class="text-azure-300">|</span>
        <span class="text-sm">Employés - {{ entreprise?.nom }}</span>
      </div>
      <div class="flex items-center space-x-4 text-sm">
        <div class="flex items-center space-x-2 px-2 py-1">
          <div
            class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center font-bold text-xs uppercase"
          >
            {{ authStore.user?.prenom?.[0] }}{{ authStore.user?.nom?.[0] }}
          </div>
          <span class="hidden sm:inline"
            >{{ authStore.user?.prenom }} {{ authStore.user?.nom }}</span
          >
        </div>
        <button @click="handleLogout" class="p-1 hover:bg-[#005a9e] rounded" title="Déconnexion">
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
          'bg-white border-r border-gray-200 flex flex-col z-20 transition-all duration-300 ease-in-out shrink-0 overflow-hidden min-h-full',
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
                <router-link to="/admin/dashboard" class="hover:underline">Accueil</router-link>
                <span>/</span>
                <router-link to="/admin/entreprises" class="hover:underline"
                  >Entreprises</router-link
                >
                <span>/</span>
                <span class="text-gray-800 font-medium">Employés</span>
              </nav>
              <h1 class="text-2xl font-semibold text-gray-800">Gestion des Employés</h1>
              <p class="text-sm text-gray-600">
                Liste des collaborateurs de <strong>{{ entreprise?.nom }}</strong>
              </p>
            </div>
            <div class="mt-4 md:mt-0 flex items-center space-x-3">
              <button @click="showAddModal = true" class="ms-button shadow-sm">
                Nouvel Employé
              </button>
            </div>
          </div>

          <div class="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
            <div
              class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50"
            >
              <h3 class="text-sm font-semibold text-gray-700 whitespace-nowrap">
                Liste des Employés ({{ employes.length }})
              </h3>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm">
                <thead>
                  <tr class="bg-gray-50 text-gray-500 border-b border-gray-100">
                    <th class="px-6 py-3 font-semibold uppercase tracking-wider text-[10px]">
                      Nom & Prénom
                    </th>
                    <th class="px-6 py-3 font-semibold uppercase tracking-wider text-[10px]">
                      Email
                    </th>
                    <th
                      class="px-6 py-3 font-semibold uppercase tracking-wider text-[10px] text-right"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr
                    v-for="emp in employes"
                    :key="emp.id"
                    class="hover:bg-gray-50 transition-colors"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center space-x-3">
                        <div
                          class="w-8 h-8 bg-blue-50 text-[#0078d4] rounded flex items-center justify-center font-bold text-xs uppercase border border-blue-100"
                        >
                          {{ emp.prenom?.[0] }}{{ emp.nom?.[0] }}
                        </div>
                        <span class="font-medium text-gray-800"
                          >{{ emp.prenom }} {{ emp.nom }}</span
                        >
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-gray-600">{{ emp.email }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right">
                      <div class="flex justify-end items-center space-x-2">
                        <router-link
                          :to="`/admin/entreprises/${entrepriseId}/employes/${emp.id}/manage`"
                          class="px-2 py-1 text-[10px] font-bold text-[#0078d4] border border-[#0078d4] hover:bg-blue-50 rounded uppercase tracking-wider transition-colors"
                        >
                          Gérer
                        </router-link>
                        <button
                          @click="viewDetail(emp.id)"
                          class="px-2 py-1 text-[10px] font-bold text-gray-600 border border-gray-300 hover:bg-gray-100 rounded uppercase tracking-wider transition-colors"
                        >
                          Détails
                        </button>
                        <button
                          @click="confirmDelete(emp.id)"
                          class="px-2 py-1 text-[10px] font-bold text-red-600 border border-red-600 hover:bg-red-50 rounded uppercase tracking-wider transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="employes.length === 0" class="p-12 text-center text-gray-500 font-medium">
              Aucun employé trouvé
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Modals -->
    <AddEmployeModal
      :show="showAddModal"
      :loading="modalLoading"
      :AvoirSuperieur="superieur == null"
      @close="showAddModal = false"
      @submit="handleAddSubmit"
    />

    <DetailEmployeModal
      :show="showDetailModal"
      :employe="currentEmploye"
      @close="showDetailModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/auth'
import { authService } from '../../../services/authService'
import AddEmployeModal from '../../../components/admin/employes/AddEmployeModal.vue'
import DetailEmployeModal from '../../../components/admin/employes/DetailEmployeModal.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const entrepriseId = route.params.id
const entreprise = ref(null)
const employes = ref([])
const sidebarOpen = ref(true)
const showAddModal = ref(false)
const showDetailModal = ref(false)
const modalLoading = ref(false)
const currentEmploye = ref(null)
const superieur = ref({})

const loadData = async () => {
  const adminId = authStore.user?.id
  if (!adminId) {
    console.error('Admin ID not available')
    return
  }

  try {
    console.log('Loading data for entreprise:', entrepriseId, 'admin:', adminId)

    entreprise.value = await authService.getEntreprise(adminId, entrepriseId)
    console.log('Entreprise loaded:', entreprise.value)

    employes.value = await authService.getEmployes(adminId, entrepriseId)
    console.log('Employes loaded:', employes.value)
    superieur.value = employes.value.find((emp) => emp.role === 'Superieur')
  } catch (err) {
    console.error('Error loading data:', err)
    alert('Erreur lors du chargement des données')
  }
}

const handleAddSubmit = async (formData) => {
  modalLoading.value = true
  try {
    const adminId = authStore.user?.id
    console.log('Adding employee with data:', formData)

    await authService.addEmploye(adminId, entrepriseId, formData)
    await loadData()
    showAddModal.value = false
  } catch (err) {
    console.error('Error adding employee:', err)
    alert(err.response?.data?.message || "Erreur lors de la création de l'employé")
  } finally {
    modalLoading.value = false
  }
}

const viewDetail = async (empId) => {
  try {
    const adminId = authStore.user?.id
    console.log('Fetching details for employee ID:', empId)

    currentEmploye.value = await authService.getEmployeDetail(adminId, entrepriseId, empId)
    console.log('Employee details loaded:', currentEmploye.value)

    showDetailModal.value = true
  } catch (err) {
    console.error('Error fetching employee details:', err)
    alert('Erreur lors du chargement des détails')
  }
}

const confirmDelete = async (empId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
    try {
      const adminId = authStore.user?.id
      await authService.deleteEmploye(adminId, entrepriseId, empId)

      await loadData()
      alert('Employé supprimé avec succès')
    } catch (err) {
      console.error('Error deleting employee:', err)
      alert('Erreur lors de la suppression')
    }
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

onMounted(async () => {
  if (!authStore.user) {
    await authStore.fetchUser()
  }
  loadData()
})
</script>
