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
          <input
            v-model="form.prenom"
            type="text"
            placeholder="Prénom"
            class="input-azure"
            required
          />
          <input v-model="form.nom" type="text" placeholder="Nom" class="input-azure" required />
          <input
            v-model="form.email"
            type="email"
            placeholder="E-mail"
            class="input-azure"
            required
          />
          <input v-model="form.telephone" type="tel" placeholder="Téléphone" class="input-azure" />
        </div>

        <input v-model="form.adresse" type="text" placeholder="Adresse" class="input-azure" />

        <hr class="border-gray-100 my-2" />

        <!-- Informations de Compte -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          <input
            v-model="form.identifiant"
            type="text"
            placeholder="Identifiant unique"
            class="input-azure"
            required
          />
          <input
            v-model="form.nomUtilisateur"
            type="text"
            placeholder="Nom d'utilisateur"
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

        <div class="flex items-center justify-between pt-2">
          <router-link to="/login" class="text-sm text-gray-600 hover:underline"
            >Déjà un compte ?</router-link
          >
          <button
            type="submit"
            class="bg-[#0067b8] hover:bg-[#005a9e] text-white px-8 py-1.5 font-medium transition-colors"
          >
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  nomUtilisateur: '',
  email: '',
  motDePasse: '',
  prenom: '',
  nom: '',
  telephone: '',
  adresse: '',
  identifiant: '',
})

const handleRegister = () => {
  console.log("Données d'inscription:", { ...form })
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
