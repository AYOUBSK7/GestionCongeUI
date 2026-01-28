import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminDashboard from '../views/admin/DashboardView.vue'
import EmployeeLayout from '../views/employee/DashboardView.vue'
import { useAuthStore } from '../stores/auth'
import Cookies from 'js-cookie'

import EntrepriseListView from '../views/admin/entreprises/EntrepriseListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true, role: 'admin' },
    },
    {
      path: '/admin/entreprises',
      name: 'admin-entreprises',
      component: EntrepriseListView,
      meta: { requiresAuth: true, role: 'admin' },
    },
    {
      path: '/admin/entreprises/:id',
      name: 'admin-entreprise-employes',
      component: () => import('../views/admin/employes/EmployeListView.vue'),
      meta: { requiresAuth: true, role: 'admin' },
    },
    {
      path: '/admin/entreprises/:entrepriseId/employes/:employeId/manage',
      name: 'admin-manage-employe',
      component: () => import('../views/admin/employes/ManageEmployeView.vue'),
      meta: { requiresAuth: true, role: 'admin' },
    },
    {
      path: '/employee',
      component: EmployeeLayout,
      meta: { requiresAuth: true, role: 'user' },
      children: [
        {
          path: 'dashboard',
          name: 'employee-dashboard',
          component: () => import('../views/employee/EmployeeDashboardView.vue'),
        },
        {
          path: 'mon-compte',
          name: 'employee-mon-compte',
          component: () => import('../views/employee/MonCompteView.vue'),
        },
        {
          path: 'demande-conge',
          name: 'employee-demande-conge',
          component: () => import('../views/employee/DemandeCongeView.vue'),
        },
        {
          path: 'demande-avance',
          name: 'employee-demande-avance',
          component: () => import('../views/employee/DemandeAvanceView.vue'),
        },
        {
          path: 'demande-absence',
          name: 'employee-demande-absence',
          component: () => import('../views/employee/DemandeAbsenceView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const token = Cookies.get('token')

  if (to.meta.requiresAuth) {
    if (!token) {
      return next('/login')
    }

    if (!authStore.user) {
      try {
        await authStore.fetchUser()
      } catch (e) {
        return next('/login')
      }
    }

    const userRole = (authStore.user?.role || '').toLowerCase()
    const requiredRole = (to.meta.role || '').toLowerCase()

    console.log('Router guard - User role:', userRole, 'Required role:', requiredRole)

    if (requiredRole && userRole !== requiredRole) {
      return next(userRole === 'admin' ? '/admin/dashboard' : '/employee/dashboard')
    }
  }

  next()
})

export default router
