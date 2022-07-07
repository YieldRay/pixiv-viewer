import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
document.title = "Pixiv";

import PArtwork from "./components/main/PArtwork.vue";
import PHome from "./components/main/PHome.vue";
import PUsers from "./components/main/PUsers.vue";

const routes = [
    { path: "/", component: PHome },
    {
        path: "/artwork/:id",
        component: PArtwork,
    },
    {
        path: "/users/:id",
        component: PUsers,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

createApp(App).use(router).mount("#app");
