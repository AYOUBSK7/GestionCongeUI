<template>
  <div
    class="bg-white shadow-sm border border-gray-200 rounded-sm p-6 hover:shadow-md transition-shadow"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Informations personnelles -->
      <div class="space-y-6">
        <div>
          <h2 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            Informations Personnelles
          </h2>
          <div class="space-y-4">
            <div>
              <label class="text-xs text-gray-500 block mb-1">Nom</label>
              <p class="text-sm font-medium text-gray-800">{{ userInfo?.nom }}</p>
            </div>
            <div>
              <label class="text-xs text-gray-500 block mb-1">Prénom</label>
              <p class="text-sm font-medium text-gray-800">{{ userInfo?.prenom }}</p>
            </div>
            <div>
              <label class="text-xs text-gray-500 block mb-1">Email</label>
              <p class="text-sm font-medium text-gray-800">{{ userInfo?.email }}</p>
            </div>
            <div>
              <label class="text-xs text-gray-500 block mb-1">Téléphone Principal</label>
              <p class="text-sm font-medium text-gray-800">
                {{ userInfo?.telephonePrincipal }}
              </p>
            </div>
            <div>
              <label class="text-xs text-gray-500 block mb-1">Téléphone Secondaire</label>
              <p class="text-sm font-medium text-gray-800">
                {{ userInfo?.telephoneSecondaire || '—' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Informations professionnelles -->
      <div class="space-y-6">
        <div>
          <h2 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            Informations Professionnelles
          </h2>
          <div class="space-y-4">
            <div>
              <label class="text-xs text-gray-500 block mb-1">Rôle</label>
              <p class="text-sm font-medium text-gray-800">
                {{ userInfo?.RoleEmployee || 'Employé' }}
              </p>
            </div>
            <div>
              <label class="text-xs text-gray-500 block mb-1">Poste</label>
              <p class="text-sm font-medium text-gray-800">
                {{ userInfo?.poste?.titrePoste || '—' }}
              </p>
            </div>
            <div>
              <label class="text-xs text-gray-500 block mb-1">Type de Contrat</label>
              <p class="text-sm font-medium text-gray-800">
                {{ userInfo?.contrat?.typeContrat || '—' }}
              </p>
            </div>
            <div>
              <label class="text-xs text-gray-500 block mb-1">Salaire</label>
              <p class="text-sm font-medium text-gray-800">
                {{ userInfo?.salaires?.length ? userInfo.salaires[0].montantSalaire : 0 }} DT
              </p>
            </div>
            <div>
              <label class="text-xs text-gray-500 block mb-1">Solde de Congés</label>
              <div class="flex items-center">
                <div class="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div
                    class="bg-[#0078d4] h-2.5 rounded-full"
                    :style="{ width: leavePercentage + '%' }"
                  ></div>
                </div>
                <span class="text-sm font-medium text-gray-800">{{
                  userInfo?.soldeConges || 0
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Permissions -->
        <div>
          <h2 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            Permissions
          </h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(permission, index) in permissionsList"
              :key="index"
              class="px-3 py-1 bg-blue-50 text-[#0078d4] text-xs font-medium rounded-full"
              >{{ permission }}</span
            >
            <span v-if="!permissionsList.length" class="text-sm text-gray-500">
              Aucune permission spécifique
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { authService } from '../../services/authService.js'

const authStore = useAuthStore()
const userInfo = ref(null)

const permissionsList = computed(() => {
  return authStore.user?.permissions || []
})

const leavePercentage = computed(() => {
  const maxLeaves = 30
  const solde = userInfo.value?.soldeConges || 0
  return Math.min((solde / maxLeaves) * 100, 100)
})

onMounted(async () => {
  try {
    if (authStore.user?.id) {
      console.log("Chargement des informations utilisateur pour l'ID:", authStore.user.id)
      userInfo.value = await authService.getCompte(authStore.user.id)
      console.log('Informations utilisateur chargées:', userInfo.value)
    }
  } catch (error) {
    console.error('Erreur lors du chargement des informations:', error)
  }
})
</script>
