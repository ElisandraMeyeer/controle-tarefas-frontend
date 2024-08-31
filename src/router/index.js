import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Tarefas from '@/views/Tarefas.vue'
import CadastrarTarefa from '@/views/CadastrarTarefa.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Login },
    { path: '/tarefas', component: Tarefas },
    { path: '/cadastrar-tarefa', component: CadastrarTarefa },

  ]
})

export default router
