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
  async getCompte(employeId) {
    console.log('testttttttteeee')
    const response = await api.get(`/api/employes/${employeId}/Detail`)
    console.log('GetCompte response data:', response.data)
    return response.data
  },
  async getConges() {
    const response = await api.get(`/api/demandes/conges`)
    return response.data
  },

  async SubmitDemandeConge(congeData) {
    const payload = {
      dateDebut: congeData.dateDebut,
      dateFin: congeData.dateFin,
      motif: congeData.motif,
    }
    const response = await api.post(`/api/demandes/conges`, payload)
    return response.data
  },

  async SubmitDemandeAvance(avanceData) {
    const payload = {
      montant: avanceData.montant,
      motif: avanceData.motif,
    }
    const response = await api.post(`/api/demandes/avances`, payload)
    return response.data
  },

  async getAvances() {
    const response = await api.get(`/api/demandes/avances`)
    return response.data
  },
  async AnnulerDemandeConge(demandeId) {
    const response = await api.delete(`/api/demandes/conges/${demandeId}`)
    return response.data
  },
  async AnnulerDemandeAvance(demandeId) {
    const response = await api.delete(`/api/demandes/avances/${demandeId}`)
    return response.data
  },

  // Récupérer les demandes de congés à approuver
  async getDemandesCongesAApprouver() {
    const response = await api.get('/api/demandes/conges/a-approuver')
    return response.data
  },
  // Récupérer les demandes d'avances à approuver
  async getDemandesAvancesAApprouver() {
    const response = await api.get('/api/demandes/avances/a-approuver')
    return response.data
  },

  // Approuver une demande de congé
  async approuverDemandeConge(id) {
    try {
      const response = await api.put(`/api/demandes/conges/${id}/approuver`)
      return response.data
    } catch (error) {
      console.error('Erreur dans approuverDemandeConge:', error)
      throw error
    }
  },

  // Refuser une demande de congé
  async refuserDemandeConge(id, motifRefus) {
    const payload = {
      Commentaire: motifRefus,
    }
    try {
      const response = await api.put(`/api/demandes/conges/${id}/refuser`, payload)
      return response.data
    } catch (error) {
      console.error('Erreur dans refuserDemandeConge:', error)
      throw error
    }
  },

  // Approuver une demande d'avance
  async approuverDemandeAvance(id) {
    try {
      const response = await api.put(`/api/demandes/avances/${id}/approuver`)
      return response.data
    } catch (error) {
      console.error('Erreur dans approuverDemandeAvance:', error)
      throw error
    }
  },

  // Refuser une demande d'avance
  async refuserDemandeAvance(id, motifRefus) {
    const payload = {
      Commentaire: motifRefus,
    }
    try {
      const response = await api.put(`/api/demandes/avances/${id}/refuser`, payload)
      return response.data
    } catch (error) {
      console.error('Erreur dans refuserDemandeAvance:', error)
      throw error
    }
  },
  async createAbsence(data) {
    const response = await api.post('/api/absences', {
      date: data.date,
      motif: data.motif,
    })
    return response.data
  },

  async getMesDemandesAbsences() {
    const response = await api.get('/api/absences/mes-demandes')
    return response.data
  },

  async deleteAbsence(id) {
    const response = await api.delete(`/api/absences/${id}`)
    return response.data
  },

  async getAbsencesAApprouver() {
    const response = await api.get('/api/absences/a-approuver')
    return response.data
  },

  async approuverAbsence(id) {
    const response = await api.put(`/api/absences/${id}/approuver`)
    return response.data
  },

  async refuserAbsence(id, commentaire) {
    const response = await api.put(`/api/absences/${id}/refuser`, { commentaire })
    return response.data
  },

  logout() {
    Cookies.remove('token')
  },
}

export default api
