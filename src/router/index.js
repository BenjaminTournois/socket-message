import Login from "../views/Login-view.vue";
import Chat from "../views/Chat-view.vue";
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: "/",
        name: "login",
        component: Login,
    },
    {
        path: "/chat",
        name: "chat",
        component: Chat,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;