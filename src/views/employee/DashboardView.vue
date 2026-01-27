<template>
  <div class="h-screen bg-[#f3f2f1] flex flex-col overflow-hidden">
    <!-- Top Navbar -->
    <nav class="bg-[#0078d4] text-white px-4 h-12 flex items-center justify-between shadow-sm z-30 shrink-0">
      <div class="flex items-center space-x-4">
        <button @click="sidebarOpen = !sidebarOpen" class="p-1 hover:bg-[#005a9e] rounded transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <span class="font-semibold tracking-tight">RH Platform</span>
        <span class="text-azure-300 hidden md:inline">|</span>
        <span class="text-sm hidden md:inline">Portail RH Multi-entreprises</span>
      </div>
      <div class="flex items-center space-x-4 text-sm">
        <div class="flex items-center space-x-2 px-2 py-1 hover:bg-[#005a9e] cursor-pointer rounded">
          <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center font-bold text-xs">
            {{ authStore.user?.prenom?.[0] || '' }}{{ authStore.user?.nom?.[0] || '' }}
          </div>
          <span class="hidden sm:inline">{{ authStore.user?.prenom || '' }} {{ authStore.user?.nom || '' }}</span>
        </div>
        <button @click="handleLogout" class="p-1 hover:bg-[#005a9e] rounded" title="Déconnexion">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
        </button>
      </div>
    </nav>

    <div class="flex flex-1 overflow-hidden relative">
      <!-- Overlay for mobile -->
      <div v-if="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 bg-black/20 z-10 md:hidden"></div>

      <!-- Sidebar -->
      <aside :class="[
          'bg-white border-r border-gray-200 flex flex-col z-20 transition-all duration-300 ease-in-out h-full shrink-0 overflow-hidden',
          sidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:w-0 md:translate-x-0',
        ]">
        <div class="w-64 flex flex-col h-full">
          <div class="p-4 border-b border-gray-100 shrink-0">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation</p>
          </div>
          <nav class="flex-1 overflow-y-auto py-2">
            <!-- Tableau de bord -->
            <button @click="activeTab = 'dashboard'" :class="[
                'w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4',
                activeTab === 'dashboard'
                  ? 'bg-[#f3f2f1] text-[#0078d4] border-[#0078d4]'
                  : 'text-gray-700 border-transparent hover:bg-gray-100'
              ]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span class="text-sm font-medium">Tableau de bord</span>
            </button>

            <!-- Mon compte -->
            <button @click="activeTab = 'mon-compte'" :class="[
                'w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4',
                activeTab === 'mon-compte'
                  ? 'bg-[#f3f2f1] text-[#0078d4] border-[#0078d4]'
                  : 'text-gray-700 border-transparent hover:bg-gray-100'
              ]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span class="text-sm font-medium">Mon compte</span>
            </button>

            <!-- Demande Congé - Uniquement pour les employés SANS permission GERER_CONGE -->
            <button v-if="!hasPermission('GERER_CONGE')" @click="activeTab = 'demande-conge'" :class="[
                'w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4',
                activeTab === 'demande-conge'
                  ? 'bg-[#f3f2f1] text-[#0078d4] border-[#0078d4]'
                  : 'text-gray-700 border-transparent hover:bg-gray-100'
              ]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-sm font-medium">Demande Congé</span>
            </button>

            <!-- Demande Avance Salaire - Uniquement pour les employés SANS permission GERER_AVANCE -->
            <button v-if="!hasPermission('GERER_AVANCE')" @click="activeTab = 'demande-avance'" :class="[
                'w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4',
                activeTab === 'demande-avance'
                  ? 'bg-[#f3f2f1] text-[#0078d4] border-[#0078d4]'
                  : 'text-gray-700 border-transparent hover:bg-gray-100'
              ]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm font-medium">Demande Avance</span>
            </button>

            <!-- Demande Absence - Uniquement pour les employés SANS permission GERER_ABSENCE -->
            <button v-if="!hasPermission('GERER_ABSENCE')" @click="activeTab = 'demande-absence'" :class="[
                'w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4',
                activeTab === 'demande-absence'
                  ? 'bg-[#f3f2f1] text-[#0078d4] border-[#0078d4]'
                  : 'text-gray-700 border-transparent hover:bg-gray-100'
              ]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm font-medium">Déclarer une absence</span>
            </button>

            <!-- Gestion des Congés - Pour ceux avec permission GERER_CONGE -->
            <button v-if="hasPermission('GERER_CONGE')" @click="activeTab = 'gestion-conges'" :class="[
                'w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4',
                activeTab === 'gestion-conges'
                  ? 'bg-[#f3f2f1] text-[#0078d4] border-[#0078d4]'
                  : 'text-gray-700 border-transparent hover:bg-gray-100'
              ]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm font-medium">Gérer les Congés</span>
            </button>

            <!-- Gestion des Avances - Pour ceux avec permission GERER_AVANCE -->
            <button v-if="hasPermission('GERER_AVANCE')" @click="activeTab = 'gestion-avances'" :class="[
                'w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4',
                activeTab === 'gestion-avances'
                  ? 'bg-[#f3f2f1] text-[#0078d4] border-[#0078d4]'
                  : 'text-gray-700 border-transparent hover:bg-gray-100'
              ]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm font-medium">Gérer les Avances</span>
            </button>

            <!-- Gestion des Absences - Pour ceux avec permission GERER_ABSENCE -->
            <button v-if="hasPermission('GERER_ABSENCE')" @click="activeTab = 'gestion-absences'" :class="[
                'w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4',
                activeTab === 'gestion-absences'
                  ? 'bg-[#f3f2f1] text-[#0078d4] border-[#0078d4]'
                  : 'text-gray-700 border-transparent hover:bg-gray-100'
              ]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm font-medium">Gérer les Absences</span>
            </button>
          </nav>

          <div class="p-4 bg-gray-50 border-t border-gray-100 shrink-0">
            <div class="bg-blue-50 p-3 rounded-lg">
              <p class="text-xs text-[#0078d4] font-medium">Besoin d'aide ?</p>
              <p class="text-[10px] text-gray-600 mt-1">Consultez la documentation ou contactez le support.</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto bg-[#f3f2f1] p-4 md:p-8">
        <div class="max-w-6xl mx-auto">
          <!-- Header Dynamique -->
          <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <nav class="flex text-xs text-gray-500 mb-2 space-x-2">
                <span>Accueil</span>
                <span>/</span>
                <span class="text-gray-800 font-medium">{{ getActiveTabTitle() }}</span>
              </nav>
              <h1 class="text-2xl font-semibold text-gray-800">{{ getActiveTabTitle() }}</h1>
              <p class="text-sm text-gray-600">{{ getActiveTabDescription() }}</p>
            </div>
            
            <!-- Boutons Dynamiques -->
            <div class="mt-4 md:mt-0 flex items-center space-x-3">
              <button v-if="activeTab === 'dashboard'" @click="loadStats" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 flex items-center space-x-2" :disabled="isLoading">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <span>{{ isLoading ? 'Chargement...' : 'Actualiser' }}</span>
              </button>

              <button v-if="activeTab === 'gestion-conges' || activeTab === 'gestion-avances' || activeTab === 'gestion-absences'" 
                      @click="refreshDemandes" 
                      class="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 flex items-center space-x-2" 
                      :disabled="loadingDemandes">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <span>{{ loadingDemandes ? 'Chargement...' : 'Actualiser' }}</span>
              </button>
            </div>
          </div>

          <!-- Tableau de bord -->
          <div v-if="activeTab === 'dashboard'" class="space-y-8">
            <!-- Section pour les employés SANS permissions de gestion -->
            <div v-if="!isSuperviseur">
              <!-- Stats Grid pour employés normaux -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <!-- Solde Congé -->
                <div class="bg-white shadow-sm border border-gray-200 p-5 rounded-sm hover:shadow-md transition-shadow">
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-gray-500 text-xs font-semibold uppercase">Solde congé</span>
                    <div class="p-2 bg-blue-50 text-[#0078d4] rounded-lg">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                    </div>
                  </div>
                  <p class="text-3xl font-light text-gray-800">{{ SoldeCongeCount }}</p>
                  <p class="text-xs text-gray-500 mt-2">jours restants</p>
                </div>

                <!-- Avances demandées -->
                <div class="bg-white shadow-sm border border-gray-200 p-5 rounded-sm hover:shadow-md transition-shadow">
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-gray-500 text-xs font-semibold uppercase">Demandes d'avance</span>
                    <div class="p-2 bg-purple-50 text-purple-600 rounded-lg">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <p class="text-3xl font-light text-gray-800">{{ AvanceCount }}</p>
                  <div class="flex justify-between text-xs mt-2">
                    <span class="text-green-600">{{ ApprovedAvancesCount }} approuvées</span>
                    <span class="text-yellow-600">{{ PendingAvancesCount }} en attente</span>
                  </div>
                </div>

                <!-- Absences ce mois -->
                <div class="bg-white shadow-sm border border-gray-200 p-5 rounded-sm hover:shadow-md transition-shadow">
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-gray-500 text-xs font-semibold uppercase">Absences ce mois</span>
                    <div class="p-2 bg-orange-50 text-orange-600 rounded-lg">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <p class="text-3xl font-light text-gray-800">{{ AbsenceCount }}</p>
                  <p class="text-xs text-gray-500 mt-2">jours d'absence ce mois</p>
                </div>

                <!-- Congés approuvés -->
                <div class="bg-white shadow-sm border border-gray-200 p-5 rounded-sm hover:shadow-md transition-shadow">
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-gray-500 text-xs font-semibold uppercase">Congés approuvés</span>
                    <div class="p-2 bg-green-50 text-green-600 rounded-lg">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <p class="text-3xl font-light text-gray-800">{{ CongeCount }}</p>
                  <div class="flex justify-between text-xs mt-2">
                    <span class="text-green-600">{{ CongeCount }} validés</span>
                    <span class="text-yellow-600">{{ PendingCongesCount }} en attente</span>
                  </div>
                </div>
              </div>

              <!-- Section des activités récentes pour employés -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <!-- Avances récentes -->
                <div class="bg-white shadow-sm border border-gray-200 rounded-sm overflow-hidden">
                  <div class="px-5 py-4 border-b border-gray-100">
                    <h3 class="text-lg font-semibold text-gray-800">Dernières demandes d'avance</h3>
                  </div>
                  <div class="p-5">
                    <div v-if="RecentAvances.length > 0" class="space-y-3">
                      <div v-for="avance in RecentAvances" :key="avance.id" class="flex items-center justify-between p-3 hover:bg-gray-50 rounded border border-gray-100">
                        <div>
                          <p class="text-sm font-medium text-gray-800">{{ formatCurrency(avance.montant) }}</p>
                          <p class="text-xs text-gray-500 truncate max-w-[200px]">{{ avance.motif || 'Sans motif' }}</p>
                        </div>
                        <div class="flex flex-col items-end">
                          <span class="text-xs text-gray-500">{{ formatDate(avance.date) }}</span>
                          <span :class="['mt-1 px-2 py-1 text-xs font-semibold rounded-full', getStatusClass(avance.statut)]">{{ formatStatus(avance.statut) }}</span>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-center text-gray-500 text-sm py-8">Aucune demande d'avance récente</div>
                    <div class="mt-4">
                      <button @click="activeTab = 'demande-avance'" class="text-sm text-[#0078d4] hover:text-[#106ebe] font-medium flex items-center">
                        Voir toutes les avances
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Congés récents -->
                <div class="bg-white shadow-sm border border-gray-200 rounded-sm overflow-hidden">
                  <div class="px-5 py-4 border-b border-gray-100">
                    <h3 class="text-lg font-semibold text-gray-800">Dernières demandes de congé</h3>
                  </div>
                  <div class="p-5">
                    <div v-if="RecentConges.length > 0" class="space-y-3">
                      <div v-for="conge in RecentConges" :key="conge.id" class="flex items-center justify-between p-3 hover:bg-gray-50 rounded border border-gray-100">
                        <div>
                          <p class="text-sm font-medium text-gray-800">{{ conge.motif || 'Congé' }}</p>
                          <p class="text-xs text-gray-500">Du {{ formatDate(conge.dateDebut) }} au {{ formatDate(conge.dateFin) }}</p>
                        </div>
                        <div>
                          <span :class="['px-2 py-1 text-xs font-semibold rounded-full', getStatusClass(conge.statut)]">{{ formatStatus(conge.statut) }}</span>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-center text-gray-500 text-sm py-8">Aucune demande de congé récente</div>
                    <div class="mt-4">
                      <button @click="activeTab = 'demande-conge'" class="text-sm text-[#0078d4] hover:text-[#106ebe] font-medium flex items-center">
                        Voir tous les congés
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Absences récentes -->
                <div class="bg-white shadow-sm border border-gray-200 rounded-sm overflow-hidden">
                  <div class="px-5 py-4 border-b border-gray-100">
                    <h3 class="text-lg font-semibold text-gray-800">Dernières absences</h3>
                  </div>
                  <div class="p-5">
                    <div v-if="RecentAbsences.length > 0" class="space-y-3">
                      <div v-for="absence in RecentAbsences" :key="absence.id" class="flex items-center justify-between p-3 hover:bg-gray-50 rounded border border-gray-100">
                        <div>
                          <p class="text-sm font-medium text-gray-800">{{ formatDate(absence.date) }}</p>
                          <p class="text-xs text-gray-500 truncate max-w-[200px]">{{ absence.motif || 'Sans motif' }}</p>
                        </div>
                        <div>
                          <span :class="['px-2 py-1 text-xs font-semibold rounded-full', getStatusClass(absence.statut)]">{{ formatStatus(absence.statut) }}</span>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-center text-gray-500 text-sm py-8">Aucune absence récente</div>
                    <div class="mt-4">
                      <button @click="activeTab = 'demande-absence'" class="text-sm text-[#0078d4] hover:text-[#106ebe] font-medium flex items-center">
                        Voir toutes les absences
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section pour ceux AVEC permissions de gestion -->
            <div v-if="isSuperviseur" class="bg-white rounded-lg shadow p-6">
              <div class="text-center">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">
                  {{ UserInfo?.RoleEmployee === 'Superieur' ? 'Tableau de bord Superviseur' : 'Tableau de bord Gestionnaire' }}
                </h2>
                <p class="text-gray-600 mb-8">Vous avez accès aux fonctionnalités de gestion selon vos permissions</p>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  <!-- Gestion des Congés -->
                  <div v-if="hasPermission('GERER_CONGE')" @click="activeTab = 'gestion-conges'" class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md cursor-pointer transition-shadow">
                    <div class="flex items-center justify-center mb-4">
                      <div class="p-3 bg-blue-50 text-blue-600 rounded-full">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Gérer les Congés</h3>
                    <p class="text-sm text-gray-600">Approuver ou refuser les demandes de congé</p>
                    <div class="mt-4 text-blue-600 font-medium">
                      <span>Accéder →</span>
                    </div>
                  </div>

                  <!-- Gestion des Avances -->
                  <div v-if="hasPermission('GERER_AVANCE')" @click="activeTab = 'gestion-avances'" class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md cursor-pointer transition-shadow">
                    <div class="flex items-center justify-center mb-4">
                      <div class="p-3 bg-purple-50 text-purple-600 rounded-full">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Gérer les Avances</h3>
                    <p class="text-sm text-gray-600">Approuver ou refuser les demandes d'avance</p>
                    <div class="mt-4 text-purple-600 font-medium">
                      <span>Accéder →</span>
                    </div>
                  </div>

                  <!-- Gestion des Absences -->
                  <div v-if="hasPermission('GERER_ABSENCE')" @click="activeTab = 'gestion-absences'" class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md cursor-pointer transition-shadow">
                    <div class="flex items-center justify-center mb-4">
                      <div class="p-3 bg-orange-50 text-orange-600 rounded-full">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Gérer les Absences</h3>
                    <p class="text-sm text-gray-600">Approuver ou refuser les déclarations d'absence</p>
                    <div class="mt-4 text-orange-600 font-medium">
                      <span>Accéder →</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Gestion des Congés -->
          <div v-if="activeTab === 'gestion-conges' && hasPermission('GERER_CONGE')" class="space-y-6">
            <div class="bg-white shadow-sm border border-gray-200 p-5 rounded-sm hover:shadow-md transition-shadow">
              <h2 class="text-lg font-semibold text-gray-800 mb-4">Demandes de congés en attente</h2>
              
              <div v-if="loadingDemandes" class="text-center py-8">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p class="text-gray-500 mt-2">Chargement des demandes...</p>
              </div>
              
              <div v-else-if="demandesCongesEnAttente.length === 0" class="text-center text-gray-500 py-8">
                Aucune demande de congé en attente d'approbation
              </div>
              
              <div v-else class="space-y-4">
                <div v-for="demande in demandesCongesEnAttente" :key="demande.id" class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="font-medium text-gray-800">{{ demande.nomEmploye || 'Employé' }} {{ demande.prenomEmploye || '' }}</h3>
                      <p class="text-sm text-gray-600 mt-1">
                        Du {{ formatDate(demande.dateDebut) }} au {{ formatDate(demande.dateFin) }}
                      </p>
                      <p class="text-sm text-gray-600">Motif: {{ demande.motif || 'Non spécifié' }}</p>
                      <p class="text-sm text-gray-600">Durée: {{ demande.nombreJours || calculateDaysBetween(demande.dateDebut, demande.dateFin) }} jours</p>
                      <p class="text-xs text-gray-500 mt-2">Demande reçue le {{ formatDate(demande.dateCreation || demande.dateDemande) }}</p>
                    </div>
                    
                    <div class="flex space-x-2">
                      <button
                        @click="approuverDemande('conge', demande.id)"
                        class="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 transition-colors"
                      >
                        Approuver
                      </button>
                      <button
                        @click="refuserDemande('conge', demande.id)"
                        class="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors"
                      >
                        Refuser
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Gestion des Avances -->
          <div v-if="activeTab === 'gestion-avances' && hasPermission('GERER_AVANCE')" class="space-y-6">
            <div class="bg-white shadow-sm border border-gray-200 p-5 rounded-sm hover:shadow-md transition-shadow">
              <h2 class="text-lg font-semibold text-gray-800 mb-4">Demandes d'avances en attente</h2>
              
              <div v-if="loadingDemandes" class="text-center py-8">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p class="text-gray-500 mt-2">Chargement des demandes...</p>
              </div>
              
              <div v-else-if="demandesAvancesEnAttente.length === 0" class="text-center text-gray-500 py-8">
                Aucune demande d'avance en attente d'approbation
              </div>
              
              <div v-else class="space-y-4">
                <div v-for="demande in demandesAvancesEnAttente" :key="demande.id" class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="font-medium text-gray-800">{{ demande.nomEmploye || 'Employé' }} {{ demande.prenomEmploye || '' }}</h3>
                      <p class="text-lg font-bold text-gray-800 mt-1">{{ formatCurrency(demande.montant) }}</p>
                      <p class="text-sm text-gray-600">Motif: {{ demande.motif || 'Non spécifié' }}</p>
                      <p class="text-sm text-gray-600">Solde restant: {{ formatCurrency(demande.soldeRestant) }}</p>
                      <p class="text-xs text-gray-500 mt-2">Demande reçue le {{ formatDate(demande.dateDemande) }}</p>
                    </div>
                    
                    <div class="flex space-x-2">
                      <button
                        @click="approuverDemande('avance', demande.id)"
                        class="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 transition-colors"
                      >
                        Approuver
                      </button>
                      <button
                        @click="refuserDemande('avance', demande.id)"
                        class="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors"
                      >
                        Refuser
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Gestion des Absences -->
          <div v-if="activeTab === 'gestion-absences' && hasPermission('GERER_ABSENCE')" class="space-y-6">
            <div class="bg-white shadow-sm border border-gray-200 p-5 rounded-sm hover:shadow-md transition-shadow">
              <h2 class="text-lg font-semibold text-gray-800 mb-4">Demandes d'absence en attente</h2>
              
              <div v-if="loadingDemandes" class="text-center py-8">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p class="text-gray-500 mt-2">Chargement des demandes...</p>
              </div>
              
              <div v-else-if="demandesAbsencesEnAttente.length === 0" class="text-center text-gray-500 py-8">
                Aucune demande d'absence en attente d'approbation
              </div>
              
              <div v-else class="space-y-4">
                <div v-for="demande in demandesAbsencesEnAttente" :key="demande.id" class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="font-medium text-gray-800">{{ demande.employeNom || 'Employé' }}</h3>
                      <p class="text-sm text-gray-600 mt-1">
                        Date: {{ formatDate(demande.date) }}
                      </p>
                      <p class="text-sm text-gray-600">Motif: {{ demande.motif || 'Non spécifié' }}</p>
                      <p class="text-xs text-gray-500 mt-2">Demande reçue le {{ formatDate(demande.dateTraitement || demande.dateCreation) }}</p>
                    </div>
                    
                    <div class="flex space-x-2">
                      <button
                        @click="approuverDemande('absence', demande.id)"
                        class="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 transition-colors"
                      >
                        Approuver
                      </button>
                      <button
                        @click="refuserDemandeAbsence(demande.id)"
                        class="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors"
                      >
                        Refuser
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Demande Avance Salaire -->
          <div v-if="activeTab === 'demande-avance' && !hasPermission('GERER_AVANCE')" class="space-y-6">
            <!-- Vérification des avances actives -->
            <div v-if="hasActiveAvance" class="mb-6">
              <div :class="[
                'border rounded-md p-4',
                activeAvanceStatus === 'pending' || activeAvanceStatus === 'en attente' ? 'bg-yellow-50 border-yellow-200' :
                activeAvanceStatus === 'approved' || activeAvanceStatus === 'approuvée' ? 'bg-green-50 border-green-200' :
                'bg-blue-50 border-blue-200'
              ]">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg :class="[
                      'h-5 w-5',
                      activeAvanceStatus === 'pending' || activeAvanceStatus === 'en attente' ? 'text-yellow-400' :
                      activeAvanceStatus === 'approved' || activeAvanceStatus === 'approuvée' ? 'text-green-400' :
                      'text-blue-400'
                    ]" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 :class="[
                      'text-sm font-medium',
                      activeAvanceStatus === 'pending' || activeAvanceStatus === 'en attente' ? 'text-yellow-800' :
                      activeAvanceStatus === 'approved' || activeAvanceStatus === 'approuvée' ? 'text-green-800' :
                      'text-blue-800'
                    ]">
                      {{
                        activeAvanceStatus === 'pending' || activeAvanceStatus === 'en attente' ? 'Vous avez une demande d\'avance en attente' :
                        activeAvanceStatus === 'approved' || activeAvanceStatus === 'approuvée' ? 'Vous avez une avance approuvée' :
                        'Information sur votre avance'
                      }}
                    </h3>
                    <div :class="[
                      'mt-2 text-sm',
                      activeAvanceStatus === 'pending' || activeAvanceStatus === 'en attente' ? 'text-yellow-700' :
                      activeAvanceStatus === 'approved' || activeAvanceStatus === 'approuvée' ? 'text-green-700' :
                      'text-blue-700'
                    ]">
                      <p><strong>Montant :</strong> {{ formatCurrency(activeAvanceAmount) }}</p>
                      <p class="mt-1"><strong>Statut :</strong> {{ formatStatus(activeAvanceStatus) }}</p>
                      <p v-if="activeAvanceStatus === 'pending' || activeAvanceStatus === 'en attente'" class="mt-2">Vous ne pouvez pas soumettre une nouvelle demande tant que celle-ci est en cours de traitement.</p>
                      <p v-else-if="activeAvanceStatus === 'approved' || activeAvanceStatus === 'approuvée'" class="mt-2">Vous devez rembourser cette avance avant de pouvoir en demander une nouvelle.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Formulaire de demande -->
            <div class="bg-white shadow-sm border border-gray-200 p-5 rounded-sm hover:shadow-md transition-shadow">
              <h2 class="text-lg font-semibold text-gray-800 mb-4">Nouvelle Demande d'Avance</h2>
              
              <div class="space-y-6">
                <!-- Montant -->
                <div>
                  <label class="text-xs text-gray-500 block mb-2 font-medium">Montant (DT) *</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span class="text-gray-500 text-sm">DT</span>
                    </div>
                    <input type="number" v-model="demandeAvance.montant" min="0.01" step="0.01" :disabled="hasActiveAvance" class="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#0078d4] focus:border-[#0078d4] disabled:bg-gray-100 disabled:text-gray-500" placeholder="0.00" />
                  </div>
                </div>

                <!-- Motif -->
                <div>
                  <label class="text-xs text-gray-500 block mb-2 font-medium">Motif *</label>
                  <textarea v-model="demandeAvance.motif" rows="4" :disabled="hasActiveAvance" class="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#0078d4] focus:border-[#0078d4] disabled:bg-gray-100 disabled:text-gray-500" placeholder="Décrivez le motif de votre demande d'avance..."></textarea>
                </div>

                <!-- Bouton de soumission -->
                <div class="pt-2">
                  <button @click="submitDemandeAvance" :disabled="!canSubmit" :class="[
                      'w-full px-4 py-3 text-sm font-medium rounded-sm transition-colors',
                      canSubmit 
                        ? 'bg-[#0078d4] text-white hover:bg-[#106ebe]' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    ]">
                    {{ submitButtonText }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Historique des avances -->
            <div class="mt-8">
              <div class="bg-white shadow-sm border border-gray-200 rounded-sm hover:shadow-md transition-shadow overflow-hidden">
                <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 class="text-lg font-semibold text-gray-800">Historique des Avances</h2>
                  <span class="text-xs text-gray-500">{{ Avances.length }} demandes</span>
                </div>
                
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">Date de demande</th>
                        <th class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">Montant</th>
                        <th class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">Motif</th>
                        <th class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">Statut</th>
                        <th class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                      <tr v-for="avance in Avances" :key="avance.id" class="hover:bg-gray-50 transition-colors">
                        <td class="py-3 px-4 text-sm text-gray-800">{{ formatDate(avance.dateDemande || avance.createdAt) }}</td>
                        <td class="py-3 px-4"><span class="text-sm font-semibold text-gray-800">{{ formatCurrency(avance.montant) }}</span></td>
                        <td class="py-3 px-4 text-sm text-gray-800"><p class="max-w-[200px] truncate">{{ avance.motif }}</p></td>
                        <td class="py-3 px-4">
                          <span :class="['px-3 py-1 text-xs font-semibold rounded-full', getStatusClass(avance.statut)]">{{ formatStatus(avance.statut) }}</span>
                        </td>
                        <td class="py-3 px-4">
                          <div class="flex space-x-2">
                            <button v-if="isPending(avance.statut)" @click="annulerDemandeAvance(avance.id)" class="px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded transition-colors" title="Supprimer la demande">Supprimer</button>
                            <span v-if="isApproved(avance.statut)" class="text-xs text-gray-500 italic">Non modifiable</span>
                            <span v-if="isRejected(avance.statut)" class="text-xs text-gray-500 italic">Refusé</span>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="Avances.length === 0">
                        <td colspan="5" class="py-8 text-center text-gray-500">Aucun historique d'avances disponible</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Demande Congé -->
          <div v-if="activeTab === 'demande-conge' && !hasPermission('GERER_CONGE')" class="space-y-6">
            <!-- Formulaire de demande -->
            <div class="bg-white shadow-sm border border-gray-200 p-5 rounded-sm hover:shadow-md transition-shadow">
              <h2 class="text-lg font-semibold text-gray-800 mb-4">Nouvelle Demande de Congé</h2>
              
              <div class="space-y-4">
                <!-- Dates -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="text-xs text-gray-500 block mb-2 font-medium">Date de début *</label>
                    <input type="date" v-model="demandeConge.dateDebut" :min="minDate" class="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#0078d4] focus:border-[#0078d4]" />
                  </div>
                  <div>
                    <label class="text-xs text-gray-500 block mb-2 font-medium">Date de fin *</label>
                    <input type="date" v-model="demandeConge.dateFin" :min="demandeConge.dateDebut || minDate" class="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#0078d4] focus:border-[#0078d4]" />
                  </div>
                </div>

                <!-- Motif -->
                <div>
                  <label class="text-xs text-gray-500 block mb-2 font-medium">Motif *</label>
                  <textarea v-model="demandeConge.motif" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#0078d4] focus:border-[#0078d4]" placeholder="Décrivez le motif de votre congé..." required></textarea>
                </div>

                <!-- Calcul de durée -->
                <div v-if="demandeConge.dateDebut && demandeConge.dateFin" class="bg-gray-50 p-3 rounded">
                  <p class="text-xs text-gray-600">
                    Durée estimée : <span class="font-medium">{{ calculateDuration() }} jour(s)</span>
                    <span v-if="calculateDuration() > userSoldeConges" class="text-red-500 ml-2">(Solde insuffisant)</span>
                  </p>
                </div>

                <!-- Bouton de soumission -->
                <div class="pt-2">
                  <button @click="submitDemandeConge" :disabled="!isFormValid || calculateDuration() > userSoldeConges" :class="[
                      'w-full px-4 py-3 text-sm font-medium rounded-sm transition-colors',
                      isFormValid && calculateDuration() <= userSoldeConges
                        ? 'bg-[#0078d4] text-white hover:bg-[#106ebe]' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    ]">Soumettre la demande</button>
                </div>
              </div>
            </div>

            <!-- Historique des congés -->
            <div class="mt-8">
              <div class="bg-white shadow-sm border border-gray-200 rounded-sm hover:shadow-md transition-shadow overflow-hidden">
                <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 class="text-lg font-semibold text-gray-800">Historique des Congés</h2>
                  <span class="text-xs text-gray-500">{{ Conges.length }} demandes</span>
                </div>
                
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">Date de début</th>
                        <th class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">Date de fin</th>
                        <th class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">Motif</th>
                        <th class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">Durée</th>
                        <th class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">Statut</th>
                        <th class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                      <tr v-for="conge in Conges" :key="conge.id" class="hover:bg-gray-50 transition-colors">
                        <td class="py-3 px-4 text-sm text-gray-800">{{ formatDate(conge.dateDebut) }}</td>
                        <td class="py-3 px-4 text-sm text-gray-800">{{ formatDate(conge.dateFin) }}</td>
                        <td class="py-3 px-4 text-sm text-gray-800"><p class="max-w-[200px] truncate">{{ conge.motif }}</p></td>
                        <td class="py-3 px-4 text-sm text-gray-800">{{ calculateDaysBetween(conge.dateDebut, conge.dateFin) }} jours</td>
                        <td class="py-3 px-4">
                          <span :class="['px-3 py-1 text-xs font-semibold rounded-full', getStatusClass(conge.statut)]">{{ formatStatus(conge.statut) }}</span>
                        </td>
                        <td class="py-3 px-4">
                          <div class="flex space-x-2">
                            <button v-if="isPending(conge.statut)" @click="annulerDemandeConge(conge.id)" class="px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded transition-colors" title="Supprimer la demande">Supprimer</button>
                            <span v-if="isApproved(conge.statut)" class="text-xs text-gray-500 italic">Non modifiable</span>
                            <span v-if="isRejected(conge.statut)" class="text-xs text-gray-500 italic">Refusé</span>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="Conges.length === 0">
                        <td colspan="6" class="py-8 text-center text-gray-500">Aucun historique de congés disponible</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Demande Absence -->
          <div v-if="activeTab === 'demande-absence' && !hasPermission('GERER_ABSENCE')" class="space-y-6">
            <!-- Formulaire de demande -->
            <div class="bg-white shadow-sm border border-gray-200 p-5 rounded-sm hover:shadow-md transition-shadow">
              <h2 class="text-lg font-semibold text-gray-800 mb-4">Nouvelle Déclaration d'Absence</h2>
              
              <div class="space-y-4">
                <!-- Date d'absence -->
                <div>
                  <label class="text-xs text-gray-500 block mb-2 font-medium">Date d'absence *</label>
                  <input 
                    type="date" 
                    v-model="demandeAbsence.date" 
                    :min="minDate" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#0078d4] focus:border-[#0078d4]" 
                    required
                  />
                </div>

                <!-- Motif -->
                <div>
                  <label class="text-xs text-gray-500 block mb-2 font-medium">Motif *</label>
                  <textarea 
                    v-model="demandeAbsence.motif" 
                    rows="4" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#0078d4] focus:border-[#0078d4]" 
                    placeholder="Indiquez le motif de votre absence..." 
                    required
                  ></textarea>
                </div>

                <!-- Bouton de soumission -->
                <div class="pt-2">
                  <button 
                    @click="submitDemandeAbsence" 
                    :disabled="!isFormValidAbsence" 
                    :class="[
                      'w-full px-4 py-3 text-sm font-medium rounded-sm transition-colors',
                      isFormValidAbsence
                        ? 'bg-[#0078d4] text-white hover:bg-[#106ebe]' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    ]"
                  >
                    Déclarer l'absence
                  </button>
                </div>
              </div>
            </div>

            <!-- Historique des absences -->
            <div class="mt-8">
              <div class="bg-white shadow-sm border border-gray-200 rounded-sm hover:shadow-md transition-shadow overflow-hidden">
                <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 class="text-lg font-semibold text-gray-800">Historique des Absences</h2>
                  <span class="text-xs text-gray-500">{{ Absences.length }} déclarations</span>
                </div>
                
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                          Date
                        </th>
                        <th class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                          Motif
                        </th>
                        <th class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                          Statut
                        </th>
                        <th class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                          Paiement
                        </th>
                        <th class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                      <tr 
                        v-for="absence in Absences" 
                        :key="absence.id" 
                        class="hover:bg-gray-50 transition-colors"
                      >
                        <td class="py-3 px-4 text-sm text-gray-800">
                          {{ formatDate(absence.date) }}
                        </td>
                        <td class="py-3 px-4 text-sm text-gray-800">
                          <p class="max-w-[200px] truncate">{{ absence.motif || '—' }}</p>
                        </td>
                        <td class="py-3 px-4">
                          <span :class="[
                            'px-3 py-1 text-xs font-semibold rounded-full', 
                            getStatusClass(absence.statut)
                          ]">
                            {{ formatStatus(absence.statut) }}
                          </span>
                        </td>
                        <td class="py-3 px-4 text-sm text-gray-800">
                          <span v-if="absence.priseEnComptePaiement" class="text-green-600">
                            ✓ Payée
                          </span>
                          <span v-else class="text-gray-500">
                            Non payée
                          </span>
                        </td>
                        <td class="py-3 px-4">
                          <div class="flex space-x-2">
                            <button 
                              v-if="isPending(absence.statut)" 
                              @click="annulerDemandeAbsence(absence.id)" 
                              class="px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded transition-colors" 
                              title="Supprimer la demande"
                            >
                              Supprimer
                            </button>
                            <span v-if="isApproved(absence.statut)" class="text-xs text-gray-500 italic">
                              Non modifiable
                            </span>
                            <span v-if="isRejected(absence.statut)" class="text-xs text-gray-500 italic">
                              Refusé
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="Absences.length === 0">
                        <td colspan="5" class="py-8 text-center text-gray-500">
                          Aucun historique d'absence disponible
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Mon Compte -->
          <div v-if="activeTab === 'mon-compte'">
            <div class="bg-white shadow-sm border border-gray-200 rounded-sm p-6 hover:shadow-md transition-shadow">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Informations personnelles -->
                <div class="space-y-6">
                  <div>
                    <h2 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Informations Personnelles</h2>
                    <div class="space-y-4">
                      <div>
                        <label class="text-xs text-gray-500 block mb-1">Nom</label>
                        <p class="text-sm font-medium text-gray-800">{{ UserInfo?.nom }}</p>
                      </div>
                      <div>
                        <label class="text-xs text-gray-500 block mb-1">Prénom</label>
                        <p class="text-sm font-medium text-gray-800">{{ UserInfo?.prenom }}</p>
                      </div>
                      <div>
                        <label class="text-xs text-gray-500 block mb-1">Email</label>
                        <p class="text-sm font-medium text-gray-800">{{ UserInfo?.email }}</p>
                      </div>
                      <div>
                        <label class="text-xs text-gray-500 block mb-1">Téléphone Principal</label>
                        <p class="text-sm font-medium text-gray-800">{{ UserInfo?.telephonePrincipal }}</p>
                      </div>
                      <div>
                        <label class="text-xs text-gray-500 block mb-1">Téléphone Secondaire</label>
                        <p class="text-sm font-medium text-gray-800">{{ UserInfo?.telephoneSecondaire || '—' }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Informations professionnelles -->
                <div class="space-y-6">
                  <div>
                    <h2 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Informations Professionnelles</h2>
                    <div class="space-y-4">
                      <div>
                        <label class="text-xs text-gray-500 block mb-1">Rôle</label>
                        <p class="text-sm font-medium text-gray-800">{{ UserInfo?.RoleEmployee || 'Employé' }}</p>
                      </div>
                      <div>
                        <label class="text-xs text-gray-500 block mb-1">Poste</label>
                        <p class="text-sm font-medium text-gray-800">{{ UserInfo?.poste?.titrePoste || '—' }}</p>
                      </div>
                      <div>
                        <label class="text-xs text-gray-500 block mb-1">Type de Contrat</label>
                        <p class="text-sm font-medium text-gray-800">{{ UserInfo?.contrat?.typeContrat || '—' }}</p>
                      </div>
                      <div>
                        <label class="text-xs text-gray-500 block mb-1">Salaire</label>
                        <p class="text-sm font-medium text-gray-800">{{ UserInfo?.salaires?.length ? UserInfo.salaires[0].montantSalaire : 0 }} DT</p>
                      </div>
                      <div>
                        <label class="text-xs text-gray-500 block mb-1">Solde de Congés</label>
                        <div class="flex items-center">
                          <div class="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div class="bg-[#0078d4] h-2.5 rounded-full" :style="{ width: calculateLeavePercentage() + '%' }"></div>
                          </div>
                          <span class="text-sm font-medium text-gray-800">{{ UserInfo?.soldeConges || 0 }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Permissions -->
                  <div>
                    <h2 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Permissions</h2>
                    <div class="flex flex-wrap gap-2">
                      <span v-for="(permission, index) in permissionsList" :key="index" class="px-3 py-1 bg-blue-50 text-[#0078d4] text-xs font-medium rounded-full">{{ permission }}</span>
                      <span v-if="!permissionsList.length" class="text-sm text-gray-500">Aucune permission spécifique</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-8 pt-6 border-t border-gray-100">
                <h3 class="text-md font-semibold text-gray-800 mb-4">Statistiques</h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div class="bg-gray-50 p-4 rounded">
                    <p class="text-xs text-gray-500 mb-1">Absences ce mois</p>
                    <p class="text-xl font-semibold text-gray-800">{{ AbsenceCount }}</p>
                  </div>
                  <div class="bg-gray-50 p-4 rounded">
                    <p class="text-xs text-gray-500 mb-1">Années d'ancienneté</p>
                    <p class="text-xl font-semibold text-gray-800">3</p>
                  </div>
                  <div class="bg-gray-50 p-4 rounded">
                    <p class="text-xs text-gray-500 mb-1">Dernière connexion</p>
                    <p class="text-xl font-semibold text-gray-800">Aujourd'hui</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { authService } from '../../services/authService'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const sidebarOpen = ref(true)
const activeTab = ref('dashboard')

// Variables pour les demandes (pour superviseurs)
const demandesCongesEnAttente = ref([])
const demandesAvancesEnAttente = ref([])
const demandesAbsencesEnAttente = ref([])
const loadingDemandes = ref(false)

// ===== DASHBOARD STATS =====
const SoldeCongeCount = ref(0)
const AvanceCount = ref(0)
const AbsenceCount = ref(0)
const CongeCount = ref(0)
const PendingAvancesCount = ref(0)
const ApprovedAvancesCount = ref(0)
const PendingCongesCount = ref(0)
const RecentAvances = ref([])
const RecentConges = ref([])
const RecentAbsences = ref([])
const isLoading = ref(false)
const UserInfo = ref(null)

// ===== DEMANDE AVANCE =====
const demandeAvance = ref({
  montant: 0.01,
  motif: ''
})
const Avances = ref([])
const userSalaire = ref(0)

// ===== DEMANDE CONGE =====
const demandeConge = ref({
  dateDebut: '',
  dateFin: '',
  motif: ''
})
const Conges = ref([])
const userSoldeConges = ref(0)
const minDate = new Date().toISOString().split('T')[0]

// ===== DEMANDE ABSENCE =====
const demandeAbsence = ref({
  date: '',
  motif: ''
})
const Absences = ref([])

// ===== FONCTIONS POUR LES TITRES =====
const getActiveTabTitle = () => {
  const titles = {
    'dashboard': 'Tableau de bord',
    'mon-compte': 'Mon Compte',
    'demande-conge': 'Demande de Congé',
    'demande-avance': 'Demande d\'Avance sur Salaire',
    'demande-absence': 'Déclaration d\'Absence',
    'gestion-conges': 'Gérer les Congés',
    'gestion-avances': 'Gérer les Avances',
    'gestion-absences': 'Gérer les Absences'
  }
  return titles[activeTab.value] || 'Tableau de bord'
}

const getActiveTabDescription = () => {
  const descriptions = {
    'dashboard': `Bienvenue sur votre tableau de bord, ${authStore.user?.prenom || ''}`,
    'mon-compte': 'Gérez vos informations personnelles.',
    'demande-conge': 'Soumettez une demande de congé et consultez votre historique.',
    'demande-avance': 'Soumettez une demande d\'avance et consultez votre historique.',
    'demande-absence': 'Déclarez une absence et consultez votre historique.',
    'gestion-conges': 'Approuver ou refuser les demandes de congé des employés.',
    'gestion-avances': 'Approuver ou refuser les demandes d\'avance des employés.',
    'gestion-absences': 'Approuver ou refuser les déclarations d\'absence des employés.'
  }
  return descriptions[activeTab.value] || 'Bienvenue sur votre tableau de bord'
}

// ===== GESTION DES PERMISSIONS =====
const parsePermissions = (permissions) => {
  if (!permissions) return []
  
  // Cas 1: C'est déjà un tableau de strings
  if (Array.isArray(permissions) && permissions.every(p => typeof p === 'string')) {
    return permissions
  }
  
  // Cas 2: C'est un tableau d'objets avec nomPermission
  if (Array.isArray(permissions) && permissions[0]?.nomPermission) {
    return permissions.map(p => p.nomPermission).filter(p => p)
  }
  
  // Cas 3: C'est une chaîne
  if (typeof permissions === 'string') {
    const cleaned = permissions.replace(/\s/g, '')
    const result = []
    
    if (cleaned.includes('GERER_AVANCE')) {
      result.push('GERER_AVANCE')
    }
    if (cleaned.includes('GERER_CONGE')) {
      result.push('GERER_CONGE')
    }
    if (cleaned.includes('GERER_ABSENCE')) {
      result.push('GERER_ABSENCE')
    }
    
    if (result.length > 0) {
      return result
    }
    
    const parts = cleaned.split('_')
    for (let i = 0; i < parts.length; i += 2) {
      if (i + 1 < parts.length) {
        result.push(`${parts[i]}_${parts[i + 1]}`)
      }
    }
    
    return [...new Set(result)]
  }
  
  return []
}

const hasPermission = (permission) => {
  if (!UserInfo.value || !UserInfo.value.permissions) {
    return false
  }
  
  const permissions = parsePermissions(UserInfo.value.permissions)
  return permissions.includes(permission)
}

const isSuperviseur = computed(() => {
  return hasPermission('GERER_CONGE') || hasPermission('GERER_AVANCE') || hasPermission('GERER_ABSENCE')
})

const permissionsList = computed(() => {
  if (!UserInfo.value || !UserInfo.value.permissions) return []
  return parsePermissions(UserInfo.value.permissions)
})

// ===== MÉTHODES UTILITAIRES =====
const formatCurrency = (amount) => {
  if (!amount) return '0,00 DT'
  return new Intl.NumberFormat('fr-TN', {
    style: 'currency',
    currency: 'TND',
    minimumFractionDigits: 2
  }).format(amount)
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  } catch (error) {
    return dateString
  }
}

const formatStatus = (status) => {
  if (!status) return 'Inconnu'
  const statusMap = {
    'pending': 'En attente',
    'approved': 'Approuvé',
    'rejected': 'Refusé',
    'en_attente': 'En attente',
    'en attente': 'En attente',
    'approuvee': 'Approuvé',
    'approuvé': 'Approuvé',
    'approuvée': 'Approuvé',
    'refusee': 'Refusé',
    'refusé': 'Refusé',
    'refusée': 'Refusé'
  }
  return statusMap[status?.toLowerCase()] || status
}

const getStatusClass = (status) => {
  if (!status) return 'bg-gray-100 text-gray-800'
  const statusLower = status?.toLowerCase()
  const classes = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'en_attente': 'bg-yellow-100 text-yellow-800',
    'en attente': 'bg-yellow-100 text-yellow-800',
    'approved': 'bg-green-100 text-green-800',
    'approuvee': 'bg-green-100 text-green-800',
    'approuvé': 'bg-green-100 text-green-800',
    'approuvée': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
    'refusee': 'bg-red-100 text-red-800',
    'refusé': 'bg-red-100 text-red-800',
    'refusée': 'bg-red-100 text-red-800'
  }
  return classes[statusLower] || 'bg-gray-100 text-gray-800'
}

const isPending = (statut) => {
  const s = statut?.toLowerCase() || ''
  return s === 'pending' || s === 'en_attente' || s === 'en attente'
}

const isApproved = (statut) => {
  const s = statut?.toLowerCase() || ''
  return s === 'approved' || s === 'approuvé' || s === 'approuvée' || s === 'approuvee'
}

const isRejected = (statut) => {
  const s = statut?.toLowerCase() || ''
  return s === 'rejected' || s === 'refusé' || s === 'refusée' || s === 'refusee'
}

// ===== GESTION DES DEMANDES (POUR SUPERVISEURS) =====
const fetchDemandesCongesEnAttente = async () => {
  try {
    loadingDemandes.value = true
    console.log('Fetching congés en attente...')
    console.log('User ID:', authStore.user?.id)
    console.log('Is supervisor?', isSuperviseur.value)
    console.log('Has GERER_CONGE permission?', hasPermission('GERER_CONGE'))
    
    const response = await authService.getDemandesCongesAApprouver()
    console.log('Response:', response)
    
    demandesCongesEnAttente.value = response || []
    
    console.log('Demandes chargées:', demandesCongesEnAttente.value.length)
  } catch (error) {
    console.error('Erreur détaillée:', error)
    console.error('Erreur response:', error.response?.data)
    demandesCongesEnAttente.value = []
  } finally {
    loadingDemandes.value = false
  }
}

const fetchDemandesAvancesEnAttente = async () => {
  try {
    loadingDemandes.value = true
    const response = await authService.getDemandesAvancesAApprouver()
    demandesAvancesEnAttente.value = response || []
  } catch (error) {
    console.error('Erreur lors de la récupération des avances en attente:', error)
    demandesAvancesEnAttente.value = []
  } finally {
    loadingDemandes.value = false
  }
}

const fetchDemandesAbsencesEnAttente = async () => {
  try {
    loadingDemandes.value = true
    const response = await authService.getAbsencesAApprouver()
    demandesAbsencesEnAttente.value = response || []
  } catch (error) {
    console.error('Erreur lors de la récupération des absences en attente:', error)
    demandesAbsencesEnAttente.value = []
  } finally {
    loadingDemandes.value = false
  }
}

const refreshDemandes = async () => {
  if (activeTab.value === 'gestion-conges') {
    await fetchDemandesCongesEnAttente()
  } else if (activeTab.value === 'gestion-avances') {
    await fetchDemandesAvancesEnAttente()
  } else if (activeTab.value === 'gestion-absences') {
    await fetchDemandesAbsencesEnAttente()
  }
}

const approuverDemande = async (type, id) => {
  try {
    let response
    if (type === 'conge') {
      response = await authService.approuverDemandeConge(id)
    } else if (type === 'avance') {
      response = await authService.approuverDemandeAvance(id)
    } else if (type === 'absence') {
      response = await authService.approuverAbsence(id)
    }
    
    if (response) {
      alert('Demande approuvée avec succès')
      await refreshDemandes()
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert(error.response?.data?.message || 'Erreur lors de l\'approbation')
  }
}



const refuserDemande = async (type, id) => {
  const motifRefus = prompt('Veuillez saisir le motif du refus :')
  
  if (!motifRefus || !motifRefus.trim()) {
    alert('Le motif du refus est requis')
    return
  }

  try {
    let response
    if (type === 'conge') {
      response = await authService.refuserDemandeConge(id, motifRefus)
    } else if (type === 'avance') {
      response = await authService.refuserDemandeAvance(id, motifRefus)
    }
    
    if (response) {
      alert('Demande refusée avec succès')
      await refreshDemandes()
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert(error.response?.data?.message || 'Erreur lors du refus')
  }
}

const refuserDemandeAbsence = async (absenceId) => {
  const motifRefus = prompt('Veuillez saisir le motif du refus :')
  
  if (!motifRefus || !motifRefus.trim()) {
    alert('Le motif du refus est requis')
    return
  }

  if (confirm(`Êtes-vous sûr de vouloir refuser cette absence avec le motif : "${motifRefus}" ?`)) {
    try {
      const response = await authService.refuserAbsence(absenceId, motifRefus)
      
      if (response) {
        alert('Absence refusée avec succès')
        await refreshDemandes()
      }
    } catch (error) {
      console.error('Erreur lors du refus:', error)
      alert(error.response?.data?.message || 'Erreur lors du refus')
    }
  }
}

// ===== DASHBOARD METHODS =====
const loadStats = async () => {
  try {
    isLoading.value = true
    const id = authStore.user?.id
    
    if (!id) {
      console.error('Utilisateur non connecté')
      return
    }

    // Récupérer les données de l'utilisateur
    UserInfo.value = await authService.GetCompte(id)
    
    // Si l'utilisateur a des permissions de gestion, charger les demandes en attente
    if (isSuperviseur.value) {
      if (hasPermission('GERER_CONGE')) {
        await fetchDemandesCongesEnAttente()
      }
      
      if (hasPermission('GERER_AVANCE')) {
        await fetchDemandesAvancesEnAttente()
      }
      
      if (hasPermission('GERER_ABSENCE')) {
        await fetchDemandesAbsencesEnAttente()
      }
    } else {
      // Si c'est un employé normal, charger ses statistiques
      const avances = await authService.getAvances(id)
      const conges = await authService.getConges(id)
      const absences = await authService.getMesDemandesAbsences()
      
      // Calculer les statistiques des avances
      AvanceCount.value = avances?.length || 0
      
      const pendingAvances = avances?.filter(a => isPending(a.statut)) || []
      const approvedAvances = avances?.filter(a => isApproved(a.statut)) || []
      
      PendingAvancesCount.value = pendingAvances.length
      ApprovedAvancesCount.value = approvedAvances.length
      
      RecentAvances.value = avances
        ?.slice(0, 5)
        .map(a => ({
          id: a.id,
          montant: a.montant || 0,
          motif: a.motif || '',
          statut: a.statut || '',
          date: a.dateDemande || a.createdAt || ''
        })) || []
      
      // Calculer les statistiques des congés
      if (conges && Array.isArray(conges)) {
        const approvedConges = conges.filter(c => isApproved(c.statut))
        const pendingConges = conges.filter(c => isPending(c.statut))
        
        CongeCount.value = approvedConges.length
        PendingCongesCount.value = pendingConges.length
        
        RecentConges.value = conges
          .slice(0, 5)
          .map(c => ({
            id: c.id,
            motif: c.motif || 'Congé',
            dateDebut: c.dateDebut,
            dateFin: c.dateFin,
            statut: c.statut || ''
          })) || []
      } else {
        CongeCount.value = 0
        PendingCongesCount.value = 0
        RecentConges.value = []
      }
      
      // Calculer les statistiques des absences
      if (absences && Array.isArray(absences)) {
        const approvedAbsences = absences.filter(a => isApproved(a.statut))
        const currentMonth = new Date().getMonth()
        const currentYear = new Date().getFullYear()
        
        // Calculer le nombre d'absences approuvées ce mois-ci
        const absencesThisMonth = approvedAbsences.filter(a => {
          try {
            const dateAbsence = new Date(a.date)
            return dateAbsence.getMonth() === currentMonth && 
                   dateAbsence.getFullYear() === currentYear
          } catch {
            return false
          }
        })
        
        AbsenceCount.value = absencesThisMonth.length
        
        RecentAbsences.value = absences
          .slice(0, 5)
          .map(a => ({
            id: a.id,
            date: a.date,
            motif: a.motif || '',
            statut: a.statut || ''
          })) || []
      } else {
        AbsenceCount.value = 0
        RecentAbsences.value = []
      }
      
      SoldeCongeCount.value = UserInfo.value?.soldeConges || 0
      userSoldeConges.value = UserInfo.value?.soldeConges || 0
    }
    
  } catch (err) {
    console.error('Erreur chargement stats employé:', err)
  } finally {
    isLoading.value = false
  }
}

// ===== DEMANDE AVANCE METHODS =====
const hasActiveAvance = computed(() => {
  return Avances.value.some(avance => isPending(avance.statut) || isApproved(avance.statut))
})

const activeAvance = computed(() => {
  return Avances.value.find(avance => isPending(avance.statut) || isApproved(avance.statut))
})

const activeAvanceStatus = computed(() => {
  return activeAvance.value?.statut?.toLowerCase() || ''
})

const activeAvanceAmount = computed(() => {
  return activeAvance.value?.montant || 0
})

const isFormValidAvance = computed(() => {
  const montant = parseFloat(demandeAvance.value.montant) || 0
  return montant >= 0.01 && demandeAvance.value.motif?.trim()
})

const canSubmit = computed(() => {
  return isFormValidAvance.value && !hasActiveAvance.value && userSalaire.value > 0
})

const submitButtonText = computed(() => {
  if (hasActiveAvance.value) {
    return 'Avance active en cours'
  }
  if (userSalaire.value === 0) {
    return 'Salaire non disponible'
  }
  return 'Soumettre la demande'
})

const submitDemandeAvance = async () => {
  try {
    if (!canSubmit.value) {
      if (hasActiveAvance.value) {
        alert('Vous avez déjà une avance active. Vous devez l\'annuler ou attendre son traitement avant de soumettre une nouvelle demande.')
      } else {
        alert('Veuillez vérifier les informations du formulaire')
      }
      return
    }

    const demandeData = {
      montant: parseFloat(demandeAvance.value.montant),
      motif: demandeAvance.value.motif.trim()
    }

    await authService.SubmitDemandeAvance(demandeData)
    
    await getAvances()
    await getUserInfo()
    
    demandeAvance.value = {
      montant: 0.01,
      motif: ''
    }
    
    alert('Demande d\'avance soumise avec succès!')
  } catch (error) {
    console.error('Erreur lors de la soumission:', error)
    alert(error.response?.data?.message || 'Erreur lors de la soumission de la demande')
  }
}

const getAvances = async () => {
  try {
    const id = authStore.user?.id
    if (!id) throw new Error('Utilisateur non connecté')
    
    const avances = await authService.getAvances(id)
    
    Avances.value = (avances || []).map(a => {
      return {
        ...a,
        id: a.id,
        montant: parseFloat(a.montant) || 0,
        motif: a.motif?.toString() || '',
        statut: a.statut?.toString() || '',
        dateDemande: a.dateDemande,
        soldeRestant: a.soldeRestant || 0
      }
    })
    
  } catch (error) {
    console.error('Erreur lors du chargement des avances:', error)
    Avances.value = []
  }
}

const annulerDemandeAvance = async (demandeId) => {
  if (!confirm('Voulez-vous vraiment supprimer cette demande d\'avance ?')) {
    return
  }

  try {
    await authService.AnnulerDemandeAvance(demandeId)
    
    await getAvances()
    await getUserInfo()
    
    alert('Demande d\'avance supprimée avec succès!')
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    alert(error.response?.data?.message || 'Erreur lors de la suppression de la demande')
  }
}

const getUserInfo = async () => {
  try {
    const id = authStore.user?.id
    if (!id) return

    const userData = await authService.GetCompte(id)
    
    userSalaire.value = Number(
      userData?.salaires?.[0]?.montantSalaire ?? 0
    )

  } catch (error) {
    console.error('Erreur lors du chargement des infos utilisateur:', error)
    userSalaire.value = 0
  }
}

// ===== DEMANDE CONGE METHODS =====
const calculateDuration = () => {
  if (!demandeConge.value.dateDebut || !demandeConge.value.dateFin) return 0
  
  const start = new Date(demandeConge.value.dateDebut)
  const end = new Date(demandeConge.value.dateFin)
  const diffTime = Math.abs(end - start)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
}

const calculateDaysBetween = (startDate, endDate) => {
  if (!startDate || !endDate) return 0
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end - start)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
}

const isFormValid = computed(() => {
  return demandeConge.value.dateDebut && 
         demandeConge.value.dateFin && 
         demandeConge.value.motif?.trim()
})

const submitDemandeConge = async () => {
  try {
    if (!isFormValid.value) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    const duree = calculateDuration()
    if (duree > userSoldeConges.value) {
      alert(`Solde insuffisant. Vous avez ${userSoldeConges.value} jours disponibles, mais la demande nécessite ${duree} jours.`)
      return
    }

    const demandeData = {
      dateDebut: new Date(demandeConge.value.dateDebut).toISOString(),
      dateFin: new Date(demandeConge.value.dateFin).toISOString(),
      motif: demandeConge.value.motif.trim()
    }

    await authService.SubmitDemandeConge(demandeData)
    
    await getConges()
    await fetchUserSolde()
   
    demandeConge.value = {
      dateDebut: '',
      dateFin: '',
      motif: ''
    }
    
    alert('Demande de congé soumise avec succès!')
  } catch (error) {
    console.error('Erreur lors de la soumission:', error)
    alert(error.response?.data?.message || 'Erreur lors de la soumission de la demande')
  }
}

const getConges = async () => {
  try {
    const id = authStore.user?.id
    if (!id) throw new Error('Utilisateur non connecté')
    
    const conges = await authService.getConges(id)
    Conges.value = conges || []
  } catch (error) {
    console.error('Erreur lors du chargement des congés:', error)
    Conges.value = []
  }
}

const annulerDemandeConge = async (demandeId) => {
  if (!confirm('Voulez-vous vraiment supprimer cette demande de congé ?')) {
    return
  }

  try {
    await authService.AnnulerDemandeConge(demandeId)
    
    await getConges()
    await fetchUserSolde()
    
    alert('Demande de congé supprimée avec succès!')
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    alert(error.response?.data?.message || 'Erreur lors de la suppression de la demande')
  }
}

// ===== DEMANDE ABSENCE METHODS =====
const isFormValidAbsence = computed(() => {
  return demandeAbsence.value.date && 
         demandeAbsence.value.motif?.trim()
})

const submitDemandeAbsence = async () => {
  try {
    if (!isFormValidAbsence.value) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    const demandeData = {
      date: new Date(demandeAbsence.value.date).toISOString().split('T')[0], // Format YYYY-MM-DD
      motif: demandeAbsence.value.motif.trim()
    }

    await authService.createAbsence(demandeData)
    
    await getAbsences()
   
    demandeAbsence.value = {
      date: '',
      motif: ''
    }
    
    alert('Déclaration d\'absence soumise avec succès!')
  } catch (error) {
    console.error('Erreur lors de la soumission:', error)
    alert(error.response?.data?.message || 'Erreur lors de la soumission de la demande')
  }
}

const getAbsences = async () => {
  try {
    const absences = await authService.getMesDemandesAbsences()
    Absences.value = absences || []
  } catch (error) {
    console.error('Erreur lors du chargement des absences:', error)
    Absences.value = []
  }
}

const annulerDemandeAbsence = async (absenceId) => {
  if (!confirm('Voulez-vous vraiment supprimer cette déclaration d\'absence ?')) {
    return
  }

  try {
    await authService.deleteAbsence(absenceId)
    
    await getAbsences()
    
    alert('Déclaration d\'absence supprimée avec succès!')
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    alert(error.response?.data?.message || 'Erreur lors de la suppression de la demande')
  }
}

// ===== MON COMPTE METHODS =====
const fetchUserSolde = async () => {
  try {
    if (!authStore.user) return
    
    const data = await authService.GetCompte(authStore.user.id)
    userSoldeConges.value = data.soldeConges || 0
  } catch (error) {
    console.error('Erreur lors de la récupération du solde :', error)
    userSoldeConges.value = 0
  }
}

const calculateLeavePercentage = () => {
  const maxLeaves = 30
  const solde = UserInfo.value?.soldeConges || 0
  return Math.min((solde / maxLeaves) * 100, 100)
}

// ===== DÉCONNEXION =====
const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

// ===== INITIALISATION =====
onMounted(async () => {
  try {
    if (!authStore.user) {
      await authStore.fetchUser()
    }
    
    UserInfo.value = await authService.GetCompte(authStore.user.id)
    
    // Charger les données en fonction des permissions
    if (isSuperviseur.value) {
      console.log('Chargement des données superviseur')
    } else {
      await Promise.all([
        loadStats(),
        getUserInfo(),
        getAvances(),
        getConges(),
        getAbsences(),
        fetchUserSolde()
      ])
    }
    
  } catch (error) {
    console.error('Erreur lors du chargement initial:', error)
  }
})

watch(activeTab, async (newTab) => {
  if (newTab === 'gestion-conges' && hasPermission('GERER_CONGE')) {
    await fetchDemandesCongesEnAttente()
  } else if (newTab === 'gestion-avances' && hasPermission('GERER_AVANCE')) {
    await fetchDemandesAvancesEnAttente()
  } else if (newTab === 'gestion-absences' && hasPermission('GERER_ABSENCE')) {
    await fetchDemandesAbsencesEnAttente()
  } else if (newTab === 'demande-conge' && !hasPermission('GERER_CONGE')) {
    await getConges()
    await fetchUserSolde()
  } else if (newTab === 'demande-avance' && !hasPermission('GERER_AVANCE')) {
    await getAvances()
    await getUserInfo()
  } else if (newTab === 'demande-absence' && !hasPermission('GERER_ABSENCE')) {
    await getAbsences()
  }
})
</script>