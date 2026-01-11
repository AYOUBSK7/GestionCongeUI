<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="max-w-md w-full bg-white p-10 shadow-lg border border-gray-200">
      <div class="mb-6">
        <h1 class="text-2xl font-semibold text-gray-800">Se connecter</h1>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <input
            v-model="identifier"
            type="text"
            placeholder="E-mail ou Identifiant"
            class="input-azure"
            required
          >
        </div>

        <div>
          <input
            v-model="password"
            type="password"
            placeholder="Mot de passe"
            class="input-azure"
            required
          >
        </div>

        <div class="text-sm">
          Pas de compte ? <router-link to="/register" class="text-azure-blue hover:underline">Créez-en un !</router-link>
        </div>

        <div class="flex justify-end pt-6">
          <button
            type="submit"
            class="bg-[#0067b8] hover:bg-[#005a9e] text-white px-10 py-2 font-medium transition-colors shadow-sm"
          >
            Se connecter
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const identifier = ref('')
const password = ref('')

const handleLogin = () => {
  console.log('Tentative de connexion avec:', {
    identifier: identifier.value,
    password: password.value
  })
}
</script>

<style scoped>
.input-azure {
  width: 100%;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom-width: 1px;
  border-color: #9ca3af;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.input-azure:focus {
  border-color: #0067b8;
  outline: none;
}
</style>
