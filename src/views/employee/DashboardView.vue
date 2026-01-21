<template>
  <div class="min-h-screen bg-[#f3f2f1]">
    <nav class="bg-[#0078d4] text-white px-6 py-2 flex items-center justify-between shadow-md">
      <div class="flex items-center space-x-4">
        <span class="font-semibold">RH Platform</span>
        <span class="text-gray-400">|</span>
        <span>Espace Employé</span>
      </div>
      <div class="flex items-center space-x-4">
        <span>{{ authStore.user?.prenom }} {{ authStore.user?.nom }}</span>
        <button @click="handleLogout" class="hover:text-gray-300">Déconnexion</button>
      </div>
    </nav>
    <main class="p-8">
      <h1 class="text-2xl font-light mb-6">Mes Congés</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="ms-card">
          <h3 class="font-semibold mb-2">Solde disponible</h3>
          <p class="text-3xl font-light text-[#0078d4]">18 jours</p>
        </div>
        <div class="ms-card">
          <h3 class="font-semibold mb-4">Nouvelle demande</h3>
          <button class="ms-button w-full">Soumettre une demande</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
