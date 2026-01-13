<template>
  <div class="h-screen w-full flex items-center justify-center bg-gray-100 px-4 overflow-hidden">
    <div class="max-w-xl w-full bg-white p-8 shadow-lg border border-gray-200">
      <div class="mb-4">
        <h1 class="text-xl font-semibold text-gray-800">Créer un compte</h1>
        <p class="text-xs text-gray-600 mt-1">Informations pour votre profil RH.</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Informations Personnelles -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          <input v-model="form.nom" type="text" placeholder="Nom" class="input-azure" required />
          <input
            v-model="form.prenom"
            type="text"
            placeholder="Prénom"
            class="input-azure"
            required
          />
          <input
            v-model="form.email"
            type="email"
            placeholder="E-mail"
            class="input-azure"
            required
          />
          <input v-model="form.adresse" type="text" placeholder="Adresse" class="input-azure" />
        </div>

        <hr class="border-gray-100 my-2" />

        <!-- Informations de Compte -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          <input
            v-model="form.nomUtilisateur"
            type="text"
            placeholder="Nom d'utilisateur"
            class="input-azure"
            required
          />
          <input
            v-model="form.identifiant"
            type="text"
            placeholder="Identifiant unique"
            class="input-azure"
            required
          />
        </div>
        <input
          v-model="form.motDePasse"
          type="password"
          placeholder="Mot de passe"
          class="input-azure"
          required
        />

        <div v-if="error" class="text-red-600 text-sm">
          {{ error }}
        </div>
        <div v-if="success" class="text-green-600 text-sm">
          {{ success }}
        </div>

        <div class="flex items-center justify-between pt-2">
          <router-link to="/login" class="text-sm text-gray-600 hover:underline"
            >Déjà un compte ?</router-link
          >
          <button
            type="submit"
            :disabled="loading"
            class="bg-[#0067b8] hover:bg-[#005a9e] text-white px-8 py-1.5 font-medium transition-colors disabled:opacity-50"
          >
            {{ loading ? "S'inscrire..." : "S'inscrire" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService'

const router = useRouter()
const form = reactive({
  nomUtilisateur: '',
  email: '',
  motDePasse: '',
  prenom: '',
  nom: '',
  adresse: '',
  identifiant: '',
})

const loading = ref(false)
const error = ref(null)
const success = ref(null)

const handleRegister = async () => {
  loading.value = true
  error.value = null
  success.value = null
  try {
    await authService.register(form)
    success.value = 'Compte créé avec succès !'
    setTimeout(() => router.push('/login'), 2000)
  } catch (err) {
    error.value = err.response?.data || "Erreur lors de l'inscription"
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
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.input-azure:focus {
  border-color: #0067b8;
  outline: 2px solid transparent;
  outline-offset: 2px;
}
</style>
