import { defineStore } from 'pinia'
import { authService } from '../services/authService'
import Cookies from 'js-cookie'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: Cookies.get('token'),
    loading: false,
    error: null,
  }),
  actions: {
    async login(loginDto) {
      this.loading = true
      this.error = null
      try {
        const data = await authService.login(loginDto)
        const token = data.token
        if (token) {
          this.token = token
        }
        await this.fetchUser()
        return this.user
      } catch (err) {
        this.error = err.response?.data || 'Login failed'
        throw err
      } finally {
        this.loading = false
      }
    },
    async fetchUser() {
      try {
        const user = await authService.getMe()
        console.log('Fetched user raw:', user)

        // FIX: Normaliser le format du user
        this.user = {
          id: user.id,
          userName: user.userName,
          email: user.email,
          nom: user.nom,
          prenom: user.prenom,
          role: user.role, // Le backend renvoie 'role' en minuscule
          telephonePrincipal: user.telephonePrincipal,
          telephoneSecondaire: user.telephoneSecondaire,
        }

        console.log('User normalized:', this.user)
      } catch (err) {
        console.error('Fetch user error:', err)
        this.logout()
      }
    },
    logout() {
      authService.logout()
      this.user = null
      this.token = null
    },
  },
})
