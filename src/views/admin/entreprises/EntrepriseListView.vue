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
        <span class="text-azure-300">|</span>
        <span class="text-sm">Gestion des Entreprises</span>
      </div>
      <div class="flex items-center space-x-4 text-sm">
        <div class="flex items-center space-x-2 px-2 py-1">
          <div
            class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center font-bold text-xs"
          >
            {{ authStore.user?.prenom?.[0] }}{{ authStore.user?.nom?.[0] }}
          </div>
          <span class="hidden sm:inline"
            >{{ authStore.user?.prenom }} {{ authStore.user?.nom }}</span
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
                <router-link to="/admin/dashboard" class="hover:underline">Accueil</router-link>
                <span>/</span>
                <span class="text-gray-800 font-medium">Entreprises</span>
              </nav>
              <h1 class="text-2xl font-semibold text-gray-800">Gestion des Entreprises</h1>
              <p class="text-sm text-gray-600">
                Administrez les données générales de vos entreprises partenaires.
              </p>
            </div>
            <div class="mt-4 md:mt-0 flex items-center space-x-3">
              <div class="bg-gray-200 p-0.5 rounded-sm flex items-center mr-2">
                <button
                  @click="viewMode = 'table'"
                  :class="[
                    'p-1.5 rounded-sm transition-all',
                    viewMode === 'table'
                      ? 'bg-white shadow-sm text-[#0078d4]'
                      : 'text-gray-500 hover:text-gray-700',
                  ]"
                  title="Vue Tableau"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                  </svg>
                </button>
                <button
                  @click="viewMode = 'grid'"
                  :class="[
                    'p-1.5 rounded-sm transition-all',
                    viewMode === 'grid'
                      ? 'bg-white shadow-sm text-[#0078d4]'
                      : 'text-gray-500 hover:text-gray-700',
                  ]"
                  title="Vue Cartes"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    ></path>
                  </svg>
                </button>
              </div>
              <button @click="showAddModal = true" class="ms-button flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                <span>Nouvelle Entreprise</span>
              </button>
            </div>
          </div>

          <!-- Enterprise Grid/Card View -->
          <div
            v-if="viewMode === 'grid'"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            <div
              v-for="ent in entreprises"
              :key="ent.id"
              class="bg-white border border-gray-200 shadow-sm rounded-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div class="p-5 border-b border-gray-100 flex items-start justify-between">
                <div class="flex items-center space-x-4">
                  <div
                    class="w-12 h-12 bg-blue-50 text-[#0078d4] rounded flex items-center justify-center font-bold text-lg border border-blue-100"
                  >
                    {{ ent.nom?.[0] }}
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-800 leading-tight">{{ ent.nom }}</h3>
                    <span
                      class="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase border border-green-100 mt-1 inline-block"
                      >Actif</span
                    >
                  </div>
                </div>
                <div class="flex items-center space-x-1">
                  <button
                    @click="openEditModal(ent)"
                    class="p-1.5 text-gray-400 hover:text-[#0078d4] hover:bg-blue-50 rounded transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    @click="removeEntreprise(ent.id)"
                    class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="p-5 flex-1 space-y-4">
                <div class="flex items-center text-sm text-gray-600">
                  <svg
                    class="w-4 h-4 mr-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span class="truncate">{{ ent.email }}</span>
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <svg
                    class="w-4 h-4 mr-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  <span>{{ ent.telephone }}</span>
                </div>
                <div class="flex items-start text-sm text-gray-600">
                  <svg
                    class="w-4 h-4 mr-3 text-gray-400 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  <span>{{ ent.adresse }}</span>
                </div>
              </div>
              <div
                class="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center"
              >
                <router-link
                  :to="`/admin/entreprises/${ent.id}`"
                  class="text-[#0078d4] text-xs font-bold hover:underline uppercase tracking-wider"
                >
                  Gérer les employés
                </router-link>
                <svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Enterprise Table/List -->
          <div
            v-if="viewMode === 'table'"
            class="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden"
          >
            <div
              class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50"
            >
              <h3 class="text-sm font-semibold text-gray-700">
                Liste des Entreprises ({{ entreprises.length }})
              </h3>
              <div class="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  class="text-xs border border-gray-300 px-8 py-1.5 focus:border-[#0078d4] focus:outline-none w-64 rounded-sm"
                />
                <svg
                  class="w-4 h-4 absolute left-2.5 top-1.5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm">
                <thead>
                  <tr class="bg-gray-50 text-gray-500 border-b border-gray-100">
                    <th class="px-6 py-3 font-semibold uppercase tracking-wider text-[10px]">
                      Nom
                    </th>
                    <th class="px-6 py-3 font-semibold uppercase tracking-wider text-[10px]">
                      Email
                    </th>
                    <th class="px-6 py-3 font-semibold uppercase tracking-wider text-[10px]">
                      Localisation
                    </th>
                    <th class="px-6 py-3 font-semibold uppercase tracking-wider text-[10px]">
                      Status
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
                    v-for="ent in entreprises"
                    :key="ent.id"
                    class="hover:bg-gray-50 transition-colors"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center space-x-3">
                        <div
                          class="w-8 h-8 bg-blue-50 text-[#0078d4] rounded flex items-center justify-center font-bold text-xs"
                        >
                          {{ ent.nom?.[0] }}
                        </div>
                        <span class="font-medium text-gray-800">{{ ent.nom }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-gray-600">{{ ent.email }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-gray-600">{{ ent.adresse }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded-full border border-green-100 uppercase tracking-tighter"
                        >Actif</span
                      >
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right">
                      <div class="flex justify-end space-x-3">
                        <button
                          @click="openEditModal(ent)"
                          class="text-[#0078d4] hover:text-[#106ebe]"
                          title="Modifier"
                        >
                          <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            ></path>
                          </svg>
                        </button>
                        <button
                          @click="removeEntreprise(ent.id)"
                          class="text-red-500 hover:text-red-700"
                          title="Supprimer"
                        >
                          <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="entreprises.length === 0" class="p-12 text-center">
              <div
                class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-4"
              >
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
              </div>
              <p class="text-gray-500 font-medium">Aucune entreprise trouvée</p>
              <button
                @click="showAddModal = true"
                class="text-[#0078d4] text-xs hover:underline mt-1 font-medium"
              >
                Commencer par en ajouter une
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Add Enterprise Modal Component -->
    <AddEntrepriseModal
      :show="showAddModal"
      :loading="modalLoading"
      @close="showAddModal = false"
      @submit="handleAddSubmit"
    />

    <!-- Edit Enterprise Modal Component -->
    <EditEntrepriseModal
      :show="showEditModal"
      :loading="modalLoading"
      :entreprise="currentEntreprise"
      @close="showEditModal = false"
      @submit="handleEditSubmit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../../stores/auth'
import { authService } from '../../../services/authService'
import { useRouter } from 'vue-router'
import AddEntrepriseModal from '../../../components/admin/entreprises/AddEntrepriseModal.vue'
import EditEntrepriseModal from '../../../components/admin/entreprises/EditEntrepriseModal.vue'

const authStore = useAuthStore()
const router = useRouter()

const sidebarOpen = ref(true)
const showAddModal = ref(false)
const showEditModal = ref(false)
const viewMode = ref('table') // 'table' or 'grid'
const currentEntreprise = ref(null)
const loading = ref(false)
const modalLoading = ref(false)
const entreprises = ref([])

const loadEntreprises = async () => {
  const adminId = authStore.user?.id
  if (adminId === undefined || adminId === null) {
    return
  }
  loading.value = true
  try {
    entreprises.value = await authService.getEntreprises(adminId)
    console.log('Loaded entreprises:', entreprises.value)
  } catch (error) {
    console.error('Error loading entreprises:', error)
  } finally {
    loading.value = false
  }
}

const handleAddSubmit = async (formData) => {
  modalLoading.value = true
  try {
    const adminId = authStore.user?.id
    if (adminId === undefined || adminId === null) {
      console.error('Admin ID is missing', authStore.user)
      return
    }
    await authService.addEntreprise(adminId, formData)
    await loadEntreprises()
    showAddModal.value = false
  } catch (error) {
    console.error('Error adding entreprise:', error)
  } finally {
    modalLoading.value = false
  }
}

const openEditModal = (entreprise) => {
  currentEntreprise.value = entreprise
  showEditModal.value = true
}

const handleEditSubmit = async (formData) => {
  modalLoading.value = true
  try {
    const adminId = authStore.user?.id
    const entrepriseId = currentEntreprise.value?.id
    if (!adminId || !entrepriseId) {
      console.error('Missing IDs for update:', { adminId, entrepriseId })
      return
    }
    await authService.updateEntreprise(adminId, entrepriseId, formData)
    await loadEntreprises()
    showEditModal.value = false
  } catch (error) {
    console.error('Error updating entreprise:', error)
  } finally {
    modalLoading.value = false
  }
}

const removeEntreprise = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) {
    try {
      const adminId = authStore.user?.id
      if (!adminId) {
        console.error('Admin ID is missing for delete')
        return
      }
      await authService.deleteEntreprise(adminId, id)
      await loadEntreprises()
    } catch (error) {
      console.error('Error deleting entreprise:', error)
    }
  }
}

onMounted(async () => {
  if (!authStore.user) {
    try {
      await authStore.fetchUser()
      if (authStore.user) {
        await loadEntreprises()
      }
    } catch (error) {
      console.error('Failed to fetch user during mount:', error)
    }
  } else {
    loadEntreprises()
  }
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
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
