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
        <span class="font-semibold tracking-tight">RH Platform</span>
        <span class="text-azure-300 hidden md:inline">|</span>
        <span class="text-sm hidden md:inline">Portail RH Multi-entreprises</span>
      </div>
      <div class="flex items-center space-x-4 text-sm">
        <div
          class="flex items-center space-x-2 px-2 py-1 hover:bg-[#005a9e] cursor-pointer rounded"
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
          'bg-white border-r border-gray-200 flex flex-col z-20 transition-all duration-300 ease-in-out h-full shrink-0 overflow-hidden',
          sidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:w-0 md:translate-x-0',
        ]"
      >
        <div class="w-64 flex flex-col h-full">
          <div class="p-4 border-b border-gray-100 shrink-0">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation</p>
          </div>
          <nav class="flex-1 overflow-y-auto py-2">
            <!-- Tableau de bord -->
            <router-link
              to="/employee/dashboard"
              :class="[
                'w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4',
                $route.path === '/employee/dashboard'
                  ? 'bg-[#f3f2f1] text-[#0078d4] border-[#0078d4]'
                  : 'text-gray-700 border-transparent hover:bg-gray-100',
              ]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span class="text-sm font-medium">Tableau de bord</span>
            </router-link>

            <!-- Mon compte -->
            <router-link
              to="/employee/mon-compte"
              :class="[
                'w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4',
                $route.path === '/employee/mon-compte'
                  ? 'bg-[#f3f2f1] text-[#0078d4] border-[#0078d4]'
                  : 'text-gray-700 border-transparent hover:bg-gray-100',
              ]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span class="text-sm font-medium">Mon compte</span>
            </router-link>

            <!-- Demande Congé - Uniquement pour les employés SANS permission GERER_CONGE -->
            <router-link
              v-if="!hasPermission('GERER_CONGE')"
              to="/employee/demande-conge"
              :class="[
                'w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4',
                $route.path === '/employee/demande-conge'
                  ? 'bg-[#f3f2f1] text-[#0078d4] border-[#0078d4]'
                  : 'text-gray-700 border-transparent hover:bg-gray-100',
              ]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span class="text-sm font-medium">Demande Congé</span>
            </router-link>

            <!-- Demande Avance Salaire - Uniquement pour les employés SANS permission GERER_AVANCE -->
            <router-link
              v-if="!hasPermission('GERER_AVANCE')"
              to="/employee/demande-avance"
              :class="[
                'w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4',
                $route.path === '/employee/demande-avance'
                  ? 'bg-[#f3f2f1] text-[#0078d4] border-[#0078d4]'
                  : 'text-gray-700 border-transparent hover:bg-gray-100',
              ]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="text-sm font-medium">Demande Avance</span>
            </router-link>

            <!-- Demande Absence - Uniquement pour les employés SANS permission GERER_ABSENCE -->
            <router-link
              v-if="!hasPermission('GERER_ABSENCE')"
              to="/employee/demande-absence"
              :class="[
                'w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4',
                $route.path === '/employee/demande-absence'
                  ? 'bg-[#f3f2f1] text-[#0078d4] border-[#0078d4]'
                  : 'text-gray-700 border-transparent hover:bg-gray-100',
              ]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="text-sm font-medium">Déclarer une absence</span>
            </router-link>

            <!-- Gestion des Congés - Pour ceux avec permission GERER_CONGE -->
            <router-link
              v-if="hasPermission('GERER_CONGE')"
              to="/employee/gestion-conges"
              :class="[
                'w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4',
                $route.path === '/employee/gestion-conges'
                  ? 'bg-[#f3f2f1] text-[#0078d4] border-[#0078d4]'
                  : 'text-gray-700 border-transparent hover:bg-gray-100',
              ]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="text-sm font-medium">Gérer les Congés</span>
            </router-link>

            <!-- Gestion des Avances - Pour ceux avec permission GERER_AVANCE -->
            <router-link
              v-if="hasPermission('GERER_AVANCE')"
              to="/employee/gestion-avances"
              :class="[
                'w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4',
                $route.path === '/employee/gestion-avances'
                  ? 'bg-[#f3f2f1] text-[#0078d4] border-[#0078d4]'
                  : 'text-gray-700 border-transparent hover:bg-gray-100',
              ]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span class="text-sm font-medium">Gérer les Avances</span>
            </router-link>

            <!-- Gestion des Absences - Pour ceux avec permission GERER_ABSENCE -->
            <router-link
              v-if="hasPermission('GERER_ABSENCE')"
              to="/employee/gestion-absences"
              :class="[
                'w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4',
                $route.path === '/employee/gestion-absences'
                  ? 'bg-[#f3f2f1] text-[#0078d4] border-[#0078d4]'
                  : 'text-gray-700 border-transparent hover:bg-gray-100',
              ]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              <span class="text-sm font-medium">Gérer les Absences</span>
            </router-link>
          </nav>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto">
        <div class="p-6">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()
const sidebarOpen = ref(false)

const hasPermission = (permission) => {
  return authStore.user?.permissions?.includes(permission) || false
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
