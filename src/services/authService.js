import axios from 'axios'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

const API_URL = 'http://localhost:5289'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = Cookies.get('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authService = {
  async login(loginDto) {
    const response = await api.post('/api/Account/login', loginDto)
    const token = response.data.token
    if (token) {
      try {
        const decoded = jwtDecode(token)
        const expires = new Date(decoded.exp * 1000)
        Cookies.set('token', token, { expires, secure: true, sameSite: 'strict' })
      } catch (e) {
        Cookies.set('token', token, { expires: 1, secure: true, sameSite: 'strict' })
      }
    }
    return response.data
  },
  async register(registerDto) {
    const response = await api.post('/api/Account/register', registerDto)
    return response.data
  },
  async getMe() {
    const response = await api.get('/api/Account/me')
    return response.data
  },
  // Entreprises API
  async getEntreprises(adminId) {
    const response = await api.get(`/api/administrateur/${adminId}/entreprises`)
    return response.data
  },
  async addEntreprise(adminId, entrepriseData) {
    if (!adminId) {
      console.error('addEntreprise called with null adminId')
      throw new Error('Admin ID is required')
    }
    const payload = {
      Nom: entrepriseData.nom,
      Adresse: entrepriseData.adresse,
      Tel: entrepriseData.tel,
      Email: entrepriseData.email,
    }
    const response = await api.post(`/api/administrateur/${adminId}/entreprises`, payload)
    return response.data
  },
  async updateEntreprise(adminId, entrepriseId, entrepriseData) {
    const payload = {
      Nom: entrepriseData.nom,
      Adresse: entrepriseData.adresse,
      Tel: entrepriseData.tel,
      Email: entrepriseData.email,
    }
    const response = await api.put(
      `/api/administrateur/${adminId}/entreprises/${entrepriseId}`,
      payload,
    )
    return response.data
  },
  async deleteEntreprise(adminId, entrepriseId) {
    const response = await api.delete(`/api/administrateur/${adminId}/entreprises/${entrepriseId}`)
    return response.data
  },
  logout() {
    Cookies.remove('token')
  },
}

export default api
