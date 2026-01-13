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
        if (user && user.id && !user.Id) {
          user.Id = user.id
        }
        this.user = user
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
