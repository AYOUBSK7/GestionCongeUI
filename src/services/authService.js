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
  // use done
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

  // use done
  async register(registerDto) {
    const response = await api.post('/api/Account/register', registerDto)
    return response.data
  },

  // use done
  async getMe() {
    const response = await api.get('/api/Account/me')
    return response.data
  },

  // Entreprises API
  // use done
  async getEntreprises(adminId) {
    const response = await api.get(`/api/administrateur/${adminId}/entreprises`)
    return response.data
  },

  // use done
  async getEntreprise(adminId, entrepriseId) {
    const response = await api.get(`/api/administrateur/${adminId}/entreprises/${entrepriseId}`)
    return response.data
  },

  // use done
  async addEntreprise(adminId, entrepriseData) {
    if (!adminId) {
      console.error('addEntreprise called with null adminId')
      throw new Error('Admin ID is required')
    }
    const payload = {
      nom: entrepriseData.nom,
      adresse: entrepriseData.adresse,
      telephone: entrepriseData.telephone, // FIX: était 'tel'
      email: entrepriseData.email,
    }
    const response = await api.post(`/api/administrateur/${adminId}/entreprises`, payload)
    return response.data
  },

  // use done
  async updateEntreprise(adminId, entrepriseId, entrepriseData) {
    const payload = {
      nom: entrepriseData.nom,
      adresse: entrepriseData.adresse,
      telephone: entrepriseData.telephone,
      email: entrepriseData.email,
      statut: entrepriseData.statut,
    }
    const response = await api.put(
      `/api/administrateur/${adminId}/entreprises/${entrepriseId}`,
      payload,
    )
    return response.data
  },

  // Employes API
  // use done
  async getEmployes(adminId, entrepriseId) {
    const response = await api.get(
      `/api/administrateur/${adminId}/entreprises/${entrepriseId}/employes`,
    )
    const data = Array.isArray(response.data) ? response.data : []
    // FIX: Backend renvoie en PascalCase
    return data.map((e) => ({
      id: e.id,
      nom: e.nom,
      prenom: e.prenom,
      email: e.email,
      role: e.roleEmploye,
    }))
  },

  // use done
  async getEmployeDetail(adminId, entrepriseId, employeId) {
    try {
      const response = await api.get(
        `/api/administrateur/${adminId}/entreprises/${entrepriseId}/employes/${employeId}/detail`,
      )
      const e = response.data
      if (!e) return null

      // FIX: Backend renvoie en camelCase
      return {
        id: e.id,
        nom: e.nom,
        prenom: e.prenom,
        email: e.email,
        adresse: e.adresse,
        identifiant: e.identifiant,
        soldeConges: e.soldeConges,
        telephonePrincipal: e.telephonePrincipal,
        telephoneSecondaire: e.telephoneSecondaire,
        salaires: e.salaires,
        contrat: e.contrat || null,
        poste: e.poste || null,
        permissions: e.permissions || [],
      }
    } catch (error) {
      console.error('Error fetching employee detail:', error)
      throw error
    }
  },

  // use done
  async addEmploye(adminId, entrepriseId, employeData) {
    const payload = {
      nomUtilisateur: employeData.nomUtilisateur,
      email: employeData.email,
      motDePasse: employeData.motDePasse,
      prenom: employeData.prenom,
      nom: employeData.nom,
      adresse: employeData.adresse || '',
      identifiant: employeData.identifiant,
      superieur: employeData.superieur,
      soldeConge: parseInt(employeData.soldeConge) || 0,
      telephonePrincipal: employeData.telephonePrincipal || null,
      telephoneSecondaire: employeData.telephoneSecondaire || null,
    }
    const response = await api.post(
      `/api/administrateur/${adminId}/entreprises/${entrepriseId}/employes`,
      payload,
    )
    return response.data
  },

  // use done
  async addContrat(adminId, entrepriseId, employeId, contratData) {
    const payload = {
      typeContrat: contratData.type,
      dateDebut: contratData.debut,
      dateFin: contratData.fin || null,
      salaireParMois: parseFloat(contratData.salaireParMois) || 0,
    }
    const response = await api.post(
      `/api/administrateur/${adminId}/entreprises/${entrepriseId}/employes/${employeId}/contrats`,
      payload,
    )
    return response.data
  },

  // use done
  async addPoste(adminId, entrepriseId, employeId, posteData) {
    const payload = {
      titre: posteData.titre,
      dateDebut: posteData.debut,
      dateFin: posteData.fin || null,
    }
    const response = await api.post(
      `/api/administrateur/${adminId}/entreprises/${entrepriseId}/employes/${employeId}/postes`,
      payload,
    )
    return response.data
  },

  // use done
  async addPermission(adminId, entrepriseId, employeId, permissionName) {
    const payload = {
      nomPermission: permissionName,
    }
    const response = await api.post(
      `/api/administrateur/${adminId}/entreprises/${entrepriseId}/employes/${employeId}/permissions`,
      payload,
    )
    console.log('permissions ', response.data)
    return response.data
  },

  // use done
  async deletePermission(adminId, entrepriseId, employeId, permissionName) {
    const response = await api.delete(
      `/api/administrateur/${adminId}/entreprises/${entrepriseId}/employes/${employeId}/permissions/${permissionName}`,
    )
    return response.data
  },

  // use done
  async updateEmploye(adminId, entrepriseId, employeId, employeData) {
    const payload = {
      nom: employeData.nom,
      prenom: employeData.prenom,
      email: employeData.email,
      adresse: employeData.adresse || null,
      telephonePrincipal: employeData.telephonePrincipal || null,
      telephoneSecondaire: employeData.telephoneSecondaire || null,
      soldeConge: parseInt(employeData.soldeConge) || 0,
    }
    const response = await api.put(
      `/api/administrateur/${adminId}/entreprises/${entrepriseId}/employes/${employeId}`,
      payload,
    )
    return response.data
  },

  // use done
  async getPostes(employeId) {
    const response = await api.get(`/api/employes/${employeId}/postes`)
    return response.data
  },

  // use done
  async getContrats(employeId) {
    const response = await api.get(`/api/employes/${employeId}/contrats`)
    return response.data
  },

  // use done
  async deleteEmploye(adminId, entrepriseId, employeId) {
    const response = await api.delete(
      `/api/administrateur/${adminId}/entreprises/${entrepriseId}/employes/${employeId}`,
    )
    return response.data
  },

  // use done
  async getExpirations(adminId, jours = 30) {
    const response = await api.get(
      `/api/administrateur/${adminId}/entreprises/expirations?joursAvantExpiration=${jours}`,
    )
    return response.data
  },

  logout() {
    Cookies.remove('token')
  },
}

export default api
