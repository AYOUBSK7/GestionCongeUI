<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="max-w-md w-full bg-white p-10 shadow-lg border border-gray-200">
      <div class="mb-6">
        <h1 class="text-2xl font-semibold text-gray-800">Se connecter</h1>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <input
            v-model="form.userName"
            type="text"
            placeholder="E-mail ou Identifiant"
            class="input-azure"
            required
          />
        </div>

        <div>
          <input
            v-model="form.password"
            type="password"
            placeholder="Mot de passe"
            class="input-azure"
            required
          />
        </div>

        <div v-if="error" class="text-red-600 text-sm">
          {{ error }}
        </div>

        <div class="text-sm">
          Pas de compte ?
          <router-link to="/register" class="text-[#0067b8] hover:underline"
            >Créez-en un !</router-link
          >
        </div>

        <div class="flex justify-end pt-6">
          <button
            type="submit"
            :disabled="loading"
            class="bg-[#0067b8] hover:bg-[#005a9e] text-white px-10 py-2 font-medium transition-colors shadow-sm disabled:opacity-50"
          >
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  userName: '',
  password: '',
})

const loading = ref(false)
const error = ref(null)

const handleLogin = async () => {
  loading.value = true
  error.value = null
  try {
    const user = await authStore.login({
      UserName: form.userName,
      Password: form.password,
    })
    console.log('User role:', user.Role)
    const role = (user.Role || '').toLowerCase()
    if (role === 'admin') {
      router.push('/admin/dashboard')
    } else {
      router.push('/employee/dashboard')
    }
  } catch (err) {
    error.value = 'Identifiants incorrects'
  } finally {
    loading.value = false
  }
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
