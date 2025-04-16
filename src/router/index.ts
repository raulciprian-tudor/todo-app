import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'todo',
            component: () => import('../components/todo-container/TodoContainer.vue'), // lazy loading
        },
    ],
})

export default router
