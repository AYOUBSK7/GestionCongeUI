<template>
  <div class="h-screen bg-[#f3f2f1] flex flex-col overflow-hidden">
    <!-- Top Navbar -->
    <nav
      class="bg-[#0078d4] text-white px-4 h-12 flex items-center justify-between shadow-sm z-30 flex-shrink-0"
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
        <router-link
          :to="`/admin/entreprises/${entrepriseId}`"
          class="p-1 hover:bg-[#005a9e] rounded"
        >
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
        <span class="text-sm">Gestion Employé: {{ employe?.prenom }} {{ employe?.nom }}</span>
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
      </div>
    </nav>

    <div class="flex flex-1 overflow-hidden relative">
      <!-- Sidebar -->
      <aside
        :class="[
          'bg-white border-r border-gray-200 flex flex-col z-20 transition-all duration-300 ease-in-out h-full flex-shrink-0 overflow-hidden',
          sidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full',
        ]"
      >
        <div class="w-64 flex flex-col h-full">
          <div class="p-4 border-b border-gray-100 flex-shrink-0">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Gestion Employé
            </p>
          </div>
          <nav class="flex-1 overflow-y-auto py-2">
            <button
              @click="activeTab = 'info'"
              :class="[
                'w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4',
                activeTab === 'info'
                  ? 'bg-blue-50 text-[#0078d4] border-[#0078d4]'
                  : 'text-gray-700 border-transparent hover:bg-gray-100',
              ]"
            >
              Détails Employé
            </button>
            <button
              @click="activeTab = 'poste'"
              :class="[
                'w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4',
                activeTab === 'poste'
                  ? 'bg-blue-50 text-[#0078d4] border-[#0078d4]'
                  : 'text-gray-700 border-transparent hover:bg-gray-100',
              ]"
            >
              Gérer Poste
            </button>
            <button
              @click="activeTab = 'contrat'"
              :class="[
                'w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4',
                activeTab === 'contrat'
                  ? 'bg-blue-50 text-[#0078d4] border-[#0078d4]'
                  : 'text-gray-700 border-transparent hover:bg-gray-100',
              ]"
            >
              Gérer Contrat
            </button>
            <button
              @click="activeTab = 'permission'"
              :class="[
                'w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4',
                activeTab === 'permission'
                  ? 'bg-blue-50 text-[#0078d4] border-[#0078d4]'
                  : 'text-gray-700 border-transparent hover:bg-gray-100',
              ]"
            >
              Gérer Permission
            </button>
          </nav>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto bg-[#f3f2f1] p-4 md:p-8">
        <div class="max-w-4xl mx-auto">
          <!-- Informations personnelles -->
          <div class="bg-white p-6 shadow-sm rounded-sm border border-gray-200 mb-6">
            <div class="flex items-center space-x-4">
              <div
                class="w-16 h-16 bg-[#0078d4] text-white flex items-center justify-center text-2xl font-bold rounded-full"
              >
                {{ employe ? (employe.prenom || '?')[0] + (employe.nom || '?')[0] : '??' }}
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h2 class="text-xl font-bold text-gray-800">
                    {{ employe?.prenom }} {{ employe?.nom }}
                  </h2>
                  <button @click="showEditModal = true" class="ms-button-secondary">
                    Modifier
                  </button>
                </div>
                <p class="text-sm text-gray-500">{{ employe?.email }}</p>
                <p class="text-xs text-gray-400 mt-1">
                  ID: {{ employe?.identifiant }} | Solde: {{ employe?.soldeConges }} jours
                </p>
              </div>
            </div>
          </div>
          <!-- Main Content Sections -->
          <div v-if="activeTab === 'info'" class="space-y-6">
            <div class="bg-white p-6 shadow-sm rounded-sm border border-gray-200">
              <h3 class="text-lg font-bold text-gray-800 mb-6">Informations détaillées</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Nom complet
                    </p>
                    <p class="text-sm font-medium text-gray-800">
                      {{ employe?.prenom }} {{ employe?.nom }}
                    </p>
                  </div>
                  <div>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Email professionnel
                    </p>
                    <p class="text-sm font-medium text-gray-800">{{ employe?.email }}</p>
                  </div>
                  <div>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Adresse
                    </p>
                    <p class="text-sm font-medium text-gray-800">
                      {{ employe?.adresse || 'Non renseignée' }}
                    </p>
                  </div>
                </div>
                <div class="space-y-4">
                  <div>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Identifiant interne
                    </p>
                    <p class="text-sm font-medium text-gray-800">{{ employe?.identifiant }}</p>
                  </div>
                  <div>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Solde de congés
                    </p>
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {{ employe?.soldeConges }} jours disponibles
                    </span>
                  </div>
                  <div>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Permissions
                    </p>
                    <div class="flex flex-wrap gap-2 mt-1">
                      <span
                        v-for="p in employe?.permissions"
                        :key="p.nomPermission"
                        class="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-bold uppercase"
                      >
                        {{ p.nomPermission }}
                      </span>
                      <p v-if="!employe?.permissions?.length" class="text-sm text-gray-400 italic">
                        Aucune permission spécifique
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Résumé Poste & Contrat Actuel -->
              <div class="mt-8 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-4 bg-gray-50 rounded-sm border border-gray-100">
                  <h4 class="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Poste actuel
                  </h4>
                  <div v-if="employe?.poste">
                    <p class="text-sm font-bold text-[#0078d4]">{{ employe.poste.titrePoste }}</p>
                    <p class="text-[10px] text-gray-500 mt-1">
                      Depuis le {{ formatDate(employe.poste.dateDebut) }}
                    </p>
                  </div>
                  <p v-else class="text-sm text-gray-400 italic">Aucun poste assigné</p>
                </div>
                <div class="p-4 bg-gray-50 rounded-sm border border-gray-100">
                  <h4 class="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    Contrat en cours
                  </h4>
                  <div v-if="employe?.contrat">
                    <p class="text-sm font-bold text-[#0078d4]">
                      {{ employe.contrat.typeContrat }}
                    </p>
                    <p class="text-[10px] text-gray-500 mt-1">
                      Début: {{ formatDate(employe.contrat.dateDebut) }}
                    </p>
                  </div>
                  <p v-else class="text-sm text-gray-400 italic">Aucun contrat actif</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Poste Form -->
          <div v-if="activeTab === 'poste'" class="space-y-6">
            <div
              v-if="IsValidToAddPoste"
              class="bg-white p-6 shadow-sm rounded-sm border border-gray-200"
            >
              <h3 class="text-lg font-bold text-gray-800 mb-6">Gérer le poste</h3>
              <form @submit.prevent="submitPoste" class="space-y-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-500 uppercase mb-1"
                    >Titre du Poste</label
                  >
                  <input v-model="posteForm.titre" type="text" class="ms-input" required />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-gray-500 uppercase mb-1"
                      >Date Début</label
                    >
                    <input v-model="posteForm.dateDebut" type="date" class="ms-input" required />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-gray-500 uppercase mb-1"
                      >Date Fin (Optionnel)</label
                    >
                    <input v-model="posteForm.dateFin" type="date" class="ms-input" />
                  </div>
                </div>
                <button type="submit" :disabled="loading" class="ms-button w-full">
                  Enregistrer
                </button>
              </form>
            </div>

            <!-- Historique Poste au dessous -->
            <div class="bg-white shadow-sm rounded-sm border border-gray-200">
              <div class="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 class="font-bold text-gray-800 uppercase text-xs">Historique des Postes</h3>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                  <thead>
                    <tr class="bg-gray-50 text-gray-500 border-b border-gray-100">
                      <th class="px-6 py-3 font-semibold text-[10px] uppercase">Poste</th>
                      <th class="px-6 py-3 font-semibold text-[10px] uppercase">Début</th>
                      <th class="px-6 py-3 font-semibold text-[10px] uppercase">Fin</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    <tr v-for="p in paginatedPostes" :key="p.Id || p.id" class="hover:bg-gray-50">
                      <td class="px-6 py-4 font-medium text-gray-800">
                        {{ p.TitrePoste || p.titrePoste }}
                      </td>
                      <td class="px-6 py-4">{{ formatDate(p.DateDebut || p.dateDebut) }}</td>
                      <td class="px-6 py-4">
                        {{ p.DateFin || p.dateFin ? formatDate(p.DateFin || p.dateFin) : 'Actuel' }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  v-if="history.postes.length === 0"
                  class="p-8 text-center text-gray-500 text-xs"
                >
                  Aucun historique de poste
                </div>
                <!-- Pagination -->
                <div
                  v-if="history.postes.length > pageSize"
                  class="p-4 border-t border-gray-50 flex justify-between items-center bg-gray-50/30"
                >
                  <span class="text-[10px] text-gray-500 uppercase font-bold"
                    >Page {{ pagination.poste }} sur
                    {{ Math.ceil(history.postes.length / pageSize) }}</span
                  >
                  <div class="flex space-x-2">
                    <button
                      @click="pagination.poste--"
                      :disabled="pagination.poste === 1"
                      class="p-1 disabled:opacity-30"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 19l-7-7 7-7"
                        ></path>
                      </svg>
                    </button>
                    <button
                      @click="pagination.poste++"
                      :disabled="pagination.poste >= Math.ceil(history.postes.length / pageSize)"
                      class="p-1 disabled:opacity-30"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contrat Form -->
          <div v-if="activeTab === 'contrat'" class="space-y-6">
            <div class="bg-white p-6 shadow-sm rounded-sm border border-gray-200">
              <h3 class="text-lg font-bold text-gray-800 mb-6">Gérer le contrat</h3>

              <form @submit.prevent="submitContrat" class="space-y-4">
                <!-- Type Contrat -->
                <div>
                  <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">
                    Type de Contrat
                  </label>
                  <select v-model="contratForm.typeContrat" class="ms-input" required>
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="SIVP">SIVP</option>
                    <option value="Karama">Karama</option>
                  </select>
                </div>

                <!-- Salaire Mensuel -->
                <div>
                  <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">
                    Salaire Mensuel (TND)
                  </label>
                  <input
                    v-model="contratForm.salaireParMois"
                    type="number"
                    min="0"
                    step="0.01"
                    class="ms-input"
                    placeholder="ex: 1200"
                    required
                  />
                </div>

                <!-- Dates -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">
                      Date Début
                    </label>
                    <input v-model="contratForm.dateDebut" type="date" class="ms-input" required />
                  </div>

                  <div>
                    <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">
                      Date Fin (Optionnel)
                    </label>
                    <input v-model="contratForm.dateFin" type="date" class="ms-input" />
                  </div>
                </div>

                <button type="submit" :disabled="loading" class="ms-button w-full">
                  Enregistrer
                </button>
              </form>
            </div>

            <!-- Historique Contrats -->
            <div class="bg-white shadow-sm rounded-sm border border-gray-200">
              <div class="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 class="font-bold text-gray-800 uppercase text-xs">Historique des Contrats</h3>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                  <thead>
                    <tr class="bg-gray-50 text-gray-500 border-b border-gray-100">
                      <th class="px-6 py-3 font-semibold text-[10px] uppercase">Type</th>
                      <th class="px-6 py-3 font-semibold text-[10px] uppercase">Salaire</th>
                      <th class="px-6 py-3 font-semibold text-[10px] uppercase">Début</th>
                      <th class="px-6 py-3 font-semibold text-[10px] uppercase">Fin</th>
                    </tr>
                  </thead>

                  <tbody class="divide-y divide-gray-100">
                    <tr v-for="c in paginatedContrats" :key="c.id || c.Id" class="hover:bg-gray-50">
                      <td class="px-6 py-4 font-medium text-gray-800">
                        {{ c.typeContrat || c.TypeContrat }}
                      </td>
                      <td class="px-6 py-4">{{ c.salaireParMois || c.SalaireParMois }} TND</td>
                      <td class="px-6 py-4">
                        {{ formatDate(c.dateDebut || c.DateDebut) }}
                      </td>
                      <td class="px-6 py-4">
                        {{ c.dateFinContrat ? formatDate(c.dateFinContrat) : 'Actuel' }}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div
                  v-if="history.contrats.length === 0"
                  class="p-8 text-center text-gray-500 text-xs"
                >
                  Aucun historique de contrat
                </div>
              </div>
            </div>
          </div>

          <!-- Permission Interface -->
          <div v-if="activeTab === 'permission'" class="space-y-6">
            <div class="bg-white p-6 shadow-sm rounded-sm border border-gray-200">
              <h3 class="text-lg font-bold text-gray-800 mb-6">Gérer les Permissions</h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Permissions Non Autorisées -->
                <div class="border border-gray-200 rounded-sm overflow-hidden">
                  <div class="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <h4 class="text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Permissions non autorisées
                    </h4>
                  </div>
                  <div class="p-4 space-y-3 min-h-[200px]">
                    <div
                      v-for="perm in unauthorizedPermissions"
                      :key="perm"
                      @click="addPermission(perm)"
                      class="p-3 border border-gray-200 rounded-lg hover:border-[#0078d4] hover:bg-blue-50 cursor-pointer transition-all flex items-center justify-between group"
                    >
                      <span class="text-sm font-medium text-gray-700">{{ perm }}</span>
                      <span
                        class="text-[10px] text-[#0078d4] font-bold opacity-0 group-hover:opacity-100 uppercase tracking-tighter"
                      >
                        Ajouter
                      </span>
                    </div>
                    <p
                      v-if="unauthorizedPermissions.length === 0"
                      class="text-xs text-gray-400 italic text-center mt-8"
                    >
                      Toutes les permissions sont accordées
                    </p>
                  </div>
                </div>

                <!-- Permissions Autorisées -->
                <div class="border border-gray-200 rounded-sm overflow-hidden">
                  <div class="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <h4 class="text-xs font-bold text-[#0078d4] uppercase tracking-wider">
                      Permissions Autorisées
                    </h4>
                  </div>
                  <div class="p-4 space-y-3 min-h-[200px]">
                    <div
                      v-for="perm in authorizedPermissions"
                      :key="perm"
                      @click="removePermission(perm)"
                      class="p-3 border border-blue-100 bg-blue-50 rounded-lg hover:border-red-300 hover:bg-red-50 cursor-pointer transition-all flex items-center justify-between group"
                    >
                      <span class="text-sm font-bold text-[#0078d4] group-hover:text-red-600">{{
                        perm
                      }}</span>
                      <span
                        class="text-[10px] text-red-600 font-bold opacity-0 group-hover:opacity-100 uppercase tracking-tighter"
                      >
                        Supprimer
                      </span>
                    </div>
                    <p
                      v-if="authorizedPermissions.length === 0"
                      class="text-xs text-gray-400 italic text-center mt-8"
                    >
                      Aucune permission accordée
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <EditEmployeModal
      :show="showEditModal"
      :loading="modalLoading"
      :employe="employe"
      @close="showEditModal = false"
      @submit="handleEditSubmit"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../../stores/auth'
import { authService } from '../../../services/authService'
import EditEmployeModal from '../../../components/admin/employes/EditEmployeModal.vue'

const route = useRoute()
const authStore = useAuthStore()

const employeId = route.params.employeId
const entrepriseId = route.params.entrepriseId
const sidebarOpen = ref(true)
const activeTab = ref('info')
const loading = ref(false)
const modalLoading = ref(false)
const showEditModal = ref(false)
const employe = ref(null)
const IsValidToAddPoste = ref(true)

const availablePermissions = ['GERER_AVANCE', 'GERER_CONGE','GERER_ABSENCE']

const authorizedPermissions = computed(() => {
  return employe.value?.permissions?.map((p) => p.nomPermission) || []
})

const unauthorizedPermissions = computed(() => {
  return availablePermissions.filter((p) => !authorizedPermissions.value.includes(p))
})

const addPermission = async (permissionName) => {
  loading.value = true
  try {
    const adminId = authStore.user?.id
    await authService.addPermission(adminId, entrepriseId, employeId, permissionName)
    await loadEmploye()
  } catch (error) {
    console.error('Error adding permission:', error)
    alert("Erreur lors de l'ajout de la permission")
  } finally {
    loading.value = false
  }
}

const removePermission = async (permissionName) => {
  loading.value = true
  try {
    const adminId = authStore.user?.id
    await authService.deletePermission(adminId, entrepriseId, employeId, permissionName)
    await loadEmploye()
  } catch (error) {
    console.error('Error removing permission:', error)
    alert('Erreur lors de la suppression de la permission')
  } finally {
    loading.value = false
  }
}

const handleEditSubmit = async (formData) => {
  modalLoading.value = true
  try {
    const adminId = authStore.user?.id || authStore.user?.Id
    await authService.updateEmploye(adminId, entrepriseId, employeId, formData)
    await loadEmploye()
    showEditModal.value = false
  } catch (error) {
    console.error('Error updating employe:', error)
    alert('Erreur lors de la mise à jour')
  } finally {
    modalLoading.value = false
  }
}
const history = reactive({
  postes: [],
  contrats: [],
})

const pageSize = 5
const pagination = reactive({
  poste: 1,
  contrat: 1,
})

const paginatedPostes = computed(() => {
  const start = (pagination.poste - 1) * pageSize
  return [...history.postes].reverse().slice(start, start + pageSize)
})

const paginatedContrats = computed(() => {
  const start = (pagination.contrat - 1) * pageSize
  return [...history.contrats].reverse().slice(start, start + pageSize)
})

const posteForm = reactive({ titre: '', dateDebut: '', dateFin: '' })
const contratForm = reactive({ typeContrat: 'CDI', dateDebut: '', dateFin: '' })

const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('fr-FR')
}

const loadEmploye = async () => {
  const adminId = authStore.user?.id
  if (!adminId) {
    console.error('Admin ID not available')
    return
  }

  try {
    // Charger les détails de l'employé
    employe.value = await authService.getEmployeDetail(adminId, entrepriseId, employeId)

    // Charger l'historique
    const [p, c] = await Promise.all([
      authService.getPostes(employeId),
      authService.getContrats(employeId),
    ])

    history.postes = p
    history.contrats = c
    IsValidToAddPoste.value = c.find((ct) => ct.dateFinContrat > Date.now()) ? false : true
  } catch (err) {
    console.error('Error loading employee details or history:', err)
  }
}

const submitPoste = async () => {
  loading.value = true
  try {
    const adminId = authStore.user?.id

    await authService.addPoste(adminId, entrepriseId, employeId, {
      titre: posteForm.titre,
      debut: posteForm.dateDebut,
      fin: posteForm.dateFin || null,
    })

    // Reset form
    posteForm.titre = ''
    posteForm.dateDebut = ''
    posteForm.dateFin = ''

    // Reload data
    await loadEmploye()
  } catch (err) {
    console.error('Error adding poste:', err)
  } finally {
    loading.value = false
  }
}

const submitContrat = async () => {
  loading.value = true
  try {
    const adminId = authStore.user?.id

    await authService.addContrat(adminId, entrepriseId, employeId, {
      type: contratForm.typeContrat,
      debut: contratForm.dateDebut,
      fin: contratForm.dateFin || null,
      salaireParMois: contratForm.salaireParMois,
    })

    // Reset
    contratForm.typeContrat = 'CDI'
    contratForm.dateDebut = ''
    contratForm.dateFin = ''
    contratForm.salaireParMois = 0

    await loadEmploye()
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (!authStore.user) {
    await authStore.fetchUser()
  }
  loadEmploye()
})
</script>
